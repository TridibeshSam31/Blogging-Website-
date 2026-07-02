import { Hono } from "hono";
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { verify } from "hono/jwt"
import { createBlogInput, updateBlogInput } from "@tridibeshsamantroy/blog-common";

const getPrismaClient = (databaseUrl: string) => {
    const adapter = new PrismaNeon({ connectionString: databaseUrl })
    return new PrismaClient({ adapter })
};

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables: {
        userId: string
    }
}>()

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || ""
    try {
        //@ts-ignore
        const user = await verify(authHeader, c.env.JWT_SECRET)
        if (user) {
            //@ts-ignore
            c.set("userId", user.id)
            await next()
        } else {
            c.status(403)
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (error) {
        c.status(403)
        return c.json({
            message: "You are not logged in"
        })
    }

})

blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    const { success } = createBlogInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({ message: "Inputs not correct" })
    }
    const authorId = c.get("userId")
    const prisma = getPrismaClient(c.env.DATABASE_URL)

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId || "1"
        }
    })
    return c.json({
        id: blog.id
    })

})

blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const { success } = updateBlogInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({ message: "Inputs not correct" })
    }
    const prisma = getPrismaClient(c.env.DATABASE_URL)

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,

        }
    })
    return c.json({
        id: blog.id
    })

})

//add pagination 
blogRouter.get('/bulk', async (c) => {

    const prisma = getPrismaClient(c.env.DATABASE_URL)

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        blogs
    })



})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id')
    const prisma = getPrismaClient(c.env.DATABASE_URL)

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                content: true,
                title: true,
                createdAt: true,
                authorId: true,

                author: {
                    select: {
                        name: true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        comment: true,
                        authorId: true,
                        author: {
                            select: {
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                likes: {
                    select: {
                        id: true,
                        userId: true
                    }
                }
            }

        })

        return c.json({
            blog
        })
    } catch (error) {
        c.status(411)
        return c.json({
            message: "Error while fetching blog post"
        })
    }

})


//for like and comment the api should be like this initially
// i.e for comment
// POST method /api/v1/blog/:id/comment
//Delete method /api/v1/blog/:id/comment/:commentId
//there should also be a patch route for editing the comment section

//for like
//POST method /api/v1/blog/:id/like
//Delete method /api/v1/blog/:id/like/:likeId



//blog/:id/comment

//so what we have to do is take postId first 
//then check for existing posts 
//get userId 
//create comment and return it 

blogRouter.post('/:id/comment', async (c) => {
    try {
        const postId = c.req.param('id')
        const body = await c.req.json()
        const authorId = c.get("userId")

        const prisma = getPrismaClient(c.env.DATABASE_URL)

        const existingPost = await prisma.post.findMany({
            where: {
                id: postId
            }
        })

        console.log(existingPost)

        if (existingPost.length === 0) {
            c.status(404)
            return c.json({
                message: "No post found with the given id"
            })
        }

        if (!authorId) {
            c.status(403)
            return c.json({
                message: "You are not logged in "
            })
        }

        const comment = await prisma.comment.create({
            data: {
                comment: body.comment,
                postId: postId,
                authorId: authorId
            }
        })


        return c.json({
            comment

        })



    } catch (error) {
        c.status(500)
        return c.json({
            message: "Error while Creating comment"
        })

    }



})



//delete comment and update comment routes 
//find comment 
//find auther and post 
//delete comment if authorId matches

blogRouter.delete('/:id/comment/:commentId', async (c) => {
    try {
        const postId = c.req.param('id')
        const commentId = c.req.param('commentId')
        const authorId = c.get("userId")
        const prisma = getPrismaClient(c.env.DATABASE_URL)

        const comment = await prisma.comment.findFirst({
            where: {
                id: commentId,
                authorId: authorId,
                postId: postId

            }

        })

        console.log(comment)

        if (!comment) {
            c.status(404)
            return c.json({
                message: "No comment found with the given Id"
            })
        }

        /*
        const findAuthor = await prisma.comment.findFirst({
            where:{
                id:commentId,
                authorId:authorId
            }
        })
        */

        if (comment.authorId !== authorId) {
            c.status(403)
            return c.json({
                message: "You are not authorized to delete this comment"
            })
        }

        if (comment.postId !== postId) {
            c.status(404)
            return c.json({
                message: "No comment found with the given PostId"
            })
        }

        const deletedComment = await prisma.comment.delete({
            where: {
                id: commentId

            }
        })


        return c.json({
            deletedComment
        })








    } catch (error) {
        c.status(500)
        return c.json({
            message: "Error while deleting comment"
        })


    }
})


//updating comment PATCH 

blogRouter.patch('/:id/comment/:commentId', async (c) => {
    const postId = c.req.param('id')
    const commentId = c.req.param('commentId')
    const body = await c.req.json()
    const authorId = c.get("userId")

    const prisma = getPrismaClient(c.env.DATABASE_URL)

    const FindComment = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId: authorId,
            postId: postId
        }

    })

    console.log(FindComment)

    if (!FindComment) {
        c.status(404)
        return c.json({
            message: "No comment found with the given id"
        })
    }

    if (FindComment.authorId !== authorId) {
        c.status(403)
        return c.json({
            message: "You are not authorized to update this comment"
        })
    }

    if (FindComment.postId !== postId) {
        c.status(403)
        return c.json({
            message: "You are not authorized to update this comment"
        })

    }

    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId

        },
        data: {
            comment: body.comment
        }


    })


    c.status(200)
    return c.json({
        updatedComment
    })

})



//create and delete like routes
blogRouter.post('/:id/like', async (c) => {

    try {

        const postId = c.req.param('id')
        const userId = c.get("userId")
        const prisma = getPrismaClient(c.env.DATABASE_URL)


        const existingPost = await prisma.post.findMany({
            where: {
                id: postId
            }
        })

        console.log(existingPost)

        if (existingPost.length === 0) {
            return c.json({
                message: "No post exist with the id"
            })
        }

        if (!userId) {
            c.status(403)
            return c.json({
                message: "You are not logged in"
            })
        }

        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        })

        if (existingLike) {
            return c.json({
                message: "You have already liked this post"
            })
        }

        const createLike = await prisma.like.create({
            data: {
                postId: postId,
                userId: userId
            }
        })

        c.status(200)
        return c.json({
            createLike
        })

    } catch (error) {
        c.status(500)
        return c.json({
            message: "Error while creating Like"
        })
    }

})


//delete like 


blogRouter.delete('/:id/like/:likeId', async (c) => {
    try {
        const postId = c.req.param('id')
        const likeId = c.req.param('likeId')
        const userId = c.get("userId")

        const prisma = getPrismaClient(c.env.DATABASE_URL)


        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if (!post) {
            return c.json({
                message: "Post not found"
            }, 404)
        }

        const like = await prisma.like.findFirst({
            where: {
                id: likeId,
                postId,
                userId
            }
        })

        if (!like) {
            return c.json({
                message: "Like not found"
            }, 404)
        }

        await prisma.like.delete({
            where: {
                id: like.id
            }
        })

        return c.json({
            message: "Like removed successfully",

        })
    } catch (error) {
        c.status(500)
        return c.json({
            message: "unable to unlike"
        })

    }


})

//DELETE /blog/:id

blogRouter.delete("/:id", async (c) => {
    const postId = c.req.param("id");
    const userId = c.get("userId");

    const prisma = getPrismaClient(c.env.DATABASE_URL);

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });

    if (!post) {
        return c.json({
            message: "Blog not found"
        }, 404);
    }

    if (post.authorId !== userId) {
        return c.json({
            message: "You are not authorized to delete this blog"
        }, 403);
    }

    await prisma.post.delete({
        where: {
            id: postId
        }
    });

    return c.json({
        message: "Blog deleted successfully"
    });
});



blogRouter.get("/me/blogs", async (c) => {
    const userId = c.get("userId");

    const prisma = getPrismaClient(c.env.DATABASE_URL);

    const blogs = await prisma.post.findMany({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true
        }
    });

    return c.json({
        blogs
    });
});

