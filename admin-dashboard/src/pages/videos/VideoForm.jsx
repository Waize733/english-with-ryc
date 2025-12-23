import { useEffect, useState } from "react";

export default function VideoForm({
  onSubmit,
  editingVideo,
  courses,
  onCancel
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    courseId: "",
    courseTitle: "",
    order: 1,
    isPaid: false
  });

  useEffect(() => {
    if (editingVideo) {
      setForm(editingVideo);
    }
  }, [editingVideo]);

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

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: "",
      description: "",
      videoUrl: "",
      courseId: "",
      courseTitle: "",
      order: 1,
      isPaid: false
    });
  }

  return (
    <form className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
          onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">
        {editingVideo ? "Edit Video" : "Add New Video"}
      </h3>

      <input
        name="title"
        placeholder="Video Title"
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

      <input
        name="videoUrl"
        placeholder="YouTube Unlisted URL"
        value={form.videoUrl}
        onChange={handleChange}
        className="input"
        required
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
        type="number"
        name="order"
        value={form.order}
        onChange={handleChange}
        className="input"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPaid"
          checked={form.isPaid}
          onChange={handleChange}
        />
        Paid Video
      </label>

      <div className="flex gap-3">
        <button className="btn-primary">
          {editingVideo ? "Update" : "Create"}
        </button>
        {editingVideo && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
