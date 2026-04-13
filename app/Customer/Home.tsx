import { useRouter } from "expo-router";
import {
  Bell,
  PlusCircle,
  Search
} from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//
// 🔷 TYPES
//
type SkillProps = {
  label: string;
  active?: boolean;
};

type Provider = {
  id: string;
  name: string;
  rating: string;
  reviews: string;
  price: string;
  image: string;
};

type ProviderCardProps = {
  item: Provider;
};

type Job = {
  id: string;
  title: string;
  tag: string;
  bids: string;
  price: string;
  time: string;
};

type JobCardProps = {
  job: Job;
};

//
// 🔷 DATA
//
const providers: Provider[] = [
  {
    id: "1",
    name: "Arjun M.",
    rating: "4.8",
    reviews: "126",
    price: "₹299",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Sana R.",
    rating: "4.9",
    reviews: "221",
    price: "₹450",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const jobs: Job[] = [
  {
    id: "1",
    title: "Need urgent AC servicing and filter cleaning",
    tag: "REPAIRS",
    bids: "4 bids",
    price: "₹500–600",
    time: "2 min ago",
  },
  {
    id: "2",
    title: "Physics tuition for Class 12th board exams",
    tag: "TUTORING",
    bids: "12 bids",
    price: "₹400–600",
    time: "15 min ago",
  },
  {
    id: "3",
    title: "Design a minimalist logo for a startup",
    tag: "DESIGN",
    bids: "7 bids",
    price: "₹2000–4000",
    time: "1 hr ago",
  },
];

//
// 🔷 MAIN SCREEN
//
export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.location}>📍 Mathura, UP</Text>
          <View style={styles.headerRight}>
            <Text style={styles.logo}>Gigly</Text>
            <Bell size={20} color="#333" />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Search size={18} color="#999" />
          <Text style={styles.searchText}>
            What do you need help with?
          </Text>
        </View>

        {/* Skills */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse by skill</Text>
          <Text style={styles.link}>See all</Text>
        </View>

        <View style={styles.skillsRow}>
          <Skill label="Repairs" active />
          <Skill label="Tutoring" />
          <Skill label="Design" />
        </View>

        {/* Providers */}
        <Text style={styles.sectionTitle}>Top providers near you</Text>
        <FlatList
          horizontal
          data={providers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProviderCard item={item} />}
          showsHorizontalScrollIndicator={false}
        />

        {/* Jobs */}
        <Text style={styles.sectionTitle}>Recent job posts</Text>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/Customer/PostJobScreen")}
      >
        <PlusCircle color="#fff" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

//
// 🔷 COMPONENTS
//
const Skill: React.FC<SkillProps> = ({ label, active = false }) => (
  <TouchableOpacity
    style={[styles.skill, active && styles.skillActive]}
  >
    <Text style={[styles.skillText, active && { color: "#fff" }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const ProviderCard: React.FC<ProviderCardProps> = ({ item }) => (
  <View style={styles.providerCard}>
    <Image source={{ uri: item.image }} style={styles.avatar} />
    <Text style={styles.providerName}>{item.name}</Text>
    <Text style={styles.rating}>
      ⭐ {item.rating} • {item.reviews}
    </Text>
    <Text style={styles.price}>STARTS FROM {item.price}</Text>
  </View>
);

const JobCard: React.FC<JobCardProps> = ({ job }) => (
  <TouchableOpacity style={styles.jobCard}>
    <Text style={styles.jobTitle}>{job.title}</Text>
    <Text style={styles.jobTime}>{job.time}</Text>

    <View style={styles.jobMeta}>
      <Text style={styles.tag}>{job.tag}</Text>
      <Text style={styles.priceRange}>{job.price}</Text>
    </View>

    <Text style={styles.bids}>{job.bids}</Text>
  </TouchableOpacity>
);

//
// 🔷 STYLES
//
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  contentContainer: { paddingBottom: 112 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  location: { color: "#555" },
  headerRight: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  logo: { fontWeight: "bold", fontSize: 16 },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#EFEFF4",
    margin: 16,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  searchText: { marginLeft: 8, color: "#999" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 10,
  },
  link: { color: "#6C63FF" },

  skillsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  skill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#EAEAF0",
    borderRadius: 20,
  },
  skillActive: { backgroundColor: "#6C63FF" },
  skillText: { color: "#333" },

  providerCard: {
    backgroundColor: "#fff",
    padding: 12,
    margin: 10,
    borderRadius: 12,
    width: 140,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  providerName: { fontWeight: "600", marginTop: 6 },
  rating: { fontSize: 12, color: "#666" },
  price: { fontSize: 12, color: "#6C63FF", marginTop: 6 },

  jobCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 14,
    borderRadius: 12,
  },
  jobTitle: { fontWeight: "600" },
  jobTime: { fontSize: 12, color: "#999", marginTop: 4 },

  jobMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#E6F4EA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },
  priceRange: { fontSize: 12 },

  bids: { color: "green", marginTop: 6 },

  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#6C63FF",
    padding: 16,
    borderRadius: 50,
  },

});