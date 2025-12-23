import { useEffect, useState } from "react";
import {
  listenToCourses,
  addCourse,
  updateCourse,
  deleteCourse
} from "../../firebase/courses";
import CourseForm from "./CourseForm";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    return listenToCourses(setCourses);
  }, []);

  async function handleSubmit(data) {
    if (editing) {
      await updateCourse(editing.id, data);
      setEditing(null);
    } else {
      await addCourse(data);
    }
  }

  return (
    <div className="space-y-8">
      <CourseForm
        onSubmit={handleSubmit}
        editingCourse={editing}
        onCancel={() => setEditing(null)}
      />

      <div className="grid gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{course.title}</h4>
              <p className="text-sm text-gray-500">
                {course.category} • {course.level} •{" "}
                {course.isPaid ? "Paid" : "Free"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditing(course)}
                className="btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCourse(course.id)}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
