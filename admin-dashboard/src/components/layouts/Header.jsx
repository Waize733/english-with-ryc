import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="font-semibold text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>
      <ThemeToggle />
    </header>
  );
}
