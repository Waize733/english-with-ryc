import { useEffect, useState } from "react";
import { getAppContent, saveAppContent } from "../../firebase/appContent";

export default function AppContent() {
  const [form, setForm] = useState({
    welcomeQuote: "",
    introVideoUrl: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getAppContent();
      if (data) setForm(data);
    }
    load();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await saveAppContent(form);
    setLoading(false);
    alert("App content updated successfully");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-semibold">App Content</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
      >
        <textarea
          name="welcomeQuote"
          placeholder="Welcome quote for students"
          value={form.welcomeQuote}
          onChange={handleChange}
          className="input"
          rows={3}
        />

        <input
          name="introVideoUrl"
          placeholder="Professor intro video URL (YouTube)"
          value={form.introVideoUrl}
          onChange={handleChange}
          className="input"
        />

        <button className="btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Content"}
        </button>
      </form>
    </div>
  );
}
