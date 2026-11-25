import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Contact } from '@/components/contact'
import { MediaBlock } from '@/components/media-item'
import { profile } from '@/content/profile'
import { getProject, projects } from '@/content/projects'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.description?.split('\n')[0],
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { title, period, role, category, description, media } = project
  const info = [
    { label: 'PERIOD', value: period },
    { label: 'ROLE', value: role },
    { label: 'CATEGORY', value: category },
  ].filter((entry) => entry.value)

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 pt-8 md:px-10 md:pt-12">
      <h1 className="max-w-3xl text-2xl leading-tight font-medium break-keep [overflow-wrap:anywhere] md:text-4xl">
        {title}
      </h1>

      {info.length > 0 && (
        <dl className="mt-8 grid max-w-3xl grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-sm md:mt-10">
          {info.map(({ label, value }) => (
            <div key={label} className="contents">
              <dt className="text-xs leading-6 font-medium tracking-[0.14em] text-foreground/60">
                {label}
              </dt>
              <dd className="leading-6 break-keep [overflow-wrap:anywhere]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {description && (
        <p className="mt-8 max-w-2xl text-base leading-relaxed break-keep [overflow-wrap:anywhere] whitespace-pre-line">
          {description}
        </p>
      )}

      {media && media.length > 0 && (
        <section
          aria-label="Project media"
          className="mt-12 flex flex-col gap-6 md:mt-16 md:gap-10"
        >
          {media.map((item, index) => (
            <MediaBlock key={index} item={item} title={title} />
          ))}
        </section>
      )}

      <Contact />
    </main>
  )
}
