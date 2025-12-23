import { useEffect, useState } from "react";

const categories = [
  "Spoken English",
  "Grammar",
  "Literature",
  "Linguistics"
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function CourseForm({ onSubmit, editingCourse, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: categories[0],
    level: levels[0],
    isPaid: false
  });

  useEffect(() => {
    if (editingCourse) {
      setForm(editingCourse);
    }
  }, [editingCourse]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: "",
      description: "",
      category: categories[0],
      level: levels[0],
      isPaid: false
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
    >
      <h3 className="text-lg font-semibold">
        {editingCourse ? "Edit Course" : "Add New Course"}
      </h3>

      <input
        name="title"
        placeholder="Course Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full input"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full input"
      />

      <div className="flex gap-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="input"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          className="input"
        >
          {levels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPaid"
          checked={form.isPaid}
          onChange={handleChange}
        />
        Paid Course
      </label>

      <div className="flex gap-3">
        <button className="btn-primary">
          {editingCourse ? "Update" : "Create"}
        </button>
        {editingCourse && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
