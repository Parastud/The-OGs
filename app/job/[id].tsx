import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, MapPin, CircleDollarSign, AlertCircle, FileText } from "lucide-react-native";
import { ScreenWrapper } from "@/src/components/wrapper";
import { FONTS } from "@/src/theme/fonts";
import { useState } from "react";

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");

  // Simulated Job Data based on ID for demo purposes
  const jobDetails = {
    id,
    title: id === "1" ? "Same-day Tutor work needed" : "AC Repair urgently",
    description: "Looking for an experienced professional to help me out. Need someone who can be available today. Please provide your best quote and estimated time to complete. Quality of work is highly appreciated and I will leave a 5-star review if done well.",
    budget: id === "1" ? "₹1200 - ₹4850" : "₹650 - ₹4650",
    distance: id === "1" ? "4.8 km away" : "1.6 km away",
    timePosted: "2 hours ago",
    customerName: id === "1" ? "Rajesh Kumar" : "Simran Kaur",
  };

  const handlePlaceBid = () => {
    // Navigate back to explore and simulate a success
    console.log("Bid placed successfully:", { bidAmount, proposal });
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScreenWrapper contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={["#6D5DF6", "#8A6DFF", "#B088FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconWrap}>
              <ArrowLeft size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.brand}>Job Details</Text>
            <View style={{ width: 38 }} />
          </View>
        </LinearGradient>

        <View style={styles.mainCard}>
          <Text style={styles.jobTitle}>{jobDetails.title}</Text>
          <Text style={styles.customerRef}>Posted by {jobDetails.customerName} • {jobDetails.timePosted}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <CircleDollarSign size={16} color="#6D5DF6" />
              <Text style={styles.metaText}>{jobDetails.budget}</Text>
            </View>
            <View style={styles.metaItem}>
              <MapPin size={16} color="#6D5DF6" />
              <Text style={styles.metaText}>{jobDetails.distance}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
             <FileText size={18} color="#1F2937" />
             <Text style={styles.sectionHeading}>Description</Text>
          </View>
          <Text style={styles.descriptionText}>{jobDetails.description}</Text>
        </View>

        <Text style={styles.submitHeading}>Submit your Proposal</Text>
        
        <View style={styles.bidForm}>
          <Text style={styles.inputLabel}>Your Bid Amount (₹)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 1500"
            keyboardType="numeric"
            value={bidAmount}
            onChangeText={setBidAmount}
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.inputLabel}>Cover Letter / Message</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Hi, I can assist you with this perfectly..."
            multiline
            numberOfLines={4}
            value={proposal}
            onChangeText={setProposal}
            placeholderTextColor="#9CA3AF"
          />

          <View style={styles.alertBox}>
            <AlertCircle size={18} color="#059669" />
            <Text style={styles.alertText}>
              Platform takes a 10% commission on the final payment. Ensure your bid reflects your final take-home.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.submitBtn} onPress={handlePlaceBid}>
            <Text style={styles.submitBtnText}>Place Bid</Text>
          </TouchableOpacity>
        </View>

      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollContent: { paddingBottom: 100 },
  header: {
    height: 140,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: "#6D5DF6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  iconWrap: { padding: 8 },
  brand: { fontSize: 20, fontFamily: FONTS.BOLD, color: "#fff" },
  mainCard: {
    marginHorizontal: 20,
    marginTop: -25, // Overlap effect
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  jobTitle: { fontSize: 20, fontFamily: FONTS.BOLD, color: "#1F2937", marginBottom: 6 },
  customerRef: { fontSize: 13, fontFamily: FONTS.REGULAR, color: "#6B7280", marginBottom: 16 },
  metaRow: { flexDirection: "row", gap: 12, marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#F3F4F6", flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#ECEBFF", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  metaText: { fontSize: 13, fontFamily: FONTS.SEMIBOLD, color: "#6D5DF6" },
  sectionHeading: { fontSize: 16, fontFamily: FONTS.SEMIBOLD, color: "#1F2937" },
  descriptionText: { fontSize: 14, fontFamily: FONTS.REGULAR, color: "#4B5563", lineHeight: 22 },
  submitHeading: { marginHorizontal: 20, marginTop: 24, fontSize: 18, fontFamily: FONTS.BOLD, color: "#1F2937" },
  bidForm: {
    marginHorizontal: 20,
    marginTop: 12,
  },
  inputLabel: { fontSize: 14, fontFamily: FONTS.SEMIBOLD, color: "#374151", marginBottom: 8 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: "#1F2937",
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    padding: 14,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
  },
  alertText: { fontSize: 13, fontFamily: FONTS.REGULAR, color: "#065F46", flex: 1, lineHeight: 18 },
  submitBtn: {
    backgroundColor: "#6D5DF6",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#6D5DF6",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 40
  },
  submitBtnText: { fontSize: 16, fontFamily: FONTS.BOLD, color: "#fff" },
});
