const PROFILE_URL = 'https://www.linkedin.com/in/yunhan-qian-077456200/'

export default function LinkedInBadge() {
  return (
    <a
      aria-label="Yunhan Qian on LinkedIn"
      className="linkedin-badge"
      href={PROFILE_URL}
      rel="noreferrer noopener"
      target="_blank"
      title="LinkedIn"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" focusable="false">
        <circle cx="16" cy="16" r="14.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="11.2" cy="11.2" r="1.6" fill="currentColor" />
        <rect x="9.85" y="13.7" width="2.7" height="8.9" fill="currentColor" />
        <path
          d="M14.6 13.7h2.55v1.25c0.6-0.98 1.62-1.5 2.95-1.5 2.32 0 3.6 1.5 3.6 4.16v4.99h-2.7v-4.62c0-1.44-0.6-2.16-1.77-2.16-1.2 0-1.93 0.82-1.93 2.28v4.5h-2.7z"
          fill="currentColor"
        />
      </svg>
    </a>
  )
}
