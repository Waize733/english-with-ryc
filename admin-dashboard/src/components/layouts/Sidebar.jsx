import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Videos", path: "/videos" },
  { name: "PDFs", path: "/pdfs" },
  { name: "Questions", path: "/questions" },
  { name: "MCQs", path: "/mcqs" },
  { name: "App Content", path: "/content" }
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow">
      {/* Logo / Title */}
      <div className="p-6 text-center border-b dark:border-gray-700">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          English With RYC
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
