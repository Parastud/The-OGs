import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  MapPin,
  CheckCircle,
  MessageCircle,
} from "lucide-react-native";

//
// 🔷 TYPES
//
type Bid = {
  id: string;
  name: string;
  price: string;
  rating: number;
  match: number;
  image: string;
  best?: boolean;
};

//
// 🔷 DATA
//
const bids: Bid[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    price: "₹650",
    rating: 4.9,
    match: 92,
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    best: true,
  },
  {
    id: "2",
    name: "Deepak Singh",
    price: "₹720",
    rating: 4.7,
    match: 84,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "3",
    name: "Sanjay Verma",
    price: "₹580",
    rating: 4.6,
    match: 76,
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
];

export default function JobDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <ArrowLeft size={22} />
          <Text style={styles.headerTitle}>Job Detail</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* TAGS */}
        <View style={styles.tags}>
          <Tag label="PLUMBING" />
          <Tag label="URGENT" color="#F59E0B" />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          Emergency pipe leak repair in main kitchen
        </Text>

        {/* INFO */}
        <View style={styles.infoRow}>
          <Text style={styles.info}>₹500 - ₹800</Text>
          <View style={styles.location}>
            <MapPin size={14} />
            <Text style={styles.info}>Indiranagar, BLR</Text>
          </View>
        </View>

        {/* TIMELINE */}
        <View style={styles.timeline}>
          <Step label="Posted" active />
          <Step label="Matched" active />
          <Step label="In Progress" />
          <Step label="Done" />
        </View>

        {/* BIDS */}
        <Text style={styles.section}>Bids (4)</Text>

        {bids.map((bid) => (
          <BidCard key={bid.id} bid={bid} />
        ))}

        {/* CHAT CTA */}
        <TouchableOpacity style={styles.chatAll}>
          <MessageCircle size={18} color="#6C63FF" />
          <Text style={styles.chatAllText}>
            Chat with top bidder
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

const Step = ({ label, active = false }: any) => (
  <View style={styles.step}>
    <View
      style={[
        styles.dot,
        { backgroundColor: active ? "#6C63FF" : "#ddd" },
      ]}
    />
    <Text style={{ fontSize: 10 }}>{label}</Text>
  </View>
);

const BidCard = ({ bid }: { bid: Bid }) => (
  <View
    style={[
      styles.card,
      bid.best && styles.bestCard,
    ]}
  >
    {/* TOP */}
    <View style={styles.cardHeader}>
      <Image source={{ uri: bid.image }} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{bid.name}</Text>
        <Text style={styles.rating}>⭐ {bid.rating}</Text>
      </View>

      {bid.best && (
        <View style={styles.bestBadge}>
          <CheckCircle size={12} color="#16A34A" />
          <Text style={styles.bestText}>Best Match</Text>
        </View>
      )}
    </View>

    {/* MATCH BAR */}
    <View style={styles.progressBar}>
      <View
        style={[
          styles.progressFill,
          { width: `${bid.match}%` },
        ]}
      />
    </View>

    {/* FOOTER */}
    <View style={styles.footer}>
      <Text style={styles.price}>{bid.price}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.profileBtn}>
          <Text>View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptBtn}>
          <Text style={{ color: "#fff" }}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
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

  tags: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  info: {
    color: "#666",
  },
  location: {
    flexDirection: "row",
    gap: 4,
  },

  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  step: {
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 4,
  },

  section: {
    marginTop: 20,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    elevation: 3,
  },
  bestCard: {
    borderWidth: 1,
    borderColor: "#16A34A",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  name: {
    fontWeight: "600",
  },
  rating: {
    fontSize: 12,
    color: "#666",
  },

  bestBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E6F7EE",
    padding: 4,
    borderRadius: 6,
  },
  bestText: {
    fontSize: 10,
    color: "#16A34A",
  },

  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 10,
  },
  progressFill: {
    height: 6,
    backgroundColor: "#F59E0B",
    borderRadius: 10,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
  },

  profileBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  acceptBtn: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  chatAll: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 12,
  },
  chatAllText: {
    color: "#6C63FF",
    fontWeight: "600",
  },
});