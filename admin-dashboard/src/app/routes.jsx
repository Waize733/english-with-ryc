import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../pages/dashboard/Home";
import Courses from "../pages/courses/Courses";
import Videos from "../pages/videos/Videos";
import Pdfs from "../pages/pdfs/Pdfs";
import Questions from "../pages/questions/Questions";
import Mcqs from "../pages/mcqs/Mcqs";
import AppContent from "../pages/content/AppContent";



export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="videos" element={<Videos />} />
        <Route path="pdfs" element={<Pdfs />} />
        <Route path="questions" element={<Questions />} />
        <Route path="mcqs" element={<Mcqs />} />
        <Route path="content" element={<AppContent />} />
      </Route>
    </Routes>
  );
}
