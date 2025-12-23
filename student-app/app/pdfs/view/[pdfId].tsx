import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useLocalSearchParams } from "expo-router";
import { getPdfById } from "../../../src/firebase/pdfs";

const FS = FileSystem as any; // ✅ TS FIX

type PdfItem = {
  id: string;
  title: string;
  pdfUrl: string;
  isFree: boolean;
};

export default function PdfViewerScreen() {
  const params = useLocalSearchParams();

  const rawPdfId =
    typeof params.pdfId === "string"
      ? params.pdfId
      : Array.isArray(params.pdfId)
      ? params.pdfId[0]
      : null;

  const [pdf, setPdf] = useState<PdfItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!rawPdfId) {
      setLoading(false);
      return;
    }

    async function loadPdf(id: string) {
      const data = await getPdfById(id);
      setPdf(data);
      setLoading(false);
    }

    loadPdf(rawPdfId);
  }, [rawPdfId]);

  async function openPdf() {
    if (!pdf) return;

    const baseDir =
      FS.documentDirectory ?? FS.cacheDirectory;

    if (!baseDir) {
      Alert.alert("Error", "Storage not available");
      return;
    }

    const fileUri = baseDir + `${pdf.id}.pdf`;
    const fileInfo = await FS.getInfoAsync(fileUri);

    try {
      setDownloading(true);

      if (!fileInfo.exists) {
        await FS.downloadAsync(pdf.pdfUrl, fileUri);
      }

      await Sharing.shareAsync(fileUri);
    } catch (e) {
      Alert.alert("Error", "Unable to open PDF");
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pdf) {
    return (
      <View style={styles.center}>
        <Text>PDF not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pdf.title}</Text>

      {pdf.isFree ? (
        <TouchableOpacity
          style={styles.button}
          onPress={openPdf}
          disabled={downloading}
        >
          <Text style={styles.buttonText}>
            {downloading ? "Downloading..." : "📄 Open PDF"}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.locked}>🔒 This PDF is paid</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  locked: {
    textAlign: "center",
    color: "#ef4444",
    fontSize: 16
  }
});
