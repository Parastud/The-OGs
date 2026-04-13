import { ArrowLeft, ChevronDown, MapPin, Sparkles } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
    "Home Maintenance", "Plumbing", "Electrical", "Cleaning",
    "Painting", "Carpentry", "Moving & Delivery", "Tech Support",
    "Gardening", "Tutoring", "Other",
];

function getUpcomingDates() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return {
            day: i === 0 ? "Today" : days[d.getDay()],
            date: `${d.getDate()} ${months[d.getMonth()]}`,
        };
    });
}

export default function PostJobScreen() {
    const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");
    const [selectedDate, setSelectedDate] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Home Maintenance");
    const [budget, setBudget] = useState("");
    const [location, setLocation] = useState("Mathura, UP");
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const progressAnim = useRef(new Animated.Value(0)).current;
    const dates = getUpcomingDates();

    // --- Progress bar ---
    const filledCount = [title, description, budget].filter(Boolean).length + 1;
    const progressPercent = Math.min(100, (filledCount / 4) * 100);

    React.useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: progressPercent,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [progressPercent]);

    // --- Validation ---
    function validate() {
        const newErrors: Record<string, string> = {};
        if (!title.trim()) newErrors.title = "Please enter a job title.";
        if (!description.trim()) newErrors.description = "Please describe the task.";
        if (!budget || parseFloat(budget) <= 0) newErrors.budget = "Please enter a valid budget.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function clearError(field: string) {
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }

    // --- AI Description ---
    async function writeWithAI() {
        if (!title.trim()) {
            setErrors((prev) => ({ ...prev, title: "Enter a job title first." }));
            return;
        }
        setAiLoading(true);
        try {
            const res = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "claude-sonnet-4-20250514",
                    max_tokens: 1000,
                    messages: [{
                        role: "user",
                        content: `Write a clear, helpful job description for a task listing app. Job title: "${title}", Category: "${category}". Write 2-3 concise sentences covering what needs to be done, any relevant details, and what kind of worker would be ideal. Be practical and specific. Plain text only, no bullet points or headers.`,
                    }],
                }),
            });
            const data = await res.json();
            const text = data.content?.find((b: any) => b.type === "text")?.text || "";
            if (text) {
                setDescription(text.slice(0, 500));
                clearError("description");
            }
        } catch (e) {
            Alert.alert("Error", "Could not generate description. Try again.");
        } finally {
            setAiLoading(false);
        }
    }

    // --- Submit ---
    async function submitJob() {
        if (!validate()) return;
        setSubmitting(true);

        // Simulate API call
        await new Promise((r) => setTimeout(r, 1500));

        setSubmitting(false);
        setSubmitted(true);

        Animated.timing(progressAnim, {
            toValue: 100,
            duration: 400,
            useNativeDriver: false,
        }).start();

        Alert.alert(
            "Job Posted!",
            "We'll notify matching workers in your area.",
            [{ text: "OK", onPress: () => setSubmitted(false) }]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Progress Bar */}
            <View style={styles.progressTrack}>
                <Animated.View
                    style={[
                        styles.progressFill,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ["0%", "100%"],
                            }),
                        },
                    ]}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => Alert.alert("Go back")}>
                        <ArrowLeft size={18} color="#333" />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.headerTitle}>Post a job</Text>
                        <Text style={styles.step}>STEP 1 OF 1</Text>
                    </View>
                    <View style={{ width: 36 }} />
                </View>

                <Text style={styles.title}>What do you need help with?</Text>
                <Text style={styles.subtitle}>
                    Describe your task and we'll connect you with the best talent.
                </Text>

                {/* Job Title */}
                <Text style={styles.label}>JOB TITLE</Text>
                <TextInput
                    placeholder="e.g. Fix a leaking kitchen tap"
                    style={[styles.input, errors.title && styles.inputError]}
                    value={title}
                    onChangeText={(v) => { setTitle(v); clearError("title"); }}
                    placeholderTextColor="#aaa"
                />
                {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

                {/* Job Description */}
                <View style={styles.rowBetween}>
                    <Text style={styles.label}>JOB DESCRIPTION</Text>
                    <TouchableOpacity
                        style={styles.aiBtn}
                        onPress={writeWithAI}
                        disabled={aiLoading}
                    >
                        {aiLoading ? (
                            <ActivityIndicator size="small" color="#6C63FF" />
                        ) : (
                            <Sparkles size={13} color="#6C63FF" />
                        )}
                        <Text style={styles.aiText}>
                            {aiLoading ? "Writing..." : "Write with AI"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="Include details like tools required, size of the task, and any specific preferences..."
                    style={[styles.input, { height: 100 }, errors.description && styles.inputError]}
                    multiline
                    maxLength={500}
                    value={description}
                    onChangeText={(v) => { setDescription(v); clearError("description"); }}
                    placeholderTextColor="#aaa"
                />
                <Text style={styles.charCount}>{description.length} / 500</Text>
                {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

                {/* Category */}
                <Text style={styles.label}>CATEGORY</Text>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                >
                    <Text style={{ color: "#333" }}>{category}</Text>
                    <ChevronDown
                        size={16}
                        color="#666"
                        style={{
                            transform: [{ rotate: showCategoryPicker ? "180deg" : "0deg" }],
                        }}
                    />
                </TouchableOpacity>
                {showCategoryPicker && (
                    <View style={styles.categoryList}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryItem,
                                    cat === category && styles.categoryItemActive,
                                ]}
                                onPress={() => { setCategory(cat); setShowCategoryPicker(false); }}
                            >
                                <Text
                                    style={[
                                        styles.categoryItemText,
                                        cat === category && { color: "#6C63FF", fontWeight: "600" },
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Budget */}
                <Text style={styles.label}>BUDGET</Text>
                <View style={styles.budgetWrap}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <TextInput
                        placeholder="0.00"
                        style={[styles.input, styles.budgetInput, errors.budget && styles.inputError]}
                        keyboardType="numeric"
                        value={budget}
                        onChangeText={(v) => { setBudget(v); clearError("budget"); }}
                        placeholderTextColor="#aaa"
                    />
                </View>
                {errors.budget ? <Text style={styles.errorText}>{errors.budget}</Text> : null}

                {/* Urgency */}
                <Text style={styles.label}>URGENCY</Text>
                <View style={styles.urgencyRow}>
                    <TouchableOpacity
                        style={[styles.urgencyBtn, urgency === "normal" && styles.activeBtn]}
                        onPress={() => setUrgency("normal")}
                    >
                        <Text style={[styles.urgencyText, urgency === "normal" && styles.activeText]}>
                            Normal
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.urgencyBtn, urgency === "urgent" && styles.urgentActive]}
                        onPress={() => setUrgency("urgent")}
                    >
                        <Text style={[styles.urgencyText, urgency === "urgent" && { color: "#fff" }]}>
                            ⚡ Urgent
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Location */}
                <Text style={styles.label}>TASK LOCATION</Text>
                <View style={styles.locationRow}>
                    <MapPin size={16} color="#6C63FF" />
                    <Text style={styles.locationText}>{location}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            Alert.prompt
                                ? Alert.prompt("Change Location", "Enter city, state:", (val) => {
                                      if (val?.trim()) setLocation(val.trim());
                                  })
                                : Alert.alert("Change Location", "Update location in settings.")
                        }
                    >
                        <Text style={styles.link}>Change</Text>
                    </TouchableOpacity>
                </View>

                {/* Availability */}
                <Text style={styles.label}>AVAILABILITY</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.dateRow}>
                        {dates.map((d, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[styles.dateBox, selectedDate === i && styles.dateActive]}
                                onPress={() => setSelectedDate(i)}
                            >
                                <Text style={[styles.dateDay, selectedDate === i && { color: "#6C63FF" }]}>
                                    {d.day}
                                </Text>
                                <Text
                                    style={[
                                        styles.dateText,
                                        selectedDate === i && { color: "#6C63FF", fontWeight: "600" },
                                    ]}
                                >
                                    {d.date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/* Submit */}
                <TouchableOpacity
                    style={[styles.button, (submitting || submitted) && styles.buttonDisabled]}
                    onPress={submitJob}
                    disabled={submitting || submitted}
                >
                    {submitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {submitted ? "Posted ✓" : "Post Job →"}
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.bottomspace} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F9FB", paddingHorizontal: 20 },

    progressTrack: { height: 3, backgroundColor: "#E5E5F0", borderRadius: 2, marginBottom: 4 },
    progressFill: { height: 3, backgroundColor: "#6C63FF", borderRadius: 2 },

    header: {
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", marginTop: 10, marginBottom: 16,
    },
    backBtn: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: "#F1F1F5", alignItems: "center", justifyContent: "center",
    },
    headerTitle: { fontWeight: "600", fontSize: 15, color: "#111" },
    step: { fontSize: 10, color: "#999", marginTop: 1 },

    title: { fontSize: 20, fontWeight: "700", color: "#111", marginTop: 4 },
    subtitle: { color: "#666", marginTop: 6, marginBottom: 4, fontSize: 13, lineHeight: 18 },

    label: { fontSize: 10, color: "#999", marginTop: 18, marginBottom: 6, letterSpacing: 0.8, fontWeight: "600" },

    input: {
        backgroundColor: "#F1F1F5", borderRadius: 10, padding: 12,
        fontSize: 14, color: "#111", borderWidth: 1, borderColor: "transparent",
    },
    inputError: { borderColor: "#E24B4A", backgroundColor: "#FFF5F5" },
    errorText: { color: "#E24B4A", fontSize: 11, marginTop: 4 },
    charCount: { fontSize: 11, color: "#aaa", textAlign: "right", marginTop: 3 },

    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    aiBtn: { flexDirection: "row", alignItems: "center", gap: 4, padding: 4 },
    aiText: { color: "#6C63FF", fontSize: 12 },

    dropdown: {
        backgroundColor: "#F1F1F5", padding: 12, borderRadius: 10,
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    },
    categoryList: {
        backgroundColor: "#fff", borderRadius: 10, marginTop: 4,
        borderWidth: 1, borderColor: "#E5E5F0", overflow: "hidden",
    },
    categoryItem: { padding: 12, borderBottomWidth: 0.5, borderBottomColor: "#F1F1F5" },
    categoryItemActive: { backgroundColor: "#F3F2FF" },
    categoryItemText: { fontSize: 14, color: "#333" },

    budgetWrap: { flexDirection: "row", alignItems: "center" },
    currencySymbol: { position: "absolute", left: 12, zIndex: 1, fontSize: 14, color: "#666" },
    budgetInput: { flex: 1, paddingLeft: 28 },

    urgencyRow: { flexDirection: "row", gap: 8 },
    urgencyBtn: {
        flex: 1, padding: 10, borderRadius: 10,
        backgroundColor: "#F1F1F5", alignItems: "center",
    },
    activeBtn: { borderWidth: 1, borderColor: "#6C63FF", backgroundColor: "#F3F2FF" },
    urgentActive: { backgroundColor: "#F59E0B" },
    urgencyText: { color: "#333", fontSize: 13 },
    activeText: { color: "#6C63FF" },

    locationRow: {
        flexDirection: "row", alignItems: "center", gap: 8,
        backgroundColor: "#F1F1F5", padding: 12, borderRadius: 10,
    },
    locationText: { flex: 1, fontSize: 14, color: "#333" },
    link: { color: "#6C63FF", fontSize: 12 },

    dateRow: { flexDirection: "row", gap: 8, paddingBottom: 4 },
    dateBox: {
        paddingVertical: 10, paddingHorizontal: 14,
        backgroundColor: "#F1F1F5", borderRadius: 10, alignItems: "center",
        borderWidth: 1, borderColor: "transparent",
    },
    dateActive: { borderColor: "#6C63FF", backgroundColor: "#F3F2FF" },
    dateDay: { fontSize: 10, color: "#999", textTransform: "uppercase" },
    dateText: { fontSize: 12, color: "#333", marginTop: 2 },

    button: {
        backgroundColor: "#6C63FF", padding: 14, borderRadius: 12,
        alignItems: "center", marginTop: 28, marginBottom: 32,
    },
    buttonDisabled: { backgroundColor: "#B8B5E8" },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
    bottomspace:{ marginBottom: 32 },
});