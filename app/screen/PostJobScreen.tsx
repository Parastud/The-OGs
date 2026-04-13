import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ArrowLeft,
    Sparkles,
    MapPin,
    ChevronDown,
} from "lucide-react-native";

export default function PostJobScreen() {
    const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <ArrowLeft size={20} />
                    <View>
                        <Text style={styles.logo}>Post a job</Text>
                        <Text style={styles.step}>STEP 1 OF 1</Text>
                    </View>
                    <View style={{ width: 20 }} />
                </View>

                {/* Title */}
                <Text style={styles.title}>
                    What do you need help with?
                </Text>
                <Text style={styles.subtitle}>
                    Describe your task and we’ll connect you with the best talent.
                </Text>

                {/* Job Title */}
                <Text style={styles.label}>JOB TITLE</Text>
                <TextInput
                    placeholder="e.g. Fix a leaking kitchen tap"
                    style={styles.input}
                />

                {/* Job Description */}
                <View style={styles.rowBetween}>
                    <Text style={styles.label}>JOB DESCRIPTION</Text>
                    <TouchableOpacity style={styles.aiBtn}>
                        <Sparkles size={14} color="#6C63FF" />
                        <Text style={styles.aiText}>Write with AI</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="Include details like tools required, size of the task, and any specific preferences..."
                    style={[styles.input, { height: 100 }]}
                    multiline
                />

                {/* Category */}
                <Text style={styles.label}>CATEGORY</Text>
                <View style={styles.dropdown}>
                    <Text>Home Maintenance</Text>
                    <ChevronDown size={16} />
                </View>

                {/* Budget */}
                <Text style={styles.label}>BUDGET</Text>
                <TextInput
                    placeholder="₹ 0.00"
                    style={styles.input}
                    keyboardType="numeric"
                />

                {/* Urgency */}
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
                            ⚡ Urgent
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Location */}
                <Text style={styles.label}>TASK LOCATION</Text>
                <View style={styles.locationRow}>
                    <MapPin size={16} color="#6C63FF" />
                    <Text style={{ flex: 1 }}>Mathura, UP</Text>
                    <Text style={styles.link}>Change</Text>
                </View>

                {/* Availability */}
                <Text style={styles.label}>AVAILABILITY</Text>
                <View style={styles.dateRow}>
                    <DateBox day="Today" date="24 Oct" active />
                    <DateBox day="Fri" date="25 Oct" />
                    <DateBox day="Sat" date="26 Oct" />
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Post Job →</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

//
// 🔷 COMPONENTS
//
const DateBox = ({
    day,
    date,
    active = false,
}: {
    day: string;
    date: string;
    active?: boolean;
}) => (
    <View style={[styles.dateBox, active && styles.dateActive]}>
        <Text style={[styles.dateDay, active && { color: "#6C63FF" }]}>
            {day}
        </Text>
        <Text
            style={[
                styles.dateText,
                active && { color: "#6C63FF", fontWeight: "600" },
            ]}
        >
            {date}
        </Text>
    </View>
);

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
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
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
    buttonText: { color: "#fff", fontWeight: "600" },
});