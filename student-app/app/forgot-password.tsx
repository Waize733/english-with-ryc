import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../src/firebase/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function reset() {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Reset link sent to email");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Reset Password</Text>

      <TextInput placeholder="Email" onChangeText={setEmail} style={{ borderWidth: 1, padding: 12, marginBottom: 12 }} />

      <TouchableOpacity onPress={reset} style={{ backgroundColor: "#2563eb", padding: 14 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
}
