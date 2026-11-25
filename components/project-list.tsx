'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES, type Category, type Project } from '@/content/projects'
import { cn } from '@/lib/utils'

type Filter = 'ALL' | Category

const FILTERS: Filter[] = ['ALL', ...CATEGORIES]

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('ALL')

  const visible =
    filter === 'ALL'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <section aria-label="Projects">
      <div
        role="group"
        aria-label="Filter by category"
        className="flex flex-wrap gap-x-2 gap-y-2"
      >
        {FILTERS.map((item) => {
          const selected = item === filter
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground',
                selected
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-foreground/25 text-foreground hover:border-foreground',
              )}
            >
              {item}
            </button>
          )
        })}
      </div>

      <ul className="mt-8 grid min-h-[40vh] grid-cols-2 content-start items-start gap-x-4 gap-y-10 md:mt-10 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
        {visible.map((project) => (
          <li key={project.slug} className="min-w-0">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { title, slug, thumbnail, category, year } = project
  const href = `/projects/${slug}`
  const meta = [category, year].filter(Boolean).join(' · ')

  const titleLink = (
    <Link
      href={href}
      className="text-[15px] leading-snug font-medium break-keep [overflow-wrap:anywhere] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
    >
      {title}
    </Link>
  )

  return (
    <article className="flex flex-col gap-3">
      {thumbnail && (
        <Link
          href={href}
          aria-label={title}
          className="block overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt ?? ''}
            width={thumbnail.width}
            height={thumbnail.height}
            sizes="(min-width: 768px) 25vw, 50vw"
            className="aspect-4/5 w-full object-cover"
          />
        </Link>
      )}
      <div className="flex flex-col gap-1">
        {titleLink}
        {meta && <p className="text-[13px] text-foreground/60">{meta}</p>}
      </div>
    </article>
  )
}
