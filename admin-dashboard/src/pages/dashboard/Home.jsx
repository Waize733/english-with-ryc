import { useEffect, useState } from "react";
import {
  getCountFromServer,
  collection
} from "firebase/firestore";
import { db } from "../../firebase/firestore";
import StatCard from "../../components/ui/StatCard";

export default function Home() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    videos: 0,
    pdfs: 0,
    questions: 0
  });

  useEffect(() => {
    async function fetchCounts() {
      const studentsSnap = await getCountFromServer(collection(db, "users"));
      const coursesSnap = await getCountFromServer(collection(db, "courses"));
      const videosSnap = await getCountFromServer(collection(db, "videos"));
      const pdfsSnap = await getCountFromServer(collection(db, "pdfs"));
      const questionsSnap = await getCountFromServer(collection(db, "questions"));

      setStats({
        students: studentsSnap.data().count,
        courses: coursesSnap.data().count,
        videos: videosSnap.data().count,
        pdfs: pdfsSnap.data().count,
        questions: questionsSnap.data().count
      });
    }

    fetchCounts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Students" value={stats.students} />
        <StatCard title="Courses" value={stats.courses} />
        <StatCard title="Videos" value={stats.videos} />
        <StatCard title="PDFs" value={stats.pdfs} />
        <StatCard title="Questions" value={stats.questions} />
      </div>
    </div>
  );
}
