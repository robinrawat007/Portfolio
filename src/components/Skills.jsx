const skills = [
  'React',
  'Angular',
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'TailwindCSS',
  'Redux',
  'MaterialUI',
  'RxJS',
  'Figma',
  'Git',
  'Jest',
  'CI/CD',
  'Express.js',
  'Postman',
];
export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
        <ul className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill) => (
            <li key={skill} className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}