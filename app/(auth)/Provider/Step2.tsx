import useAuthApi from "@/src/hooks/apiHooks/useAuthApi";
import useProviderApi from "@/src/hooks/apiHooks/useProviderApi";
import { FONTS } from "@/src/theme/fonts";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const BRAND = "#3B30C4";
const BRAND_LIGHT = "#EEEDFB";
const GRAY_BG = "#F4F4F8";
const GRAY_BORDER = "#E2E2EC";
const GRAY_TEXT = "#9898AA";
const DARK = "#111118";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = [
  { label: "Morning  ·  6 AM – 12 PM", value: "morning" },
  { label: "Afternoon  ·  12 PM – 5 PM", value: "afternoon" },
  { label: "Evening  ·  5 PM – 10 PM", value: "evening" },
  { label: "Flexible  ·  Any time", value: "flexible" },
];
const ID_TYPES = ["Aadhaar Card", "PAN Card", "Driving Licence", "Passport", "Voter ID"];

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 24 }}>
      <Text style={sL.label}>{text}</Text>
      {required && <Text style={sL.req}> *</Text>}
    </View>
  );
}
const sL = StyleSheet.create({
  label: { fontFamily: FONTS.BOLD, fontSize: 11, color: GRAY_TEXT, letterSpacing: 1.4 },
  req: { fontFamily: FONTS.BOLD, fontSize: 13, color: "#DC2626" },
});

// ─── Styled Input ─────────────────────────────────────────────────────────────
function StyledInput({
  placeholder, value, onChangeText, keyboardType, prefix, multiline, hasError,
}: any) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[iS.wrap, focused && iS.focused, hasError && iS.errBorder]}>
      {prefix && <Text style={iS.prefix}>{prefix}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={GRAY_TEXT}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[iS.input, multiline && { minHeight: 80, textAlignVertical: "top" }]}
      />
    </View>
  );
}
const iS = StyleSheet.create({
  wrap: {
    flexDirection: "row", alignItems: "center", backgroundColor: GRAY_BG,
    borderRadius: 14, borderWidth: 1.5, borderColor: "transparent", paddingHorizontal: 16,
  },
  focused: { borderColor: BRAND, backgroundColor: BRAND_LIGHT },
  errBorder: { borderColor: "#DC2626", backgroundColor: "#FEF2F2" },
  prefix: { fontFamily: FONTS.BOLD, fontSize: 15, color: DARK, marginRight: 6 },
  input: { flex: 1, paddingVertical: 14, fontFamily: FONTS.REGULAR, fontSize: 15, color: DARK },
});

// ─── Day Toggle ───────────────────────────────────────────────────────────────
function DayToggle({ selected, onToggle }: { selected: string[]; onToggle: (d: string) => void }) {
  return (
    <View style={dS.row}>
      {DAYS.map((d) => {
        const active = selected.includes(d);
        return (
          <TouchableOpacity key={d} onPress={() => onToggle(d)}
            style={[dS.chip, active && dS.active]} activeOpacity={0.75}>
            <Text style={[dS.label, active && dS.labelActive]}>{d}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const dS = StyleSheet.create({
  row: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  chip: {
    flex: 1, minWidth: 40, paddingVertical: 10, borderRadius: 10,
    borderWidth: 1.5, borderColor: GRAY_BORDER, backgroundColor: "#fff", alignItems: "center",
  },
  active: { backgroundColor: BRAND, borderColor: BRAND },
  label: { fontFamily: FONTS.REGULAR, fontSize: 12, color: DARK },
  labelActive: { color: "#fff", fontFamily: FONTS.BOLD },
});

// ─── Time Slots ───────────────────────────────────────────────────────────────
function TimeSlots({ selected, onToggle }: { selected: string[]; onToggle: (t: string) => void }) {
  return (
    <View style={{ gap: 8 }}>
      {TIME_SLOTS.map((slot) => {
        const active = selected.includes(slot.value);
        return (
          <TouchableOpacity key={slot.value} onPress={() => onToggle(slot.value)}
            activeOpacity={0.75} style={[tS.row, active && tS.rowActive]}>
            <View style={[tS.radio, active && tS.radioActive]}>
              {active && <View style={tS.dot} />}
            </View>
            <Text style={[tS.label, active && tS.labelActive]}>{slot.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const tS = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 13,
    paddingHorizontal: 16, borderRadius: 14, borderWidth: 1.5, borderColor: GRAY_BORDER, backgroundColor: "#fff",
  },
  rowActive: { borderColor: BRAND, backgroundColor: BRAND_LIGHT },
  radio: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2,
    borderColor: GRAY_BORDER, alignItems: "center", justifyContent: "center",
  },
  radioActive: { borderColor: BRAND },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: BRAND },
  label: { fontFamily: FONTS.REGULAR, fontSize: 14, color: DARK, flex: 1 },
  labelActive: { fontFamily: FONTS.BOLD, color: BRAND },
});

// ─── Portfolio Grid ───────────────────────────────────────────────────────────
function PortfolioGrid({ photos, onAdd }: { photos: string[]; onAdd: () => void }) {
  const slots = Array(4).fill(null).map((_, i) => photos[i] ?? null);
  return (
    <View style={pS.grid}>
      {slots.map((uri, i) => (
        <TouchableOpacity key={i} onPress={onAdd} activeOpacity={0.8} style={pS.cell}>
          {uri ? (
            <Image source={{ uri }} style={pS.image} />
          ) : (
            <View style={pS.placeholder}>
              <Text style={pS.plus}>+</Text>
              <Text style={pS.addLabel}>Add photo</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
const pS = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  cell: { width: "47%", aspectRatio: 1, borderRadius: 14, overflow: "hidden" },
  image: { width: "100%", height: "100%" },
  placeholder: {
    flex: 1, backgroundColor: GRAY_BG, borderWidth: 1.5, borderColor: GRAY_BORDER,
    borderStyle: "dashed", borderRadius: 14, alignItems: "center", justifyContent: "center", gap: 4,
  },
  plus: { fontFamily: FONTS.BOLD, fontSize: 28, color: GRAY_TEXT },
  addLabel: { fontFamily: FONTS.REGULAR, fontSize: 12, color: GRAY_TEXT },
});

// ─── ID Type Selector ─────────────────────────────────────────────────────────
function IdTypeSelector({
  selected, onSelect, hasError,
}: { selected: string; onSelect: (v: string) => void; hasError?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={[idS.trigger, hasError && idS.errBorder]}
        onPress={() => setOpen((o) => !o)} activeOpacity={0.8}>
        <Text style={[idS.triggerText, !selected && { color: GRAY_TEXT }]}>
          {selected || "Select ID type"}
        </Text>
        <Text style={{ color: GRAY_TEXT, fontSize: 12 }}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {open && (
        <View style={idS.dropdown}>
          {ID_TYPES.map((t) => (
            <TouchableOpacity key={t} style={idS.option}
              onPress={() => { onSelect(t); setOpen(false); }} activeOpacity={0.75}>
              <Text style={[idS.optionText, t === selected && { color: BRAND, fontFamily: FONTS.BOLD }]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
const idS = StyleSheet.create({
  trigger: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    backgroundColor: GRAY_BG, borderRadius: 14, paddingHorizontal: 16,
    paddingVertical: 15, borderWidth: 1.5, borderColor: "transparent",
  },
  errBorder: { borderColor: "#DC2626", backgroundColor: "#FEF2F2" },
  triggerText: { fontFamily: FONTS.REGULAR, fontSize: 15, color: DARK },
  dropdown: {
    marginTop: 4, backgroundColor: "#fff", borderRadius: 14,
    borderWidth: 1.5, borderColor: GRAY_BORDER, overflow: "hidden",
  },
  option: { paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: GRAY_BG },
  optionText: { fontFamily: FONTS.REGULAR, fontSize: 14, color: DARK },
});

// ─── Verification Modal ───────────────────────────────────────────────────────
function VerificationModal({
  visible, onConfirm, isLoading,
}: { visible: boolean; onConfirm: () => void; isLoading: boolean }) {
  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <View style={mS.overlay}>
        <View style={mS.sheet}>
          <View style={mS.handle} />

          <View style={mS.iconWrap}>
            <Text style={mS.iconEmoji}>🛡️</Text>
          </View>

          <Text style={mS.title}>Profile Under Review</Text>
          <Text style={mS.body}>
            Before you go live, our verification team will review your submitted
            details and government ID within{" "}
            <Text style={mS.bold}>24–48 hours</Text>.
          </Text>

          <View style={mS.divider} />

          {[
            { icon: "✅", text: "Your personal details & experience" },
            { icon: "🪪", text: "Government ID authenticity check" },
            { icon: "📋", text: "Category & skills validation" },
            { icon: "🔒", text: "Your data is encrypted & never shared with clients" },
          ].map((item, i) => (
            <View key={i} style={mS.checkRow}>
              <Text style={mS.checkIcon}>{item.icon}</Text>
              <Text style={mS.checkText}>{item.text}</Text>
            </View>
          ))}

          <View style={mS.divider} />

          <Text style={mS.notice}>
            You'll receive an SMS once your profile is approved. You won't be
            visible to clients until verification is complete.
          </Text>

          <TouchableOpacity
            style={[mS.btn, isLoading && { opacity: 0.7 }]}
            onPress={onConfirm}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            <Text style={mS.btnText}>
              {isLoading ? "Submitting…" : "Submit for Review  →"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const mS = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 28, paddingBottom: 48,
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: GRAY_BORDER,
    alignSelf: "center", marginBottom: 24,
  },
  iconWrap: {
    width: 68, height: 68, borderRadius: 34, backgroundColor: BRAND_LIGHT,
    alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 16,
  },
  iconEmoji: { fontSize: 32 },
  title: { fontFamily: FONTS.BOLD, fontSize: 22, color: DARK, textAlign: "center", marginBottom: 10 },
  body: {
    fontFamily: FONTS.REGULAR, fontSize: 14, color: GRAY_TEXT,
    textAlign: "center", lineHeight: 22, marginBottom: 20,
  },
  bold: { fontFamily: FONTS.BOLD, color: DARK },
  divider: { height: 1, backgroundColor: GRAY_BG, marginVertical: 16 },
  checkRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 12 },
  checkIcon: { fontSize: 16, marginTop: 1 },
  checkText: { fontFamily: FONTS.REGULAR, fontSize: 14, color: DARK, flex: 1, lineHeight: 20 },
  notice: {
    fontFamily: FONTS.REGULAR, fontSize: 12, color: GRAY_TEXT,
    textAlign: "center", lineHeight: 18, marginBottom: 24,
  },
  btn: {
    backgroundColor: BRAND, borderRadius: 16, height: 56,
    alignItems: "center", justifyContent: "center",
  },
  btnText: { fontFamily: FONTS.BOLD, fontSize: 16, color: "#fff", letterSpacing: 0.3 },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
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
  const [idPhotoUri, setIdPhotoUri] = useState<string | null>(null);
  const [certText, setCertText] = useState("");
  const [portfolioPhotos, setPortfolioPhotos] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({ idType: "", idNumber: "", idPhoto: "" });

  const btnScale = useRef(new Animated.Value(1)).current;

  const toggleDay = (d: string) =>
    setDays((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  const toggleTime = (t: string) =>
    setTimeSlots((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const pickIdPhoto = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.9, selectionLimit: 1 },
      (response) => {
        if (response.didCancel || response.errorCode) return;
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setIdPhotoUri(uri);
          setErrors((p) => ({ ...p, idPhoto: "" }));
        }
      }
    );
  };

  const pickPortfolioPhoto = () => {
    if (portfolioPhotos.length >= 4) return;
    launchImageLibrary(
      { mediaType: "photo", quality: 0.8, selectionLimit: 1 },
      (response) => {
        if (response.didCancel || response.errorCode) return;
        const uri = response.assets?.[0]?.uri;
        if (uri) setPortfolioPhotos((p) => [...p, uri]);
      }
    );
  };

  const validate = () => {
    const e = { idType: "", idNumber: "", idPhoto: "" };
    if (!idType) e.idType = "Please select an ID type";
    if (!idNumber.trim()) e.idNumber = "ID number is required";
    if (!idPhotoUri) e.idPhoto = "Please upload a photo of your ID";
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const handlePressSubmit = () => {
    if (!validate()) return;
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(btnScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start(() => setShowModal(true));
  };

  const handleConfirmSubmit = async () => {
    const phone = String(params?.phone || "").trim();
    const fullname = String(params?.name || "").trim();

    const providerInput = {
      fullname,
      profilePhotoUrl: undefined, // not sending photo
      cityArea: String(params?.city || "").trim(),
      govtId: { idType: idType || undefined, idNumber: idNumber || undefined },
      category: String(params?.category || "").trim(),
      yearsOfExperience:
        parseInt(String(params?.experience || "").replace(/[^0-9]/g, ""), 10) || 0,
      skills: JSON.parse(String(params?.skills || "[]")),
      bio: String(params?.bio || "").trim(),
      availability: { availableDays: days, preferredWorkHours: timeSlots },
      startingPrice: parseFloat(minRate) || 0,
      portfolioPhotos: [], // not sending photos
      certifications: certText.trim() ? [{ text: certText.trim(), photoUrl: "" }] : [],
      whatsappNumber: whatsapp.trim() || phone,
      languagesSpoken: JSON.parse(String(params?.languages || "[]")),
    };

    const { success, debugOtp } = await updateProviderProfile({ phone, input: providerInput });
    if (!success) { setShowModal(false); return; }

    router.push({ pathname: "/(auth)/VerifyOTP", params: { phone, debugOtp } });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      {/* Progress */}
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
          <Text style={styles.title}>Availability{"\n"}& pricing</Text>
          <Text style={styles.subtitle}>
            Help clients book you at the right time for the right price.
          </Text>
        </View>

        {/* Days */}
        <SectionLabel text="AVAILABLE DAYS" />
        <DayToggle selected={days} onToggle={toggleDay} />

        {/* Time Slots */}
        <SectionLabel text="PREFERRED WORK HOURS" />
        <TimeSlots selected={timeSlots} onToggle={toggleTime} />

        {/* Pricing */}
        <SectionLabel text="PRICING" />
        <View style={styles.priceRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.priceSubLabel}>Starting rate</Text>
            <StyledInput
              placeholder="500" value={minRate}
              onChangeText={setMinRate} keyboardType="numeric" prefix="₹"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.priceSubLabel}>Hourly rate</Text>
            <StyledInput
              placeholder="200" value={hourlyRate}
              onChangeText={setHourlyRate} keyboardType="numeric" prefix="₹"
            />
          </View>
        </View>

        {/* WhatsApp */}
        <SectionLabel text="WHATSAPP NUMBER" />
        <StyledInput
          placeholder="98765 43210"
          value={whatsapp}
          onChangeText={(t: string) => setWhatsapp(t.replace(/[^0-9]/g, "").slice(0, 10))}
          keyboardType="phone-pad"
          prefix="+91"
        />

        {/* Portfolio */}
        <SectionLabel text="PORTFOLIO PHOTOS (optional)" />
        <Text style={styles.hint}>Show your best work — before/after shots work great.</Text>
        <View style={{ marginTop: 12 }}>
          <PortfolioGrid photos={portfolioPhotos} onAdd={pickPortfolioPhoto} />
        </View>

        {/* Certifications */}
        <SectionLabel text="CERTIFICATIONS (optional)" />
        <StyledInput
          placeholder="e.g. ITI Electrician (2018), NSDC Certified…"
          value={certText}
          onChangeText={setCertText}
        />

        {/* ─── ID Verification REQUIRED ─── */}
        <SectionLabel text="GOVERNMENT ID VERIFICATION" required />
        <View style={styles.idInfoBox}>
          <Text style={styles.idInfoIcon}>🔒</Text>
          <Text style={styles.idInfoText}>
            A government-issued ID is{" "}
            <Text style={{ fontFamily: FONTS.BOLD, color: "#1E40AF" }}>mandatory</Text>{" "}
            to get verified and go live. Your ID is encrypted and never shared with clients.
          </Text>
        </View>

        <View style={{ marginTop: 14 }}>
          <IdTypeSelector
            selected={idType}
            onSelect={(v) => { setIdType(v); setErrors((p) => ({ ...p, idType: "" })); }}
            hasError={!!errors.idType}
          />
          {!!errors.idType && <Text style={styles.errText}>{errors.idType}</Text>}
        </View>

        <View style={{ marginTop: 10 }}>
          <StyledInput
            placeholder="Enter your ID number"
            value={idNumber}
            onChangeText={(v: string) => { setIdNumber(v); setErrors((p) => ({ ...p, idNumber: "" })); }}
            hasError={!!errors.idNumber}
          />
          {!!errors.idNumber && <Text style={styles.errText}>{errors.idNumber}</Text>}
        </View>

        {/* Upload ID Photo */}
        <TouchableOpacity
          style={[styles.uploadIdBtn, !!errors.idPhoto && styles.uploadIdBtnErr]}
          onPress={pickIdPhoto}
          activeOpacity={0.8}
        >
          {idPhotoUri ? (
            <>
              <Image source={{ uri: idPhotoUri }} style={styles.idThumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.uploadIdText}>ID photo uploaded ✓</Text>
                <Text style={styles.uploadIdSubtext}>Tap to change</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.uploadIdIcon}>📎</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.uploadIdText}>Upload ID photo</Text>
                <Text style={styles.uploadIdSubtext}>JPG or PDF · max 5 MB</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        {!!errors.idPhoto && <Text style={styles.errText}>{errors.idPhoto}</Text>}

        {/* CTA */}
        <Animated.View style={{ transform: [{ scale: btnScale }], marginTop: 36, marginBottom: 48 }}>
          <TouchableOpacity style={styles.cta} onPress={handlePressSubmit} activeOpacity={0.85}>
            <Text style={styles.ctaText}>Complete Profile  ✓</Text>
          </TouchableOpacity>
          <Text style={styles.ctaHint}>
            Your profile will be reviewed by our team within 24–48 hours before going live.
          </Text>
        </Animated.View>
      </ScrollView>

      <VerificationModal
        visible={showModal}
        onConfirm={handleConfirmSubmit}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  progressTrack: { height: 4, backgroundColor: GRAY_BG, width: "100%" },
  progressFill: { height: 4, backgroundColor: BRAND, borderRadius: 2 },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 },

  header: { marginBottom: 8 },
  step: { fontFamily: FONTS.BOLD, fontSize: 11, color: BRAND, letterSpacing: 1.5, marginBottom: 8 },
  title: { fontFamily: FONTS.BOLD, fontSize: 30, color: DARK, marginBottom: 10, lineHeight: 38 },
  subtitle: { fontFamily: FONTS.REGULAR, fontSize: 14, color: GRAY_TEXT, lineHeight: 22 },

  hint: { fontFamily: FONTS.REGULAR, fontSize: 13, color: GRAY_TEXT, lineHeight: 20 },
  errText: { fontFamily: FONTS.REGULAR, fontSize: 12, color: "#DC2626", marginTop: 5, marginLeft: 2 },

  priceRow: { flexDirection: "row", gap: 12 },
  priceSubLabel: { fontFamily: FONTS.REGULAR, fontSize: 12, color: GRAY_TEXT, marginBottom: 6 },

  idInfoBox: {
    flexDirection: "row", gap: 10, backgroundColor: "#EFF6FF", borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: "#BFDBFE", alignItems: "flex-start", marginBottom: 2,
  },
  idInfoIcon: { fontSize: 16 },
  idInfoText: { flex: 1, fontFamily: FONTS.REGULAR, fontSize: 13, color: "#1E40AF", lineHeight: 20 },

  uploadIdBtn: {
    marginTop: 10, flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: GRAY_BG, borderRadius: 14, padding: 16,
    borderWidth: 1.5, borderColor: GRAY_BORDER, borderStyle: "dashed",
  },
  uploadIdBtnErr: { borderColor: "#DC2626", backgroundColor: "#FEF2F2" },
  idThumb: { width: 48, height: 48, borderRadius: 8 },
  uploadIdIcon: { fontSize: 22 },
  uploadIdText: { fontFamily: FONTS.BOLD, fontSize: 14, color: DARK },
  uploadIdSubtext: { fontFamily: FONTS.REGULAR, fontSize: 11, color: GRAY_TEXT, marginTop: 2 },

  cta: {
    backgroundColor: BRAND, borderRadius: 16, height: 56,
    alignItems: "center", justifyContent: "center",
  },
  ctaText: { fontFamily: FONTS.BOLD, fontSize: 16, color: "#fff", letterSpacing: 0.5 },
  ctaHint: {
    fontFamily: FONTS.REGULAR, fontSize: 12, color: GRAY_TEXT,
    textAlign: "center", marginTop: 12, lineHeight: 18,
  },
});