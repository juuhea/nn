import { Contact } from '@/components/contact'
import { ProjectList } from '@/components/project-list'
import { projects } from '@/content/projects'

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 pt-8 md:px-10 md:pt-12">
      <header className="mb-8 md:mb-10">
        <h1 className="text-2xl leading-tight font-medium md:text-3xl">
          박주혜 Juhye
        </h1>
        <p className="mt-1 text-sm text-foreground/60">Designer</p>
      </header>
      <ProjectList projects={projects} />
      <Contact />
    </main>
  )
}
