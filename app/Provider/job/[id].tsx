import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  MapPin,
  CircleDollarSign,
  AlertCircle,
  FileText,
} from "lucide-react-native";
import { ScreenWrapper } from "@/src/components/wrapper";
import { FONTS } from "@/src/theme/fonts";
import { useEffect, useMemo, useState } from "react";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";

type JobDetails = {
  id: string;
  title: string;
  description: string;
  budget: { min: number; max: number; display: string };
  distance: string;
  timePosted: string;
  customerName: string;
  hasBid?: boolean;
  myBid?: {
    id?: string;
    amount?: number;
    message?: string;
    status?: "pending" | "accepted" | "rejected" | "completed";
  } | null;
};

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams();
  const {
    getProviderJobDetails,
    placeBid,
    updateProviderBid,
    rejectProviderBid,
    isLoading,
  } = useProviderApi();
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobId = useMemo(() => {
    if (Array.isArray(id)) return id[0] || "";
    return typeof id === "string" ? id : "";
  }, [id]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) return;

      // Reset form when opening a job to avoid carrying state from previous screen instances.
      setBidAmount("");
      setProposal("");

      const data = await getProviderJobDetails(jobId);
      if (!data) return;

      setJobDetails({
        id: String(data.id || jobId),
        title: String(data.title || "Job"),
        description: String(data.description || "No description provided"),
        budget: {
          min: Number(data.budget?.min || 0),
          max: Number(data.budget?.max || 0),
          display: String(data.budget?.display || "₹0 - ₹0"),
        },
        distance: String(data.distance || "2.4 km away"),
        timePosted: String(data.timePosted || "Recently posted"),
        customerName: String(data.customerName || "Customer"),
        hasBid: Boolean(data.hasBid),
        myBid: data.myBid || null,
      });

      if (data?.hasBid && data?.myBid) {
        setBidAmount(String(data.myBid.amount || ""));
        setProposal(String(data.myBid.message || ""));
      }
    };

    fetchJobDetails();
  }, [getProviderJobDetails, jobId]);

  const handlePlaceBid = async () => {
    if (!jobDetails?.id) {
      Alert.alert("Error", "Job details are not loaded yet.");
      return;
    }

    const amount = Number.parseInt(bidAmount.trim(), 10);
    if (!Number.isFinite(amount) || amount <= 0) {
      Alert.alert("Invalid bid", "Please enter a valid bid amount.");
      return;
    }

    setIsSubmitting(true);
    const response = await placeBid({
      jobId: jobDetails.id,
      bidAmount: amount,
      bidMessage: proposal.trim() || undefined,
    });
    setIsSubmitting(false);

    if (!response?.success) return;

    setBidAmount("");
    setProposal("");

    router.back();
  };

  const handleUpdateBid = async () => {
    if (!jobDetails?.myBid?.id) {
      Alert.alert("Error", "Bid details are not available.");
      return;
    }

    const amount = Number.parseInt(bidAmount.trim(), 10);
    if (!Number.isFinite(amount) || amount <= 0) {
      Alert.alert("Invalid bid", "Please enter a valid bid amount.");
      return;
    }

    setIsSubmitting(true);
    const response = await updateProviderBid(jobDetails.myBid.id, {
      bidAmount: amount,
      bidMessage: proposal.trim(),
    });
    setIsSubmitting(false);

    if (!response?.success) return;

    const refreshed = await getProviderJobDetails(jobDetails.id);
    if (refreshed) {
      setJobDetails((prev) =>
        prev
          ? {
              ...prev,
              hasBid: Boolean(refreshed.hasBid),
              myBid: refreshed.myBid || prev.myBid,
            }
          : prev,
      );
    }
  };

  const handleRejectBid = () => {
    if (!jobDetails?.myBid?.id) {
      Alert.alert("Error", "Bid details are not available.");
      return;
    }

    Alert.alert("Reject Bid", "Are you sure you want to reject this bid?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reject",
        style: "destructive",
        onPress: async () => {
          setIsSubmitting(true);
          const response = await rejectProviderBid(jobDetails.myBid!.id!);
          setIsSubmitting(false);
          if (!response?.success) return;
          router.back();
        },
      },
    ]);
  };

  const canModifyBid =
    Boolean(jobDetails?.hasBid) && jobDetails?.myBid?.status === "pending";

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
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconWrap}
            >
              <ArrowLeft size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.brand}>Job Details</Text>
            <View style={{ width: 38 }} />
          </View>
        </LinearGradient>

        {isLoading && !jobDetails ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#6D5DF6" />
          </View>
        ) : !jobDetails ? (
          <View style={styles.errorWrap}>
            <Text style={styles.errorText}>Unable to load job details.</Text>
          </View>
        ) : (
          <>
            <View style={styles.mainCard}>
              <Text style={styles.jobTitle}>{jobDetails.title}</Text>
              <Text style={styles.customerRef}>
                Posted by {jobDetails.customerName} • {jobDetails.timePosted}
              </Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <CircleDollarSign size={16} color="#6D5DF6" />
                  <Text style={styles.metaText}>
                    {jobDetails.budget.display}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <MapPin size={16} color="#6D5DF6" />
                  <Text style={styles.metaText}>{jobDetails.distance}</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                <FileText size={18} color="#1F2937" />
                <Text style={styles.sectionHeading}>Description</Text>
              </View>
              <Text style={styles.descriptionText}>
                {jobDetails.description}
              </Text>
            </View>

            <Text style={styles.submitHeading}>
              {jobDetails.hasBid
                ? "Your Submitted Bid"
                : "Submit your Proposal"}
            </Text>

            <View style={styles.bidForm}>
              <Text style={styles.inputLabel}>Your Bid Amount (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 1500"
                keyboardType="numeric"
                value={bidAmount}
                onChangeText={setBidAmount}
                placeholderTextColor="#9CA3AF"
                editable={(!jobDetails.hasBid || canModifyBid) && !isSubmitting}
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
                editable={(!jobDetails.hasBid || canModifyBid) && !isSubmitting}
              />

              <View style={styles.alertBox}>
                <AlertCircle size={18} color="#059669" />
                <Text style={styles.alertText}>
                  Platform takes a 10% commission on the final payment. Ensure
                  your bid reflects your final take-home.
                </Text>
              </View>

              {!jobDetails.hasBid && (
                <TouchableOpacity
                  style={[
                    styles.submitBtn,
                    isSubmitting && styles.submitBtnDisabled,
                  ]}
                  onPress={handlePlaceBid}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitBtnText}>Place Bid</Text>
                  )}
                </TouchableOpacity>
              )}

              {jobDetails.hasBid && canModifyBid && (
                <View style={styles.rowActions}>
                  <TouchableOpacity
                    style={[
                      styles.submitBtn,
                      styles.flexBtn,
                      isSubmitting && styles.submitBtnDisabled,
                    ]}
                    onPress={handleUpdateBid}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.submitBtnText}>Update Bid</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={handleRejectBid}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.deleteBtnText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}

              {jobDetails.hasBid && !canModifyBid && (
                <Text style={styles.lockedHint}>
                  This bid is {jobDetails?.myBid?.status || "submitted"} and
                  cannot be edited.
                </Text>
              )}
            </View>
          </>
        )}
        <View style={{ height: 80 }} />
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
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  jobTitle: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    color: "#1F2937",
    marginBottom: 6,
  },
  customerRef: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: "#6B7280",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ECEBFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  metaText: { fontSize: 13, fontFamily: FONTS.SEMIBOLD, color: "#6D5DF6" },
  sectionHeading: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: "#1F2937",
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: "#4B5563",
    lineHeight: 22,
  },
  submitHeading: {
    marginHorizontal: 20,
    marginTop: 24,
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: "#1F2937",
  },
  bidForm: {
    marginHorizontal: 20,
    marginTop: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FONTS.SEMIBOLD,
    color: "#374151",
    marginBottom: 8,
  },
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
  alertText: {
    fontSize: 13,
    fontFamily: FONTS.REGULAR,
    color: "#065F46",
    flex: 1,
    lineHeight: 18,
  },
  submitBtn: {
    backgroundColor: "#6D5DF6",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#6D5DF6",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 40,
  },
  submitBtnText: { fontSize: 16, fontFamily: FONTS.BOLD, color: "#fff" },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  rowActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  flexBtn: {
    flex: 1,
    marginBottom: 0,
  },
  deleteBtn: {
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  deleteBtnText: {
    color: "#EF4444",
    fontSize: 15,
    fontFamily: FONTS.SEMIBOLD,
  },
  lockedHint: {
    marginTop: 8,
    marginBottom: 20,
    fontSize: 12,
    color: "#6B7280",
    fontFamily: FONTS.REGULAR,
  },
  loaderWrap: {
    marginTop: 60,
    alignItems: "center",
  },
  errorWrap: {
    marginTop: 60,
    alignItems: "center",
  },
  errorText: {
    fontFamily: FONTS.SEMIBOLD,
    color: "#6B7280",
  },
});
