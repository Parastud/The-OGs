import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Camera,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react-native";

export default function CustomerProfileSetup() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft size={20} />
        <Text style={styles.logo}>Gigly</Text>
        <Text style={styles.step}>STEP 2 OF 2</Text>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Complete your profile</Text>
        <Text style={styles.subtitle}>
          This helps providers know who they are helping.
        </Text>
      </View>

      {/* Avatar Upload */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Camera size={20} color="#6C63FF" />
        </View>
        <Text style={styles.uploadText}>UPLOAD PHOTO</Text>
      </View>

      {/* Phone Input */}
      <Text style={styles.label}>PHONE NUMBER</Text>
      <View style={styles.inputBox}>
        <Phone size={18} color="#999" />
        <TextInput
          placeholder="+1 (555) 000-0000"
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

      {/* Location Input */}
      <Text style={styles.label}>LOCATION (CURRENT CITY)</Text>
      <View style={styles.inputBox}>
        <MapPin size={18} color="#999" />
        <TextInput
          placeholder="San Francisco, CA"
          style={styles.input}
        />
      </View>

      {/* Privacy Card */}
      <View style={styles.privacyCard}>
        <View style={styles.privacyIcon}>
          <ShieldCheck size={18} color="#6C63FF" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.privacyTitle}>
            Your privacy matters
          </Text>
          <Text style={styles.privacyText}>
            Gigly ensures your data is only shared with verified
            providers once you confirm a gig.
          </Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Start Exploring →
        </Text>
      </TouchableOpacity>
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
  step: {
    fontSize: 10,
    color: "#999",
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

  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#EDEBFF",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    color: "#6C63FF",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },

  label: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
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

  privacyCard: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  privacyIcon: {
    marginRight: 10,
  },
  privacyTitle: {
    fontWeight: "600",
  },
  privacyText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#6C63FF",
    marginTop: 30,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});