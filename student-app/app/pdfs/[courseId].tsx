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
import { getPdfsByCourse, PdfItem } from "../../src/firebase/pdfs";

export default function PdfsPage() {
  const params = useLocalSearchParams();

  // ✅ SAFELY NORMALIZE courseId
  const courseId =
    typeof params.courseId === "string"
      ? params.courseId
      : Array.isArray(params.courseId)
      ? params.courseId[0]
      : null;

  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ EXIT EARLY IF INVALID
    if (!courseId) {
      setLoading(false);
      return;
    }

    // ✅ PASS GUARANTEED STRING
    async function loadPdfs(id: string) {
      const data = await getPdfsByCourse(id);
      setPdfs(data);
      setLoading(false);
    }

    loadPdfs(courseId);
  }, [courseId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  function handlePdfPress(pdf: PdfItem) {
    if (!pdf.isFree) {
      Alert.alert(
        "Paid PDF",
        "Please purchase this course to unlock this PDF."
      );
      return;
    }

    if (!pdf.pdfUrl) {
      Alert.alert(
        "Unavailable",
        "PDF link not available"
      );
      return;
    }

    Linking.openURL(pdf.pdfUrl);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>📄 Notes / PDFs</Text>

      {pdfs.length === 0 ? (
        <Text style={styles.empty}>
          No PDFs added yet
        </Text>
      ) : (
        pdfs.map((pdf) => (
          <TouchableOpacity
            key={pdf.id}
            style={styles.card}
            onPress={() => handlePdfPress(pdf)}
          >
            <Text style={styles.title}>
              {pdf.title}
            </Text>
            <Text style={styles.meta}>
              {pdf.isFree ? "✅ Free" : "🔒 Paid"}
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
    marginTop: 6,
    color: "#6b7280"
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280"
  }
});
