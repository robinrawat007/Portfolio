export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <p className="mb-8">
          Have a project or want to hire me? Drop a message!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/robinrawat007"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://skillicons.dev/icons?i=github"
              alt="GitHub"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/robinrawat1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://skillicons.dev/icons?i=linkedin"
              alt="LinkedIn"
              className="w-8 h-8"
            />
          </a>
          <a href="mailto:robinrawat37@gmail.com">
            <img
              src="https://skillicons.dev/icons?i=gmail"
              alt="Email"
              className="w-8 h-8"
            />
          </a>
          <span className="inline-flex items-center justify-center gap-2 text-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 5.5C2 4.12 3.12 3 4.5 3h2A2.5 2.5 0 0 1 9 5.5v1A2.5 2.5 0 0 1 6.5 9H6a11 11 0 0 0 11 11v-.5A2.5 2.5 0 0 1 19.5 17h1A2.5 2.5 0 0 1 23 19.5v2A2.5 2.5 0 0 1 20.5 24C9.835 24 0 14.165 0 3.5 0 2.12 1.12 1 2.5 1h2A2.5 2.5 0 0 1 7 3.5V5a2.5 2.5 0 0 1-2.5 2.5H4.5C3.12 7.5 2 6.38 2 5.5z"
      />
    </svg>
    +91&nbsp;94161&nbsp;49624
  </span>
        </div>
      </div>
    </section>
  );
}
