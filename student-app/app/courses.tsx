import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { getCourses } from "../src/firebase/courses";

export default function CoursesScreen() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (courses.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No courses available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`/course/${item.id}`)}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.category} • {item.level}
          </Text>
          <Text style={styles.access}>
            {item.isPaid ? "🔒 Paid" : "✅ Free"}
          </Text>
        </TouchableOpacity>
      )}
    />
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
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: "600"
  },
  meta: {
    marginTop: 4,
    color: "#6b7280"
  },
  access: {
    marginTop: 8,
    fontWeight: "600",
    color: "#2563eb"
  }
});
