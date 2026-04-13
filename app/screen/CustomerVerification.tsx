import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  ShieldCheck,
  Upload,
  Lock,
  BadgeCheck,
  FileText,
} from "lucide-react-native";

export default function CustomerVerification() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ArrowLeft size={20} />
          <Text style={styles.logo}>Gigly</Text>
          <Text style={styles.step}>VERIFICATION</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={styles.progressLineActive} />
          <View style={styles.progressLineActive} />
          <View style={styles.progressLine} />
        </View>

        <Text style={styles.stepText}>Step 3 of 3</Text>

        {/* Title */}
        <Text style={styles.title}>Build Trust with Gigly</Text>
        <Text style={styles.subtitle}>
          Verify your identity to unlock better services and safety.
        </Text>

        {/* Government ID */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <FileText size={18} color="#6C63FF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Government ID</Text>
              <Text style={styles.cardSub}>
                Passport, Driving License or Aadhaar
              </Text>
            </View>
            <Text style={styles.required}>REQUIRED</Text>
          </View>

          <TouchableOpacity style={styles.uploadBtn}>
            <Upload size={14} color="#6C63FF" />
            <Text style={styles.uploadText}>Upload Document</Text>
          </TouchableOpacity>
        </View>

        {/* Certifications */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: "#E6F7EE" }]}>
              <BadgeCheck size={18} color="#16A34A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Certifications</Text>
              <Text style={styles.cardSub}>
                Add diplomas, licenses, or badges
              </Text>
            </View>
            <Text style={styles.optional}>OPTIONAL</Text>
          </View>

          <TouchableOpacity style={styles.uploadBtn}>
            <Upload size={14} color="#6C63FF" />
            <Text style={styles.uploadText}>Add Credentials</Text>
          </TouchableOpacity>
        </View>

        {/* Trust Card */}
        <View style={styles.trustCard}>
          <ShieldCheck size={20} color="#6C63FF" />
          <Text style={styles.trustTitle}>The Gigly Trust Mark</Text>
          <Text style={styles.trustText}>
            Once verified, this badge will appear on your profile to
            reassure service providers.
          </Text>
        </View>

        {/* Data Notice */}
        <View style={styles.notice}>
          <Lock size={16} color="#666" />
          <Text style={styles.noticeText}>
            Your data is encrypted and secure. Only verified providers
            can access relevant details when needed.
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Complete Registration →
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          By continuing, you agree to our Terms & Privacy Policy.
        </Text>
      </ScrollView>
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
    color: "#6C63FF",
  },
  step: {
    fontSize: 10,
    color: "#999",
  },

  progressRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 6,
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  progressLineActive: {
    flex: 1,
    height: 4,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
  },

  stepText: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  subtitle: {
    color: "#666",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    backgroundColor: "#EEF2FF",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  cardTitle: {
    fontWeight: "600",
  },
  cardSub: {
    fontSize: 12,
    color: "#666",
  },

  required: {
    fontSize: 10,
    color: "#F59E0B",
    fontWeight: "600",
  },
  optional: {
    fontSize: 10,
    color: "#999",
  },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },
  uploadText: {
    color: "#6C63FF",
    fontSize: 12,
  },

  trustCard: {
    backgroundColor: "#EEF2FF",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  trustTitle: {
    fontWeight: "600",
    marginTop: 6,
  },
  trustText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },

  notice: {
    flexDirection: "row",
    marginTop: 16,
    gap: 8,
    alignItems: "flex-start",
  },
  noticeText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },

  button: {
    backgroundColor: "#6C63FF",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  footer: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});