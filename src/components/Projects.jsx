const projects = [
  {
    title: " Builder Studio",
    description: " No-Code App Development Platform ",
    demo: "#",
    github: "https://github.com/robinrawat007",
    tech: ["Angular", "Bootstrap", "RxJs", "TypeScript", "Jest"]
  },
  {
    title: "Builder Tracker",
    description: " Real-Time Progress Tracking Dashboard ",
    demo: "#",
    github: "https://github.com/robinrawat007",
    tech: ["Angular", "Bootstrap", "RxJs", "TypeScript", "Jest"]
  },
   {
    title: "Builder Home",
    description: "User Onboarding & Account Portal",
    demo: "#",
    github: "https://github.com/robinrawat007",
    tech: ["React", "JavaScript", "Redux", "TailwindCSS"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((proj) => (
          <div key={proj.title} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
            <p className="mb-4 text-sm leading-6">{proj.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {proj.tech.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white rounded">
                  {tag}
                </span>
              ))}
            </div>
            {/* <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="text-indigo-600 mr-4">Live Demo</a>
            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-indigo-600">Source Code</a> */}
          </div>
        ))}
      </div>
    </section>
  );
}