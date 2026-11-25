import Image from 'next/image'
import type { MediaItem } from '@/content/projects'

const MAX_HEIGHT = '90svh'

export function MediaBlock({ item, title }: { item: MediaItem; title: string }) {
  if (item.type === 'image') {
    const ratio = item.width / item.height
    return (
      <div
        className="mx-auto w-full"
        style={{
          aspectRatio: `${item.width} / ${item.height}`,
          maxWidth: `calc(${MAX_HEIGHT} * ${ratio})`,
        }}
      >
        <Image
          src={item.src}
          alt={item.alt ?? ''}
          width={item.width}
          height={item.height}
          sizes="(min-width: 1280px) 1100px, 100vw"
          className="h-full w-full object-contain"
        />
      </div>
    )
  }

  if (item.type === 'video') {
    return (
      <div className="mx-auto w-full max-w-[1100px]">
        <video
          controls
          playsInline
          preload="metadata"
          poster={item.poster}
          aria-label={item.title ?? `${title} video`}
          className="block h-auto w-full bg-black"
        >
          <source src={item.src} type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <div className="mx-auto aspect-video w-full max-w-[1100px]">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${item.id}`}
        title={item.title ?? `${title} video`}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full border-0"
      />
    </div>
  )
}
