import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react-native";

export default function CustomerSignup() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft size={20} />
        <Text style={styles.logo}>Gigly</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          Join the modern platform for trusted services and jobs.
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Name */}
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputBox}>
          <User size={18} color="#999" />
          <TextInput
            placeholder="Alex Sterling"
            style={styles.input}
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputBox}>
          <Mail size={18} color="#999" />
          <TextInput
            placeholder="alex@example.com"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputBox}>
          <Lock size={18} color="#999" />
          <TextInput
            placeholder="••••••••"
            secureTextEntry={!passwordVisible}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <EyeOff size={18} color="#999" />
            ) : (
              <Eye size={18} color="#999" />
            )}
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Divider */}
        <Text style={styles.divider}>OR CONTINUE WITH</Text>

        {/* Social */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.googleBtn}>
            <Text>🌐 Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appleBtn}>
            <Text style={{ color: "#fff" }}> Apple</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={{ color: "#666" }}>
          Already have an account?{" "}
          <Text style={styles.link}>Sign in</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

//
// 🎨 STYLES
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#6C63FF",
  },

  titleContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: "#666",
    marginTop: 6,
  },

  form: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F5",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
  },

  button: {
    backgroundColor: "#6C63FF",
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  divider: {
    textAlign: "center",
    marginVertical: 14,
    color: "#999",
    fontSize: 12,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  googleBtn: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },
  appleBtn: {
    flex: 1,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },

  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    color: "#6C63FF",
    fontWeight: "600",
  },
});