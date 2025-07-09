export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm bg-white dark:bg-gray-900">
      <p className="mb-4">
        © {new Date().getFullYear()} Robin Rawat. All rights reserved.
      </p>
      <a
        href="./resume.pdf"
        download
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors"
      >
        Download Resume
      </a>
    </footer>
  );
}
