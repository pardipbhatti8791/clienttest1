'use client'

import { ProductItem } from "./__components/product";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductService from "@/services/product-service";
import { Loader } from "./__components/loader";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const queryClient = useQueryClient()
  const [skip, setSkip] = useState(8)
  const [limit] = useState(8)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', skip],
    queryFn: async () => ProductService.getAllProducts({ skip: skip }),
  })

  useEffect(() => {
    if (data) {
      queryClient.prefetchQuery({
        queryKey: ['projects', skip],
        queryFn: () => ProductService.getAllProducts({ skip: skip }),
      })
    }
  }, [data, skip, queryClient])

  return (
    <>
      <div className="md:block">
        <div className="container">
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <h2 className="text-3xl font-bold tracking-tight">Products</h2>
              <Separator className="my-4" />
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
                {isLoading && <Loader />}
                {isError && "Something went wrong"}
                {data?.products !== undefined && data.products.map(product => {
                  return (
                    <ProductItem product={product}
                      key={product.title}
                      className="w-[250px]"
                      aspectRatio="portrait"
                      width={250}
                      height={330}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={skip === limit || isLoading}
                onClick={() => setSkip(limit)}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSkip(old => old - limit)}
                disabled={skip === limit || isLoading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSkip(old => old + limit)}
                disabled={(skip + limit) >= data?.total! || isLoading}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSkip(data?.total! - limit)}
                disabled={isLoading || (skip + limit) >= data?.total!}
              >
                Last
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
