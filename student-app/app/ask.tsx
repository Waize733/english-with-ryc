import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { askQuestion } from "../src/firebase/questions";

export default function AskProfessorScreen() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!question.trim()) {
      Alert.alert("Error", "Please enter a question");
      return;
    }

    try {
      setLoading(true);
      await askQuestion(question);
      setQuestion("");
      Alert.alert(
        "Submitted",
        "Your question has been sent to the professor."
      );
    } catch (e) {
      Alert.alert("Error", "Failed to submit question");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.heading}>❓ Ask the Professor</Text>

      <TextInput
        style={styles.input}
        placeholder="Type your question here..."
        value={question}
        onChangeText={setQuestion}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={submit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Submitting..." : "Submit Question"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 16
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});
