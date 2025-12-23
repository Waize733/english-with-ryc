import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getCourseById } from "../../src/firebase/courses";
import { getVideosByCourse } from "../../src/firebase/videos";

export default function CourseDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // ✅ SAFE NORMALIZATION
  const courseId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : null;

  const [course, setCourse] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ EXIT EARLY IF INVALID
    if (!courseId) {
      setLoading(false);
      return;
    }

    async function load(id: string) {
      const courseData = await getCourseById(id);
      const videoData = await getVideosByCourse(id);

      setCourse(courseData);
      setVideos(videoData);
      setLoading(false);
    }

    load(courseId);
  }, [courseId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.center}>
        <Text>Course not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Course Info */}
      <Text style={styles.title}>{course.title}</Text>

      <Text style={styles.meta}>
        {course.category} • {course.level}
      </Text>

      <Text style={styles.description}>
        {course.description}
      </Text>

      {/* Videos Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎥 Videos</Text>

        {videos.length === 0 ? (
          <Text style={styles.placeholder}>
            No videos added yet
          </Text>
        ) : (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              router.push(`/videos/${courseId}`)
            }
          >
            <Text style={styles.primaryButtonText}>
              ▶ View All Videos
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* PDFs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📄 Notes / PDFs</Text>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            router.push(`/pdfs/${courseId}`)
          }
        >
          <Text style={styles.secondaryButtonText}>
            📄 View PDFs
          </Text>
        </TouchableOpacity>
      </View>

      {/* MCQs Section */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>📝 MCQ Test</Text>

  <TouchableOpacity
    style={styles.secondaryButton}
    onPress={() => router.push(`/mcqs/${courseId}`)}
  >
    <Text style={styles.secondaryButtonText}>
      Start MCQ Test
    </Text>
  </TouchableOpacity>
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "700"
  },
  meta: {
    marginTop: 6,
    color: "#6b7280"
  },
  description: {
    marginTop: 14,
    fontSize: 16,
    lineHeight: 22
  },
  section: {
    marginTop: 28,
    padding: 14,
    backgroundColor: "#f9fafb",
    borderRadius: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  },
  placeholder: {
    color: "#6b7280"
  },

  /* Buttons */
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15
  },
  secondaryButton: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15
  }
});
