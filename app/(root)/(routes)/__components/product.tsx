import Image from "next/image"
import { cn } from "@/lib/utils"
import { Product } from "@/services/product-service"
import  Link from 'next/link'

interface ProuductProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function ProductItem({
  product,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProuductProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md mb-2">
        <Image
          src={product?.thumbnail}
          alt={product?.title}
          width={width}
          height={height}
          className={cn(
            "object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <Link href={`/${product?.id}`}>
      <div className="space-y-1 text-sm mb-5">
        <h3 className="font-medium leading-none">{product?.title}</h3>
        <p className="text-xs text-muted-foreground">{product?.description}</p>
      </div>
      </Link>
    </div>
  )
}
