import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Plus,
  Minus,
  Calendar,
} from "lucide-react-native";

//
// 🔷 TYPES
//
type DateOption = {
  label: string;
  value: string;
};

const dates: DateOption[] = [
  { label: "Today", value: "24" },
  { label: "Tue", value: "25" },
  { label: "Wed", value: "26" },
];

export default function PlaceBidScreen() {
  const [amount, setAmount] = useState(620);
  const [selectedDate, setSelectedDate] = useState("24");
  const [note, setNote] = useState("");

  const increase = () => setAmount((prev) => prev + 20);
  const decrease = () => setAmount((prev) => Math.max(100, prev - 20));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <ArrowLeft size={22} />
          <Text style={styles.headerTitle}>Place a Bid</Text>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
        </View>

        {/* JOB CARD */}
        <View style={styles.jobCard}>
          <View style={styles.tagRow}>
            <Tag label="Home Repairs" />
            <Tag label="URGENT" color="#F59E0B" />
          </View>

          <Text style={styles.jobTitle}>
            Modern Kitchen Sink Installation
          </Text>

          <Text style={styles.subText}>₹500 - ₹800 Budget</Text>

          <View style={styles.userRow}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/2.jpg",
              }}
              style={styles.userImg}
            />
            <Text style={styles.userText}>
              Priya Sharma • Whitefield
            </Text>
          </View>

          <Text style={styles.desc}>
            Need a professional plumber to install a new sink and faucet...
          </Text>
        </View>

        {/* BID AMOUNT */}
        <Text style={styles.label}>Set Your Bid Amount</Text>

        <View style={styles.bidBox}>
          <TouchableOpacity onPress={decrease}>
            <Minus size={20} />
          </TouchableOpacity>

          <Text style={styles.amount}>₹ {amount}</Text>

          <TouchableOpacity onPress={increase}>
            <Plus size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.suggestion}>
          <Text style={styles.suggestionText}>
            Suggested ₹620 based on market rates
          </Text>
        </View>

        {/* DATE SELECTOR */}
        <Text style={styles.label}>Estimated Completion Date</Text>

        <View style={styles.dateRow}>
          {dates.map((d) => (
            <TouchableOpacity
              key={d.value}
              style={[
                styles.dateBox,
                selectedDate === d.value && styles.dateActive,
              ]}
              onPress={() => setSelectedDate(d.value)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === d.value && { color: "#fff" },
                ]}
              >
                {d.label}
              </Text>
              <Text
                style={[
                  styles.dateValue,
                  selectedDate === d.value && { color: "#fff" },
                ]}
              >
                {d.value}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.dateBox}>
            <Calendar size={16} />
            <Text style={styles.dateText}>Custom</Text>
          </View>
        </View>

        {/* NOTE */}
        <Text style={styles.label}>Your Proposal Note</Text>
        <TextInput
          placeholder="Introduce yourself and explain why you're the best fit..."
          multiline
          value={note}
          onChangeText={setNote}
          style={styles.textarea}
        />

        {/* CTA */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Confirm & Place Bid →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

//
// 🔷 COMPONENTS
//
const Tag = ({ label, color = "#6C63FF" }: any) => (
  <View style={[styles.tag, { backgroundColor: color + "20" }]}>
    <Text style={{ color, fontSize: 10 }}>{label}</Text>
  </View>
);

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
  headerTitle: {
    fontWeight: "600",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },

  jobCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },

  tagRow: {
    flexDirection: "row",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },

  subText: {
    color: "#6C63FF",
    marginTop: 4,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  userImg: {
    width: 26,
    height: 26,
    borderRadius: 20,
    marginRight: 6,
  },
  userText: {
    fontSize: 12,
    color: "#666",
  },

  desc: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
  },

  label: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
  },

  bidBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },

  amount: {
    fontSize: 26,
    fontWeight: "800",
  },

  suggestion: {
    backgroundColor: "#EDEBFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  suggestionText: {
    color: "#6C63FF",
    fontSize: 12,
  },

  dateRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  dateBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  dateActive: {
    backgroundColor: "#6C63FF",
  },

  dateText: {
    fontSize: 10,
    color: "#666",
  },
  dateValue: {
    fontWeight: "600",
  },

  textarea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    height: 100,
    marginTop: 8,
    textAlignVertical: "top",
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