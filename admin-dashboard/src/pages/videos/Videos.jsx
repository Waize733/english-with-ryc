import { useEffect, useState } from "react";
import {
  listenToVideos,
  addVideo,
  updateVideo,
  deleteVideo
} from "../../firebase/videos";
import { listenToCourses } from "../../firebase/courses";
import VideoForm from "./VideoForm";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const unsubVideos = listenToVideos(setVideos);
    const unsubCourses = listenToCourses(setCourses);
    return () => {
      unsubVideos();
      unsubCourses();
    };
  }, []);

  async function handleSubmit(data) {
    if (editing) {
      await updateVideo(editing.id, data);
      setEditing(null);
    } else {
      await addVideo(data);
    }
  }

  return (
    <div className="space-y-8">
      <VideoForm
        onSubmit={handleSubmit}
        editingVideo={editing}
        courses={courses}
        onCancel={() => setEditing(null)}
      />

      <div className="grid gap-4">
        {videos.map(video => (
          <div key={video.id}
               className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between">
            <div>
              <h4 className="font-semibold">{video.title}</h4>
              <p className="text-sm text-gray-500">
                {video.courseTitle} • Order {video.order} • {video.isPaid ? "Paid" : "Free"}
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setEditing(video)} className="btn-secondary">
                Edit
              </button>
              <button onClick={() => deleteVideo(video.id)} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
