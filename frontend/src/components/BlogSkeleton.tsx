// Skeleton loading components for a polished loading experience

export const BlogCardSkeleton = () => {
  return (
    <div className='p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md animate-pulse'>
      <div className='flex items-center gap-2 mb-3'>
        <div className='h-8 w-8 rounded-full bg-gray-200' />
        <div className='h-3 w-24 bg-gray-200 rounded' />
        <div className='h-1 w-1 rounded-full bg-gray-200' />
        <div className='h-3 w-20 bg-gray-200 rounded' />
      </div>
      <div className='h-5 w-3/4 bg-gray-200 rounded mb-2' />
      <div className='h-3 w-full bg-gray-100 rounded mb-1' />
      <div className='h-3 w-5/6 bg-gray-100 rounded mb-4' />
      <div className='h-3 w-16 bg-gray-100 rounded' />
    </div>
  )
}

export const BlogSkeleton = () => {
  return (
    <div className='animate-pulse'>

      <div className='border-b flex justify-between px-10 py-4'>
        <div className='h-5 w-20 bg-gray-200 rounded' />
        <div className='flex gap-3'>
          <div className='h-8 w-16 rounded-full bg-gray-200' />
          <div className='h-10 w-10 rounded-full bg-gray-200' />
        </div>
      </div>

      <div className='flex justify-center'>
        <div className='grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 gap-6'>

          <div className='col-span-8'>
            <div className='h-8 w-3/4 bg-gray-200 rounded mb-3' />
            <div className='h-3 w-32 bg-gray-100 rounded mb-6' />
            <div className='space-y-2'>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-3 bg-gray-100 rounded ${i === 7 ? 'w-1/2' : 'w-full'}`} />
              ))}
            </div>
          </div>


          <div className='col-span-4'>
            <div className='h-4 w-16 bg-gray-200 rounded mb-3' />
            <div className='flex items-center gap-3'>
              <div className='h-10 w-10 rounded-full bg-gray-200' />
              <div className='h-4 w-28 bg-gray-200 rounded' />
            </div>
            <div className='h-3 w-full bg-gray-100 rounded mt-4' />
            <div className='h-3 w-5/6 bg-gray-100 rounded mt-2' />
          </div>
        </div>
      </div>
    </div>
  )
}
