import useAuthApi from "@/src/hooks/apiHooks/useAuthApi";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { FONTS } from "@/src/theme/fonts";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const BRAND = "#3B30C4";
const BRAND_LIGHT = "#EEEDFB";
const GRAY_BG = "#F4F4F8";
const GRAY_BORDER = "#E2E2EC";
const GRAY_TEXT = "#9898AA";
const DARK = "#111118";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = [
  { label: "Morning (6–12)", value: "morning" },
  { label: "Afternoon (12–17)", value: "afternoon" },
  { label: "Evening (17–22)", value: "evening" },
  { label: "Flexible", value: "flexible" },
];

const ID_TYPES = [
  "Aadhaar Card",
  "PAN Card",
  "Driving Licence",
  "Passport",
  "Voter ID",
];

function SectionLabel({ text }: { text: string }) {
  return <Text style={sectionStyles.label}>{text}</Text>;
}
const sectionStyles = StyleSheet.create({
  label: {
    fontFamily: FONTS.BOLD,
    fontSize: 11,
    color: GRAY_TEXT,
    letterSpacing: 1.4,
    marginBottom: 10,
    marginTop: 24,
  },
});

function StyledInput({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  prefix,
}: any) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[inputStyles.wrap, focused && inputStyles.focused]}>
      {prefix && <Text style={inputStyles.prefix}>{prefix}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={GRAY_TEXT}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={inputStyles.input}
      />
    </View>
  );
}

const inputStyles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GRAY_BG,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "transparent",
    paddingHorizontal: 16,
  },
  focused: {
    borderColor: BRAND,
    backgroundColor: BRAND_LIGHT,
  },
  prefix: {
    fontFamily: FONTS.BOLD,
    fontSize: 15,
    color: DARK,
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: DARK,
  },
});

function DayToggle({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (d: string) => void;
}) {
  return (
    <View style={dayStyles.row}>
      {DAYS.map((d) => {
        const active = selected.includes(d);
        return (
          <TouchableOpacity
            key={d}
            onPress={() => onToggle(d)}
            style={[dayStyles.dayChip, active && dayStyles.dayActive]}
            activeOpacity={0.75}
          >
            <Text
              style={[dayStyles.dayLabel, active && dayStyles.dayLabelActive]}
            >
              {d}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const dayStyles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8 },
  dayChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: GRAY_BORDER,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  dayActive: { backgroundColor: BRAND, borderColor: BRAND },
  dayLabel: { fontFamily: FONTS.REGULAR, fontSize: 12, color: DARK },
  dayLabelActive: { color: "#fff", fontFamily: FONTS.BOLD },
});

function TimeSlots({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (t: string) => void;
}) {
  return (
    <View style={{ gap: 8 }}>
      {TIME_SLOTS.map((slot) => {
        const active = selected.includes(slot.value);

        return (
          <TouchableOpacity
            key={slot.value}
            onPress={() => onToggle(slot.value)} // ✅ store backend value
            activeOpacity={0.75}
            style={[timeStyles.row, active && timeStyles.rowActive]}
          >
            <View style={[timeStyles.radio, active && timeStyles.radioActive]}>
              {active && <View style={timeStyles.radioDot} />}
            </View>

            <Text style={[timeStyles.label, active && timeStyles.labelActive]}>
              {slot.label} {/* UI label */}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const timeStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: GRAY_BORDER,
    backgroundColor: "#fff",
  },
  rowActive: { borderColor: BRAND, backgroundColor: BRAND_LIGHT },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: GRAY_BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: BRAND },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: BRAND },
  label: { fontFamily: FONTS.REGULAR, fontSize: 14, color: DARK },
  labelActive: { fontFamily: FONTS.BOLD, color: BRAND },
});

function PortfolioGrid({
  photos,
  onAdd,
}: {
  photos: string[];
  onAdd: () => void;
}) {
  const slots = Array(4)
    .fill(null)
    .map((_, i) => photos[i] ?? null);
  return (
    <View style={portfolioStyles.grid}>
      {slots.map((uri, i) => (
        <TouchableOpacity
          key={i}
          onPress={onAdd}
          activeOpacity={0.8}
          style={portfolioStyles.cell}
        >
          {uri ? (
            <Image source={{ uri }} style={portfolioStyles.image} />
          ) : (
            <View style={portfolioStyles.placeholder}>
              <Text style={portfolioStyles.plusIcon}>+</Text>
              <Text style={portfolioStyles.addLabel}>Add photo</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const portfolioStyles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cell: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  placeholder: {
    flex: 1,
    backgroundColor: GRAY_BG,
    borderWidth: 1.5,
    borderColor: GRAY_BORDER,
    borderStyle: "dashed",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  plusIcon: { fontFamily: FONTS.BOLD, fontSize: 28, color: GRAY_TEXT },
  addLabel: { fontFamily: FONTS.REGULAR, fontSize: 12, color: GRAY_TEXT },
});

// ─── ID type dropdown (simple list toggle) ────────────────────────────────────
function IdTypeSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={idStyles.trigger}
        onPress={() => setOpen((o) => !o)}
        activeOpacity={0.8}
      >
        <Text style={[idStyles.triggerText, !selected && { color: GRAY_TEXT }]}>
          {selected || "Select ID type"}
        </Text>
        <Text style={{ color: GRAY_TEXT }}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {open && (
        <View style={idStyles.dropdown}>
          {ID_TYPES.map((t) => (
            <TouchableOpacity
              key={t}
              style={idStyles.option}
              onPress={() => {
                onSelect(t);
                setOpen(false);
              }}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  idStyles.optionText,
                  t === selected && { color: BRAND, fontFamily: FONTS.BOLD },
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const idStyles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GRAY_BG,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  triggerText: { fontFamily: FONTS.REGULAR, fontSize: 15, color: DARK },
  dropdown: {
    marginTop: 4,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: GRAY_BORDER,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_BG,
  },
  optionText: { fontFamily: FONTS.REGULAR, fontSize: 14, color: DARK },
});

// ─── Verification badge strip ─────────────────────────────────────────────────
function VerificationBadge() {
  return (
    <View style={badgeStyles.wrap}>
      <Text style={badgeStyles.icon}>🔒</Text>
      <Text style={badgeStyles.text}>
        Your ID is encrypted and only used for verification. It is never shared
        with clients.
      </Text>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  icon: { fontSize: 16 },
  text: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: "#065F46",
    lineHeight: 18,
  },
});

export default function ProviderOnboarding2() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isLoading } = useAuthApi();
  const { updateProviderProfile } = useProviderApi();

  const [days, setDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [minRate, setMinRate] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [certText, setCertText] = useState("");
  const [portfolioPhotos] = useState<string[]>([]);

  const btnScale = useRef(new Animated.Value(1)).current;

  const toggleDay = (d: string) =>
    setDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );

const toggleTime = (t: string) =>
  setTimeSlots((prev) =>
    prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
  );

const handleSubmit = () => {
  Animated.sequence([
    Animated.timing(btnScale, {
      toValue: 0.95,
      duration: 80,
      useNativeDriver: true,
    }),
    Animated.timing(btnScale, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }),
  ]).start(async () => {
    const phone = String(params?.phone || "").trim();
    const fullname = String(params?.name || "").trim();

    console.log(params)
    const providerInput = {
      fullname,

      profilePhotoUrl:
        String(params?.photoUri || "").trim() || undefined,

      cityArea: String(params?.city || "").trim(),

      govtId: {
        idType: idType || undefined,
        idNumber: idNumber || undefined,
      },

      category: String(params?.category || "").trim(),

      yearsOfExperience:
        Number.parseInt(
          String(params?.experience || "").replace(/[^0-9]/g, ""),
          10
        ) || 0,

      skills: JSON.parse(String(params?.skills || "[]")),

      bio: String(params?.bio || "").trim(),

      availability: {
        availableDays: days,
        preferredWorkHours: timeSlots,
      },

      startingPrice: Number.parseFloat(minRate) || 0,

      portfolioPhotos,

      certifications: certText.trim()
        ? [{ text: certText.trim(), photoUrl: "" }]
        : [],

      whatsappNumber: whatsapp.trim() || phone,

      languagesSpoken: JSON.parse(String(params?.languages || "[]")),
    };

    const { success, debugOtp } = await updateProviderProfile({
      phone,
      input: providerInput,
    });

    if (!success) return;

    router.push({
      pathname: "/(auth)/VerifyOTP",
      params: {
        phone,
        debugOtp,
      },
    });
  });
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: "100%" }]} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.step}>Step 2 of 2</Text>
          <Text style={styles.title}>Availability & pricing</Text>
          <Text style={styles.subtitle}>
            Help clients book you at the right time for the right price.
          </Text>
        </View>

        {/* Days */}
        <SectionLabel text="AVAILABLE DAYS" />
        <DayToggle selected={days} onToggle={toggleDay} />

        {/* Time slots */}
        <SectionLabel text="PREFERRED WORK HOURS" />
        <TimeSlots selected={timeSlots} onToggle={toggleTime} />

        {/* Pricing */}
        <SectionLabel text="PRICING" />
        <View style={styles.priceRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.priceSubLabel}>Starting rate (₹)</Text>
            <StyledInput
              placeholder="500"
              value={minRate}
              onChangeText={setMinRate}
              keyboardType="numeric"
              prefix="₹"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.priceSubLabel}>Hourly rate (₹)</Text>
            <StyledInput
              placeholder="200/hr"
              value={hourlyRate}
              onChangeText={setHourlyRate}
              keyboardType="numeric"
              prefix="₹"
            />
          </View>
        </View>

        {/* WhatsApp */}
        <SectionLabel text="WHATSAPP NUMBER" />
        <StyledInput
          placeholder="98765 43210"
          value={whatsapp}
          onChangeText={setWhatsapp}
          keyboardType="phone-pad"
          prefix="+91"
        />

        {/* Portfolio */}
        <SectionLabel text="PORTFOLIO PHOTOS (optional)" />
        <Text style={styles.hint}>
          Show your best work — before/after shots work great.
        </Text>
        <View style={{ marginTop: 12 }}>
          <PortfolioGrid photos={portfolioPhotos} onAdd={() => { }} />
        </View>

        {/* Certifications */}
        <SectionLabel text="CERTIFICATIONS / QUALIFICATIONS (optional)" />
        <StyledInput
          placeholder="e.g. ITI Electrician (2018), NSDC Certified Plumber…"
          value={certText}
          onChangeText={setCertText}
        />

        {/* ID Verification */}
        <SectionLabel text="GOVERNMENT ID VERIFICATION" />
        <IdTypeSelector selected={idType} onSelect={setIdType} />
        <View style={{ marginTop: 10 }}>
          <StyledInput
            placeholder="Enter ID number"
            value={idNumber}
            onChangeText={setIdNumber}
          />
        </View>
        <VerificationBadge />

        {/* Upload ID photo */}
        <TouchableOpacity style={styles.uploadIdBtn} activeOpacity={0.8}>
          <Text style={styles.uploadIdIcon}>📎</Text>
          <Text style={styles.uploadIdText}>Upload ID photo</Text>
          <Text style={styles.uploadIdSubtext}>JPG or PDF · max 5MB</Text>
        </TouchableOpacity>

        {/* CTA */}
        <Animated.View
          style={{
            transform: [{ scale: btnScale }],
            marginTop: 36,
            marginBottom: 48,
          }}
        >
          <TouchableOpacity
            style={styles.cta}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>
              {isLoading ? "Sending OTP..." : "Complete Profile  ✓"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.ctaHint}>
            Your profile will be reviewed within 24 hours before going live.
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  progressTrack: { height: 4, backgroundColor: GRAY_BG, width: "100%" },
  progressFill: { height: 4, backgroundColor: BRAND, borderRadius: 2 },
  scroll: { paddingHorizontal: 24, paddingTop: 20 },
  header: { marginBottom: 4 },
  step: {
    fontFamily: FONTS.BOLD,
    fontSize: 11,
    color: BRAND,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 26,
    color: DARK,
    marginBottom: 8,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: GRAY_TEXT,
    lineHeight: 22,
  },
  hint: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: GRAY_TEXT,
    lineHeight: 20,
  },
  priceRow: { flexDirection: "row", gap: 12 },
  priceSubLabel: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: GRAY_TEXT,
    marginBottom: 6,
  },
  uploadIdBtn: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: GRAY_BG,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: GRAY_BORDER,
    borderStyle: "dashed",
  },
  uploadIdIcon: { fontSize: 20 },
  uploadIdText: { fontFamily: FONTS.BOLD, fontSize: 14, color: DARK, flex: 1 },
  uploadIdSubtext: {
    fontFamily: FONTS.REGULAR,
    fontSize: 11,
    color: GRAY_TEXT,
  },
  cta: {
    backgroundColor: BRAND,
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: "#fff",
    letterSpacing: 0.5,
  },
  ctaHint: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: GRAY_TEXT,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 18,
  },
});
