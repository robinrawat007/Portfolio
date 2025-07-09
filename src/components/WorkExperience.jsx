export default function WorkExperience() {
  return (
    <section id="experience" className="py-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Work Experience</h2>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h3 className="text-xl font-semibold">Software Engineer · Builder.AI</h3>
          <span className="text-sm text-gray-500">Jan 2021 – Apr 2025</span>
        </div>
        <ul className="list-disc ml-5 space-y-2 text-sm leading-6">
          <li>Spearheaded development of 10+ responsive web apps with React, Angular, Tailwind CSS &amp; TypeScript, boosting average load speed by 30%.</li>
          <li>Collaborated via Figma &amp; ClickUp to accelerate feature rollout by 20% in Agile sprints.</li>
          <li>Applied lazy loading, RxJS, and modular architecture to trim bundle size by 20%.</li>
          <li>Optimized API reliability by 40% using Redux state handling and structured error flows.</li>
          <li>Built reusable component libraries, cutting development time by 25% across projects.</li>
          <li>Resolved open‑source vulnerabilities within SLA using Mend scans (100% compliance).</li>
          <li>Streamlined Git workflows &amp; CI/CD pipelines, reducing deployment failures by 15%.</li>
          <li>Maintained 85%+ unit‑test coverage with Jest and enforced standards via code reviews.</li>
          <li>Facilitated frontend–backend coordination to improve delivery efficiency.</li>
        </ul>
      </div>
    </section>
  );
}