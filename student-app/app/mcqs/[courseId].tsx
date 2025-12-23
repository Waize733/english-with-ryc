import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getMcqsByCourse, McqItem } from "../../src/firebase/mcqs";

export default function McqTestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const courseId =
    typeof params.courseId === "string"
      ? params.courseId
      : Array.isArray(params.courseId)
      ? params.courseId[0]
      : null;

  const [mcqs, setMcqs] = useState<McqItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    async function load(id: string) {
      const data = await getMcqsByCourse(id);
      setMcqs(data);
      setLoading(false);
    }

    load(courseId);
  }, [courseId]);

  function nextQuestion() {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function submitTest() {
    let correct = 0;

    mcqs.forEach((mcq) => {
      if (selected[mcq.id] === mcq.correctAnswer) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (mcqs.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No MCQs available</Text>
      </View>
    );
  }

  /* ======================
     RESULT SCREEN
  ====================== */
  if (submitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>📊 Test Result</Text>

        <View style={styles.resultCard}>
          <Text>Total Questions: {mcqs.length}</Text>
          <Text>Correct Answers: {score}</Text>
          <Text style={styles.score}>
            Score: {Math.round((score / mcqs.length) * 100)}%
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.primaryButtonText}>
            🔁 Back to Course
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ======================
     SINGLE QUESTION VIEW
  ====================== */
  const mcq = mcqs[currentIndex];
  const selectedOption = selected[mcq.id];

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentIndex + 1} / {mcqs.length}
      </Text>

      <View style={styles.card}>
        <Text style={styles.question}>
          {mcq.question}
        </Text>

        {mcq.options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.option,
              selectedOption === i && styles.selectedOption
            ]}
            onPress={() =>
              setSelected((prev) => ({
                ...prev,
                [mcq.id]: i
              }))
            }
          >
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* NEXT / SUBMIT BUTTON */}
      {currentIndex < mcqs.length - 1 ? (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={nextQuestion}
          disabled={selectedOption === undefined}
        >
          <Text style={styles.buttonText}>Next Question ➡️</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitTest}
          disabled={selectedOption === undefined}
        >
          <Text style={styles.buttonText}>✅ Submit Test</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* ======================
   STYLES
====================== */
const styles = StyleSheet.create({
  container: { padding: 16 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16
  },
  progress: {
    marginBottom: 12,
    fontWeight: "600"
  },
  card: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 8
  },
  selectedOption: {
    backgroundColor: "#dbeafe",
    borderColor: "#2563eb"
  },
  nextButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  submitButton: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600"
  },
  resultCard: {
    backgroundColor: "#ecfeff",
    padding: 20,
    borderRadius: 14,
    marginVertical: 24
  },
  score: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600"
  }
});
