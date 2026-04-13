import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Star, Gift } from "lucide-react-native";

const feedbackOptions = [
  "On Time",
  "Professional",
  "Great Work",
  "Good Value",
  "Friendly",
];

export default function ReviewScreen() {
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [review, setReview] = useState("");

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <ArrowLeft size={22} />
          <Text style={styles.headerTitle}>Rate your experience</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* USER CARD */}
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/5.jpg",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Marcus Thompson</Text>
          <Text style={styles.sub}>Fix kitchen tap</Text>
        </View>

        {/* RATING */}
        <Text style={styles.label}>HOW WAS THE SERVICE?</Text>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <Star
                size={28}
                color={i <= rating ? "#F59E0B" : "#ddd"}
                fill={i <= rating ? "#F59E0B" : "none"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* TAGS */}
        <Text style={styles.label}>What went well?</Text>

        <View style={styles.tags}>
          {feedbackOptions.map((tag) => {
            const active = selectedTags.includes(tag);

            return (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  active && styles.activeTag,
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    active && { color: "#fff" },
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* TEXTAREA */}
        <Text style={styles.label}>
          Share more details (Optional)
        </Text>

        <TextInput
          placeholder="Describe your experience..."
          multiline
          value={review}
          onChangeText={setReview}
          style={styles.textarea}
        />

        {/* TIP CARD */}
        <View style={styles.tipCard}>
          <Gift size={18} color="#F59E0B" />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Add a tip</Text>
            <Text style={styles.tipSub}>
              Providers keep 100% of tips
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.tipBtn}>Add Tip</Text>
          </TouchableOpacity>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Submit Review
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
  headerTitle: {
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },

  name: {
    fontWeight: "700",
    marginTop: 8,
  },
  sub: {
    fontSize: 12,
    color: "#666",
  },

  label: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
  },

  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 6,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },

  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  activeTag: {
    backgroundColor: "#6C63FF",
  },

  tagText: {
    fontSize: 12,
    color: "#333",
  },

  textarea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    height: 100,
    marginTop: 8,
    textAlignVertical: "top",
  },

  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF4E5",
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
  },

  tipTitle: {
    fontWeight: "600",
  },
  tipSub: {
    fontSize: 12,
    color: "#666",
  },

  tipBtn: {
    color: "#F59E0B",
    fontWeight: "600",
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