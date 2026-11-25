const socialLinkClass = 'rounded-sm text-zinc-400 no-underline transition-[color,text-shadow] hover:text-green-300 hover:text-shadow-[0_0_8px_#4ade8066] focus-visible:text-green-300 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-green-400 motion-reduce:transition-none'

export function ProjectFooter() {
  return (
    <footer className="mx-auto box-border w-full max-w-7xl px-4 sm:px-6">
      <div className="flex flex-col items-center gap-5 border-0 border-t border-solid border-white/10 py-7 text-center min-[681px]:flex-row min-[681px]:justify-between min-[681px]:text-left lg:py-9">
        <div>
          <p className="m-0 text-lg font-bold text-zinc-100 lg:text-2xl">
            Pulse<span className="text-green-400 text-shadow-[0_0_8px_#4ade8040]">Kit</span>
          </p>
          <p className="m-0 mt-1 text-xs text-zinc-400 lg:text-sm">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
        <nav aria-label="Social links" className="flex gap-6 text-sm lg:text-base">
          <a className={socialLinkClass} href="https://github.com/tvsxar" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className={socialLinkClass} href="https://www.linkedin.com/in/poiatsyka/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </div>
    </footer>
  )
}
