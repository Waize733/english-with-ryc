import { useEffect, useState } from "react";
import { uploadPdfFile } from "../../firebase/pdfs";

export default function PdfForm({
  onSubmit,
  editingPdf,
  courses,
  onCancel
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    courseId: "",
    courseTitle: "",
    isPaid: false,
    pdfUrl: ""
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPdf) {
      setForm(editingPdf);
    }
  }, [editingPdf]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleCourseChange(e) {
    const selected = courses.find(c => c.id === e.target.value);
    setForm({
      ...form,
      courseId: selected.id,
      courseTitle: selected.title
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let pdfUrl = form.pdfUrl;

    if (file) {
      pdfUrl = await uploadPdfFile(file);
    }

    await onSubmit({
      ...form,
      pdfUrl
    });

    setForm({
      title: "",
      description: "",
      courseId: "",
      courseTitle: "",
      isPaid: false,
      pdfUrl: ""
    });
    setFile(null);
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
    >
      <h3 className="text-lg font-semibold">
        {editingPdf ? "Edit PDF" : "Add PDF / Notes"}
      </h3>

      <input
        name="title"
        placeholder="PDF Title"
        value={form.title}
        onChange={handleChange}
        className="input"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="input"
      />

      <select
        value={form.courseId}
        onChange={handleCourseChange}
        className="input"
        required
      >
        <option value="">Select Course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="input"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPaid"
          checked={form.isPaid}
          onChange={handleChange}
        />
        Paid PDF
      </label>

      <div className="flex gap-3">
        <button className="btn-primary" disabled={loading}>
          {loading ? "Uploading..." : editingPdf ? "Update" : "Upload"}
        </button>
        {editingPdf && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
