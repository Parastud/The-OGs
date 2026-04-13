import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Upload,
  ShieldAlert,
} from "lucide-react-native";

const reasons = [
  "Job not completed as described",
  "Provider didn’t show up",
  "Quality of work was poor",
  "Payment issue",
  "Other",
];

const resolutions = [
  "Full Refund",
  "Partial Refund",
  "Redo the Job",
  "Other",
];

export default function DisputeScreen() {
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedResolution, setSelectedResolution] =
    useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <ArrowLeft size={22} />
          <Text style={styles.title}>Raise a Dispute</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* JOB CARD */}
        <View style={styles.card}>
          <Text style={styles.jobTitle}>
            Logo Design & Brand Identity
          </Text>
          <Text style={styles.sub}>with Sarah Miles</Text>

          <Text style={styles.amount}>₹650 in escrow</Text>
        </View>

        {/* INFO */}
        <View style={styles.info}>
          <ShieldAlert size={16} color="#6C63FF" />
          <Text style={styles.infoText}>
            Disputes are reviewed within 24–48 hours.
          </Text>
        </View>

        {/* REASON */}
        <Text style={styles.label}>Select Reason</Text>

        {reasons.map((r) => (
          <TouchableOpacity
            key={r}
            style={[
              styles.option,
              selectedReason === r && styles.activeOption,
            ]}
            onPress={() => setSelectedReason(r)}
          >
            <Text
              style={[
                styles.optionText,
                selectedReason === r && { color: "#6C63FF" },
              ]}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}

        {/* DESCRIPTION */}
        <Text style={styles.label}>Describe the Issue</Text>

        <TextInput
          placeholder="Explain your issue..."
          multiline
          value={description}
          onChangeText={setDescription}
          style={styles.textarea}
        />

        {/* EVIDENCE */}
        <Text style={styles.label}>Evidence</Text>

        <TouchableOpacity style={styles.uploadBox}>
          <Upload size={20} color="#6C63FF" />
          <Text style={styles.uploadText}>
            Tap to add photos or screenshots
          </Text>
        </TouchableOpacity>

        {/* RESOLUTION */}
        <Text style={styles.label}>Expected Resolution</Text>

        <View style={styles.resolutions}>
          {resolutions.map((r) => {
            const active = selectedResolution === r;

            return (
              <TouchableOpacity
                key={r}
                style={[
                  styles.resolution,
                  active && styles.activeResolution,
                ]}
                onPress={() => setSelectedResolution(r)}
              >
                <Text
                  style={[
                    styles.resolutionText,
                    active && { color: "#fff" },
                  ]}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Submit Dispute
          </Text>
        </TouchableOpacity>
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
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
  },

  jobTitle: {
    fontWeight: "700",
  },
  sub: {
    fontSize: 12,
    color: "#666",
  },
  amount: {
    marginTop: 6,
    color: "#6C63FF",
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  infoText: {
    fontSize: 12,
    marginLeft: 6,
    color: "#6C63FF",
  },

  label: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
  },

  option: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },

  activeOption: {
    borderWidth: 1,
    borderColor: "#6C63FF",
  },

  optionText: {
    fontSize: 13,
  },

  textarea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    height: 100,
    marginTop: 8,
    textAlignVertical: "top",
  },

  uploadBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginTop: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  uploadText: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
  },

  resolutions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  resolution: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 20,
  },

  activeResolution: {
    backgroundColor: "#6C63FF",
  },

  resolutionText: {
    fontSize: 12,
  },

  button: {
    backgroundColor: "#6C63FF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});