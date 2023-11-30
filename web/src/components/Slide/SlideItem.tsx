import Image from 'next/image'

interface SlideItemProps {
  imageUrl: string
  description: string
}

export function SlideItem({ imageUrl, description }: SlideItemProps) {
  return (
    <div className="keen-slider__slide relative flex flex-col justify-end">
      <Image
        src={imageUrl}
        alt=""
        width={848}
        height={368}
        quality={100}
        priority
        unoptimized
        className="absolute h-full w-full object-cover"
      />

      <div className="z-2 relative my-6 ml-6 mr-20 min-h-[72px] max-w-2xl bg-zinc-900/60 px-6 py-4 text-2xl/7 font-medium">
        {description}
      </div>
    </div>
  )
}
