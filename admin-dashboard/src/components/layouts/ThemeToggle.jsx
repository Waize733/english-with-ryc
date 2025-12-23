import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
