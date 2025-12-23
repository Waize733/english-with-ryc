import { useEffect, useState } from "react";
import {
  getAllMcqs,
  createMcq,
  deleteMcq
} from "../../firebase/mcqs.js";
import { getCourses } from "../../firebase/courses.js";

export default function Mcqs() {
  const [mcqs, setMcqs] = useState([]);
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    courseId: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const mcqData = await getAllMcqs();
    const courseData = await getCourses();
    setMcqs(mcqData);
    setCourses(courseData);
  }

  function updateOption(index, value) {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  }

  async function submit() {
    if (!form.question || !form.courseId) {
      alert("Fill all fields");
      return;
    }

    await createMcq(form);

    setForm({
      courseId: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    });

    load();
  }

  async function remove(id) {
    if (!window.confirm("Delete MCQ?")) return;
    await deleteMcq(id);
    load();
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">MCQ Management</h1>

      {/* Create MCQ */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <select
          className="input"
          value={form.courseId}
          onChange={(e) =>
            setForm({ ...form, courseId: e.target.value })
          }
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Question"
          value={form.question}
          onChange={(e) =>
            setForm({ ...form, question: e.target.value })
          }
        />

        {form.options.map((opt, i) => (
          <input
            key={i}
            className="input"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) =>
              updateOption(i, e.target.value)
            }
          />
        ))}

        <select
          className="input"
          value={form.correctAnswer}
          onChange={(e) =>
            setForm({
              ...form,
              correctAnswer: Number(e.target.value)
            })
          }
        >
          <option value={0}>Correct: Option 1</option>
          <option value={1}>Correct: Option 2</option>
          <option value={2}>Correct: Option 3</option>
          <option value={3}>Correct: Option 4</option>
        </select>

        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add MCQ
        </button>
      </div>

      {/* MCQ List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Existing MCQs</h2>

        {mcqs.map((mcq) => (
          <div
            key={mcq.id}
            className="border-b py-3 flex justify-between"
          >
            <div>
              <p className="font-medium">{mcq.question}</p>
              <p className="text-sm text-gray-500">
                Course: {mcq.courseId}
              </p>
            </div>

            <button
              onClick={() => remove(mcq.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
