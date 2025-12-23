import { useEffect, useState } from "react";

export default function McqForm({ courses, editingMcq, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    courseId: "",
    courseTitle: "",
    question: "",
    options: { A: "", B: "", C: "", D: "" },
    correct: "A"
  });

  useEffect(() => {
    if (editingMcq) setForm(editingMcq);
  }, [editingMcq]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleOption(key, value) {
    setForm({ ...form, options: { ...form.options, [key]: value } });
  }

  function handleCourse(e) {
    const selected = courses.find(c => c.id === e.target.value);
    setForm({
      ...form,
      courseId: selected.id,
      courseTitle: selected.title
    });
  }

  function submit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm({
      courseId: "",
      courseTitle: "",
      question: "",
      options: { A: "", B: "", C: "", D: "" },
      correct: "A"
    });
  }

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <h3 className="font-semibold text-lg">
        {editingMcq ? "Edit MCQ" : "Add MCQ"}
      </h3>

      <select className="input" value={form.courseId} onChange={handleCourse} required>
        <option value="">Select Course</option>
        {courses.map(c => (
          <option key={c.id} value={c.id}>{c.title}</option>
        ))}
      </select>

      <textarea
        name="question"
        placeholder="Question"
        value={form.question}
        onChange={handleChange}
        className="input"
        required
      />

      {["A", "B", "C", "D"].map((k) => (
        <input
          key={k}
          placeholder={`Option ${k}`}
          value={form.options[k]}
          onChange={(e) => handleOption(k, e.target.value)}
          className="input"
          required
        />
      ))}

      <select
        name="correct"
        value={form.correct}
        onChange={handleChange}
        className="input"
      >
        {["A", "B", "C", "D"].map(k => (
          <option key={k} value={k}>Correct: {k}</option>
        ))}
      </select>

      <div className="flex gap-3">
        <button className="btn-primary">
          {editingMcq ? "Update" : "Create"}
        </button>
        {editingMcq && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
