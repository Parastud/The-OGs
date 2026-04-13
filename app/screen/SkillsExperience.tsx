import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Monitor,
  PenTool,
  Wrench,
  Hammer,
  Megaphone,
  Edit3,
  Truck,
  Plus,
} from "lucide-react-native";

//
// 🔷 CATEGORY TYPE
//
type Category = {
  id: string;
  label: string;
  icon: any;
};

//
// 🔷 DATA
//
const categories: Category[] = [
  { id: "1", label: "Tech", icon: Monitor },
  { id: "2", label: "Design", icon: PenTool },
  { id: "3", label: "Plumbing", icon: Wrench },
  { id: "4", label: "Handyman", icon: Hammer },
  { id: "5", label: "Marketing", icon: Megaphone },
  { id: "6", label: "Writing", icon: Edit3 },
  { id: "7", label: "Logistics", icon: Truck },
];

export default function SkillsExperience() {
  const [selected, setSelected] = useState<string[]>(["1"]);
  const [years, setYears] = useState(5);

  const toggleCategory = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ArrowLeft size={20} />
          <Text style={styles.logo}>Gigly</Text>
          <Text style={styles.step}>STEP 2 OF 3</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Skills & Experience</Text>
        <Text style={styles.subtitle}>
          Choose categories and tell us about your experience.
        </Text>

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={styles.activeDot} />
          <View style={styles.activeDot} />
          <View style={styles.dot} />
        </View>

        {/* Categories */}
        <Text style={styles.label}>SELECT YOUR CATEGORIES</Text>

        <View style={styles.grid}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selected.includes(cat.id);

            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.card,
                  isActive && styles.activeCard,
                ]}
                onPress={() => toggleCategory(cat.id)}
              >
                <Icon
                  size={20}
                  color={isActive ? "#6C63FF" : "#666"}
                />
                <Text
                  style={[
                    styles.cardText,
                    isActive && { color: "#6C63FF" },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Add Other */}
          <TouchableOpacity style={styles.addCard}>
            <Plus size={20} color="#999" />
            <Text style={styles.addText}>Add Other</Text>
          </TouchableOpacity>
        </View>

        {/* Experience */}
        <Text style={styles.label}>YEARS OF EXPERIENCE</Text>

        <View style={styles.sliderRow}>
          <Text style={styles.sliderText}>0</Text>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                { width: `${years * 10}%` },
              ]}
            />
          </View>
          <Text style={styles.sliderText}>{years}+</Text>
        </View>

        {/* Bio */}
        <Text style={styles.label}>PROFESSIONAL BIO</Text>
        <TextInput
          placeholder="Describe your experience..."
          multiline
          style={styles.textarea}
        />

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextBtn}>
            <Text style={styles.nextText}>Next Step</Text>
          </TouchableOpacity>
        </View>
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

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
  },
  subtitle: {
    color: "#666",
    marginTop: 6,
  },

  progressRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 20,
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  activeDot: {
    width: 20,
    height: 6,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
  },

  label: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  activeCard: {
    borderWidth: 1,
    borderColor: "#6C63FF",
  },
  cardText: {
    marginTop: 6,
    color: "#333",
  },

  addCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
  addText: {
    marginTop: 6,
    color: "#999",
  },

  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  sliderFill: {
    height: 6,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
  },
  sliderText: {
    fontSize: 12,
    color: "#666",
  },

  textarea: {
    backgroundColor: "#F1F1F5",
    borderRadius: 10,
    padding: 12,
    height: 100,
    marginTop: 6,
    textAlignVertical: "top",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  back: {
    color: "#666",
  },
  nextBtn: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
});