import { useRouter } from "expo-router";
import axios from "axios";
import { ArrowLeft, ChevronDown, MapPin, Sparkles } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  createConsumerJobService,
  generateConsumerJobDescriptionService,
  getProviderCategoriesService,
} from "@/src/services";

type Urgency = "normal" | "urgent";

type DateChoice = {
  key: string;
  day: string;
  dateLabel: string;
  isoDate: string;
};

const getDateChoices = (): DateChoice[] => {
  const now = new Date();

  return [0, 1, 2].map((offset) => {
    const d = new Date(now);
    d.setDate(now.getDate() + offset);

    return {
      key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      day:
        offset === 0
          ? "Today"
          : d.toLocaleDateString("en-US", { weekday: "short" }),
      dateLabel: d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }),
      isoDate: d.toISOString(),
    };
  });
};

const buildLocalDescription = (input: {
  title: string;
  urgency: Urgency;
  budget?: number;
  city: string;
  area: string;
}) => {
  const budgetLine = input.budget
    ? `My budget is up to INR ${Math.round(input.budget)}.`
    : "Please share your estimate before starting.";

  const urgencyLine =
    input.urgency === "urgent"
      ? "This is urgent and I need it done as early as possible."
      : "Timing is flexible, but I would like this completed soon.";

  return [
    `I need help with ${input.title}.`,
    `Location: ${input.city}, ${input.area}.`,
    urgencyLine,
    budgetLine,
    "Please bring the required tools and let me know the expected duration before starting.",
  ].join(" ");
};

export default function PostJobScreen() {
  const router = useRouter();
  const dateChoices = useMemo(() => getDateChoices(), []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [urgency, setUrgency] = useState<Urgency>("normal");
  const [selectedDate, setSelectedDate] = useState(dateChoices[0].key);

  const [categories, setCategories] = useState<string[]>(["Home Maintenance"]);
  const [selectedCategory, setSelectedCategory] = useState("Home Maintenance");
  const [showCategories, setShowCategories] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getProviderCategoriesService();
        const values =
          response?.data ||
          response?.providerCategories ||
          response?.categories;

        if (Array.isArray(values) && values.length > 0) {
          setCategories(values);
          setSelectedCategory(values[0]);
        }
      } catch {
        // Keep fallback category list if API fails.
      }
    };

    loadCategories();
  }, []);

  const selectedDateChoice =
    dateChoices.find((item) => item.key === selectedDate) || dateChoices[0];

  const handleSubmit = async () => {
    const cleanedTitle = title.trim();
    const cleanedDescription = description.trim();
    const parsedBudget = Number(budget.replace(/[^0-9.]/g, ""));

    if (!cleanedTitle) {
      Alert.alert("Missing title", "Please enter a job title.");
      return;
    }

    if (!cleanedDescription) {
      Alert.alert("Missing description", "Please describe your job.");
      return;
    }

    if (!selectedCategory) {
      Alert.alert("Missing category", "Please select a category.");
      return;
    }

    if (Number.isNaN(parsedBudget) || parsedBudget <= 0) {
      Alert.alert("Invalid budget", "Please enter a valid budget amount.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await createConsumerJobService({
        title: cleanedTitle,
        description: cleanedDescription,
        category: selectedCategory,
        budgetMin: urgency === "urgent" ? parsedBudget * 0.9 : parsedBudget,
        budgetMax: parsedBudget,
        locationCity: "Mathura",
        locationArea: "UP",
        deadline: selectedDateChoice.isoDate,
      });

      if (response?.success) {
        Alert.alert("Success", "Job posted successfully.", [
          {
            text: "View My Jobs",
            onPress: () => router.replace("/Customer/MyJobsScreen"),
          },
        ]);
        return;
      }

      Alert.alert("Unable to post", response?.message || "Try again.");
    } catch {
      Alert.alert("Unable to post", "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateDescription = async () => {
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      Alert.alert("Missing title", "Please enter a job title first.");
      return;
    }

    const parsedBudget = Number(budget.replace(/[^0-9.]/g, ""));
    const fallbackText = buildLocalDescription({
      title: cleanedTitle,
      urgency,
      budget: Number.isNaN(parsedBudget) ? undefined : parsedBudget,
      city: "Mathura",
      area: "UP",
    });

    try {
      setIsGeneratingDescription(true);

      const response = await generateConsumerJobDescriptionService({
        title: cleanedTitle,
        urgency,
        budgetMax: Number.isNaN(parsedBudget) ? undefined : parsedBudget,
        locationCity: "Mathura",
        locationArea: "UP",
      });

      const generatedText =
        response?.data?.description || response?.description || "";

      if (generatedText) {
        setDescription(generatedText);
        return;
      }

      setDescription(fallbackText);
      Alert.alert(
        "Using smart draft",
        response?.message || "AI response was empty, so a draft was generated.",
      );
    } catch (error) {
      setDescription(fallbackText);

      if (axios.isAxiosError(error)) {
        const serverMessage =
          (error.response?.data as { message?: string } | undefined)?.message ||
          "Could not reach AI service";

        Alert.alert("Using smart draft", serverMessage);
        return;
      }

      Alert.alert("Using smart draft", "Generated a local draft instead.");
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <ArrowLeft size={20} />
          </TouchableOpacity>
          <View>
            <Text style={styles.logo}>Post a job</Text>
            <Text style={styles.step}>STEP 1 OF 1</Text>
          </View>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.title}>What do you need help with?</Text>
        <Text style={styles.subtitle}>
          Describe your task and we will connect you with the best talent.
        </Text>

        <Text style={styles.label}>JOB TITLE</Text>
        <TextInput
          placeholder="e.g. Fix a leaking kitchen tap"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.rowBetween}>
          <Text style={styles.label}>JOB DESCRIPTION</Text>
          <TouchableOpacity
            style={styles.aiBtn}
            activeOpacity={0.8}
            onPress={handleGenerateDescription}
            disabled={isGeneratingDescription}
          >
            <Sparkles size={14} color="#6C63FF" />
            <Text style={styles.aiText}>
              {isGeneratingDescription ? "Writing..." : "Write with AI"}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Include details like tools required, size of the task, and any specific preferences..."
          style={[styles.input, { height: 100 }]}
          multiline
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        <Text style={styles.label}>CATEGORY</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowCategories((prev) => !prev)}
          activeOpacity={0.8}
        >
          <Text>{selectedCategory}</Text>
          <ChevronDown size={16} />
        </TouchableOpacity>

        {showCategories ? (
          <View style={styles.categoryMenu}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryItem}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategories(false);
                }}
              >
                <Text
                  style={[
                    styles.categoryItemText,
                    category === selectedCategory && styles.categoryItemActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        <Text style={styles.label}>BUDGET</Text>
        <TextInput
          placeholder="₹ 0.00"
          style={styles.input}
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />

        <Text style={styles.label}>URGENCY</Text>
        <View style={styles.urgencyRow}>
          <TouchableOpacity
            style={[
              styles.urgencyBtn,
              urgency === "normal" && styles.activeBtn,
            ]}
            onPress={() => setUrgency("normal")}
          >
            <Text
              style={[
                styles.urgencyText,
                urgency === "normal" && styles.activeText,
              ]}
            >
              Normal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.urgencyBtn,
              urgency === "urgent" && styles.urgentActive,
            ]}
            onPress={() => setUrgency("urgent")}
          >
            <Text
              style={[
                styles.urgencyText,
                urgency === "urgent" && { color: "#fff" },
              ]}
            >
              Urgent
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>TASK LOCATION</Text>
        <View style={styles.locationRow}>
          <MapPin size={16} color="#6C63FF" />
          <Text style={{ flex: 1 }}>Mathura, UP</Text>
          <Text style={styles.link}>Change</Text>
        </View>

        <Text style={styles.label}>AVAILABILITY</Text>
        <View style={styles.dateRow}>
          {dateChoices.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelectedDate(item.key)}
              style={[
                styles.dateBox,
                selectedDate === item.key && styles.dateActive,
              ]}
            >
              <Text
                style={[
                  styles.dateDay,
                  selectedDate === item.key && { color: "#6C63FF" },
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDate === item.key && {
                    color: "#6C63FF",
                    fontWeight: "600",
                  },
                ]}
              >
                {item.dateLabel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Posting..." : "Post Job ->"}
          </Text>
        </TouchableOpacity>
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  backBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { fontWeight: "600", fontSize: 16 },
  step: { fontSize: 10, color: "#999" },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
  },
  subtitle: { color: "#666", marginTop: 6 },

  label: {
    fontSize: 12,
    color: "#999",
    marginTop: 20,
  },

  input: {
    backgroundColor: "#F1F1F5",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  aiBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  aiText: { color: "#6C63FF", fontSize: 12 },

  dropdown: {
    backgroundColor: "#F1F1F5",
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryMenu: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ECECF2",
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoryItemText: {
    color: "#444",
    fontSize: 13,
  },
  categoryItemActive: {
    color: "#6C63FF",
    fontWeight: "600",
  },

  urgencyRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  urgencyBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
    alignItems: "center",
    marginRight: 5,
  },
  activeBtn: {
    borderWidth: 1,
    borderColor: "#6C63FF",
    backgroundColor: "#fff",
  },
  urgentActive: {
    backgroundColor: "#F59E0B",
  },
  urgencyText: { color: "#333" },
  activeText: { color: "#6C63FF" },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F5",
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
  },
  link: { color: "#6C63FF" },

  dateRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  dateBox: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
  },
  dateActive: {
    borderWidth: 1,
    borderColor: "#6C63FF",
    backgroundColor: "#fff",
  },
  dateDay: { fontSize: 10, color: "#666" },
  dateText: { fontSize: 12 },

  button: {
    backgroundColor: "#6C63FF",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
