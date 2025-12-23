import { useEffect, useState } from "react";
import {
  listenToQuestions,
  replyToQuestion
} from "../../firebase/questions";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [active, setActive] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    return listenToQuestions(setQuestions);
  }, []);

  async function handleReply() {
    if (!reply.trim()) return;
    await replyToQuestion(active.id, reply);
    setReply("");
    setActive(null);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inbox */}
      <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h3 className="p-4 font-semibold border-b">Student Questions</h3>

        <div className="divide-y">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setActive(q)}
              className={`w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                q.answered ? "opacity-60" : ""
              }`}
            >
              <p className="font-medium">{q.studentName}</p>
              <p className="text-sm text-gray-500 truncate">
                {q.question}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail + Reply */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        {active ? (
          <>
            <h3 className="text-lg font-semibold mb-2">
              {active.studentName}
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Course: {active.courseTitle || "General"}
            </p>

            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
              {active.question}
            </div>

            {active.answered ? (
              <div className="p-4 bg-green-100 dark:bg-green-800 rounded">
                <strong>Answered:</strong>
                <p className="mt-2">{active.answer}</p>
              </div>
            ) : (
              <>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write your reply..."
                  className="input mb-4"
                />

                <button
                  onClick={handleReply}
                  className="btn-primary"
                >
                  Send Reply
                </button>
              </>
            )}
          </>
        ) : (
          <p className="text-gray-500">
            Select a question to view details
          </p>
        )}
      </div>
    </div>
  );
}
