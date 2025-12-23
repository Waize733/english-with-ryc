export default function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
}
