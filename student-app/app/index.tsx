import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { getAppContent } from "../src/firebase/appContent";

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const data = await getAppContent();
        setContent(data);
      } catch (e) {
        console.log("AppContent error:", e);
        setError(true);
      } finally {
        // 🔥 ALWAYS hide splash
        await SplashScreen.hideAsync();
      }
    }
    load();
  }, []);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Something went wrong. Please try again.
        </Text>
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Quote */}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          {content.welcomeQuote}
        </Text>
      </View>

      {/* View Courses */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/courses")}
      >
        <Text style={styles.primaryButtonText}>
          📚 View Courses
        </Text>
      </TouchableOpacity>

      {/* Ask the Professor */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/ask")}
      >
        <Text style={styles.secondaryButtonText}>
          ❓ Ask the Professor
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        🎬 Intro video will be added later
      </Text>
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
  quoteBox: {
    backgroundColor: "#e0f2fe",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  quoteText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center"
  },

  /* Buttons */
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 14
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  },
  secondaryButton: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  },

  note: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280"
  },
  errorText: {
    color: "red",
    fontSize: 16
  }
});
