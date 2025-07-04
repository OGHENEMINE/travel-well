import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function ImageCarousel({images}:{images: string[]}) {
  return (
    <Carousel className="w-full h-full">
      <CarouselContent>
        {images.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1 h-full">
              <Card className="rounded-none shadow-none border-none h-full">
                <CardContent className="relative h-auto flex aspect-square items-center justify-center p-6">
                  <Image src={item} alt="image" fill className="h-full w-full absolute"/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4" />
      <CarouselNext className="absolute right-3"/>
    </Carousel>
  )
}
