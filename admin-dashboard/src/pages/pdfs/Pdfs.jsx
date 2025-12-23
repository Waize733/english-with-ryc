import { useEffect, useState } from "react";
import {
  listenToPdfs,
  addPdf,
  updatePdf,
  deletePdf
} from "../../firebase/pdfs";
import { listenToCourses } from "../../firebase/courses";
import PdfForm from "./PdfForm";

export default function Pdfs() {
  const [pdfs, setPdfs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const unsubPdfs = listenToPdfs(setPdfs);
    const unsubCourses = listenToCourses(setCourses);
    return () => {
      unsubPdfs();
      unsubCourses();
    };
  }, []);

  async function handleSubmit(data) {
    if (editing) {
      await updatePdf(editing.id, data);
      setEditing(null);
    } else {
      await addPdf(data);
    }
  }

  return (
    <div className="space-y-8">
      <PdfForm
        onSubmit={handleSubmit}
        editingPdf={editing}
        courses={courses}
        onCancel={() => setEditing(null)}
      />

      <div className="grid gap-4">
        {pdfs.map(pdf => (
          <div
            key={pdf.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between"
          >
            <div>
              <h4 className="font-semibold">{pdf.title}</h4>
              <p className="text-sm text-gray-500">
                {pdf.courseTitle} • {pdf.isPaid ? "Paid" : "Free"}
              </p>
              <a
                href={pdf.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View PDF
              </a>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditing(pdf)}
                className="btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => deletePdf(pdf.id, pdf.pdfUrl)}
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
