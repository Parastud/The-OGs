import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, User, CheckCircle } from "lucide-react-native";

//
// 🔷 TYPES
//
type Job = {
  id: string;
  title: string;
  location: string;
  price: string;
  bids: string;
  image: string;
};

//
// 🔷 DATA
//
const jobs: Job[] = [
  {
    id: "1",
    title: "Leaking Faucet & Sink Repair",
    location: "2.4 km away",
    price: "₹300–600",
    bids: "8 providers",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
  },
  {
    id: "2",
    title: "Ceiling Fan Installation",
    location: "1.8 km away",
    price: "₹200–500",
    bids: "5 providers",
    image: "https://cdn-icons-png.flaticon.com/512/1684/1684375.png",
  },
  {
    id: "3",
    title: "Deep Sofa Cleaning",
    location: "3.2 km away",
    price: "₹1000–1500",
    bids: "6 providers",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
];

//
// 🔷 MAIN
//
export default function CustomerDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>Gigly</Text>
            <Text style={styles.location}>📍 Mathura, UP</Text>
          </View>

          <View style={styles.headerRight}>
            <Bell size={20} color="#333" />
            <View style={styles.avatar}>
              <User size={18} color="#fff" />
            </View>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetText}>Good morning, Vaibhav 👋</Text>
          <Text style={styles.subText}>
            You have <Text style={styles.link}>3 new matches</Text>
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatCard label="Total Spent" value="₹12,400" />
          <StatCard label="Jobs Done" value="34" />
          <StatCard label="Completion Rate" value="97%" />
          <StatCard label="Active Jobs" value="03" />
        </View>

        {/* Trust Score */}
        <View style={styles.trustCard}>
          <View style={styles.trustRow}>
            <Text style={styles.trustLabel}>Trust Score</Text>
            <Text style={styles.trustValue}>92/100</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.trustBadges}>
            <Badge label="On Time" />
            <Badge label="Verified" />
            <Badge label="Top Rated" />
          </View>
        </View>

        {/* Jobs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Matched jobs for you</Text>
          <Text style={styles.link}>View all</Text>
        </View>

        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

//
// 🔷 COMPONENTS
//
const StatCard = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const Badge = ({ label }: { label: string }) => (
  <View style={styles.badge}>
    <CheckCircle size={12} color="green" />
    <Text style={styles.badgeText}>{label}</Text>
  </View>
);

const JobCard = ({ job }: { job: Job }) => (
  <View style={styles.jobCard}>
    <Image source={{ uri: job.image }} style={styles.jobImage} />

    <View style={{ flex: 1 }}>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.jobMeta}>{job.location}</Text>
      <Text style={styles.jobMeta}>{job.price}</Text>

      <View style={styles.jobFooter}>
        <Text style={styles.bids}>{job.bids}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

//
// 🔷 STYLES
//
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  logo: { fontWeight: "bold", fontSize: 18 },
  location: { color: "#666" },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    backgroundColor: "#6C63FF",
    padding: 8,
    borderRadius: 20,
  },

  greeting: { paddingHorizontal: 16 },
  greetText: { fontSize: 18, fontWeight: "600" },
  subText: { color: "#666", marginTop: 4 },
  link: { color: "#6C63FF" },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  statLabel: { color: "#666", fontSize: 12 },
  statValue: { fontSize: 18, fontWeight: "600", marginTop: 4 },

  trustCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  trustRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trustLabel: { fontWeight: "600" },
  trustValue: { fontWeight: "600", color: "#F59E0B" },

  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginVertical: 10,
  },
  progressFill: {
    width: "92%",
    height: 6,
    backgroundColor: "#F59E0B",
    borderRadius: 10,
  },

  trustBadges: {
    flexDirection: "row",
    gap: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: { fontSize: 12, color: "#333" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  sectionTitle: { fontWeight: "600" },

  jobCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
  },
  jobImage: { width: 50, height: 50, marginRight: 10 },

  jobTitle: { fontWeight: "600" },
  jobMeta: { fontSize: 12, color: "#666" },

  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  bids: { fontSize: 12, color: "#6C63FF" },

  button: {
    borderWidth: 1,
    borderColor: "#6C63FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: { color: "#6C63FF", fontSize: 12 },
});
