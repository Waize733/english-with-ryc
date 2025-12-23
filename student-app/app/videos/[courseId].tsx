import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Linking
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getVideosByCourse, VideoItem } from "../../src/firebase/videos";

export default function VideosPage() {
  const params = useLocalSearchParams();

  // ✅ SAFELY NORMALIZE courseId
  const courseId =
    typeof params.courseId === "string"
      ? params.courseId
      : Array.isArray(params.courseId)
      ? params.courseId[0]
      : null;

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ EXIT EARLY IF INVALID
    if (!courseId) {
      setLoading(false);
      return;
    }

    // ✅ PASS GUARANTEED STRING
    async function loadVideos(id: string) {
      const data = await getVideosByCourse(id);
      setVideos(data);
      setLoading(false);
    }

    loadVideos(courseId);
  }, [courseId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  function handleVideoPress(video: VideoItem) {
    if (!video.isFree) {
      Alert.alert(
        "Paid Video",
        "Please purchase this course to unlock this video."
      );
      return;
    }

    if (!video.videoUrl) {
      Alert.alert(
        "Unavailable",
        "Video link not available"
      );
      return;
    }

    Linking.openURL(video.videoUrl);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>📹 Course Videos</Text>

      {videos.length === 0 ? (
        <Text style={styles.empty}>
          No videos added yet
        </Text>
      ) : (
        videos.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.card}
            onPress={() => handleVideoPress(video)}
          >
            <Text style={styles.title}>
              {video.title}
            </Text>
            <Text style={styles.meta}>
              ⏱ {video.duration || "N/A"} •{" "}
              {video.isFree ? "✅ Free" : "🔒 Paid"}
            </Text>
          </TouchableOpacity>
        ))
      )}
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
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2
  },
  title: {
    fontSize: 16,
    fontWeight: "600"
  },
  meta: {
    marginTop: 4,
    color: "#6b7280"
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280"
  }
});
