'use client'
import productService from '@/services/product-service'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '../__components/loader'
import { EditFormModal } from '../__components/edit-form-modal'

interface IProductDetails {
  params: {
    id: string
  }
}

export default function ProductDetails({ params }: IProductDetails) {
  const { id } = params
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => productService.getProductById(+id),
  })

  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      {isError && 'Something went wrong'}
      {isLoading ? <Loader /> : (
        <>
          <div className="xl:w-2/6 lg:w-2/5 w-80 md:block">
            <img className="w-full" alt="img of a girl posing" src={data?.images[0]} />
          </div>
          <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
            <div className="border-b border-gray-200 pb-6">
              <h1
                className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
              >
                {data?.title}
              </h1>
            </div>
            <div>
              <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">{data?.description}</p>
              <p className="text-base leading-4 mt-7 text-gray-600">Price: {data?.price}</p>
              <p className="text-base leading-4 mt-4 text-gray-600">Category: {data?.category}</p>
              <div className='mt-5 w-full'>
                <EditFormModal  title={data?.title!} id={data?.id!} refetch={refetch}/>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
