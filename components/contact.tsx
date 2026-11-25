import { profile } from '@/content/profile'

const linkClass =
  'underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'

export function Contact() {
  return (
    <footer
      aria-labelledby="contact-heading"
      className="mt-24 border-t border-foreground/15 pt-8 pb-16 md:mt-32"
    >
      <h2
        id="contact-heading"
        className="text-xs font-medium tracking-[0.14em] text-foreground/60"
      >
        Contact
      </h2>
      <div className="mt-5 flex flex-col gap-1 text-base leading-relaxed">
        <p className="font-medium">{profile.name}</p>
        <p>{profile.role}</p>
        <p className="mt-3">
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
        </p>
        <p>
          <a
            href={profile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Instagram @{profile.instagramHandle}
          </a>
        </p>
      </div>
    </footer>
  )
}
