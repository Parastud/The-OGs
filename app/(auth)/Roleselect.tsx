import { ScreenWrapper } from "@/src/components/wrapper";
import { FONTS } from "@/src/theme/fonts";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BRAND = "#3B30C4";
const BRAND_LIGHT = "#EEEDFB";
const GRAY_BORDER = "#E2E2EC";
const DARK = "#111118";
const GRAY_TEXT = "#9898AA";

/* ───────── Illustrations ───────── */
function CustomerIllustration({selected}: {selected?: boolean}) {
  return (
    <View
      style={[
        illustStyles.wrap,
        selected ? illustStyles.wrapActive : illustStyles.wrapGray,
      ]}
    >
      <View style={illustStyles.avatarCircle}>
        <Text style={illustStyles.emoji}>🔍</Text>
      </View>
    </View>
  );
}

function ProviderIllustration({ selected }: { selected: boolean }) {
  return (
    <View
      style={[
        illustStyles.wrap,
        selected ? illustStyles.wrapActive : illustStyles.wrapGray,
      ]}
    >
      <View style={illustStyles.avatarCircle}>
        <Text style={illustStyles.emoji}>🛠️</Text>
      </View>
    </View>
  );
}

const illustStyles = StyleSheet.create({
  wrap: {
    height: 140, // reduced → prevents overflow
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapActive: {
    backgroundColor: "#2D1F8A",
  },
  wrapGray: {
    backgroundColor: "#C8C8D4",
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 28,
  },
});

/* ───────── Card ───────── */
function RoleCard({
  title,
  description,
  selected,
  onPress,
  illustration,
}: {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  illustration: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {illustration}

      <View style={styles.cardInfoRow}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardTitle, !selected && styles.cardTitleGray]}>
            {title}
          </Text>
          <Text style={styles.cardDesc}>{description}</Text>
        </View>

        {selected ? (
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
        ) : (
          <View style={styles.radio} />
        )}
      </View>
    </TouchableOpacity>
  );
}

/* ───────── Screen ───────── */
export default function RoleSelect() {
  const [role, setRole] = useState<"customer" | "provider">("customer");
  const router = useRouter();
  const btnScale = useRef(new Animated.Value(1)).current;

  const handleContinue = () => {
    Animated.sequence([
      Animated.timing(btnScale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(btnScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push(
        role === "customer"
          ? "/(auth)/Register"
          : "/(auth)/Provider/Step1"
      );
    });
  };

  return (
    <ScreenWrapper
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      safeArea
    >
      <Text style={styles.watermark}>Gigly</Text>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Gigly ✦</Text>
        <Text style={styles.title}>How will you{"\n"}use Gigly?</Text>
        <Text style={styles.subtitle}>
          You can always switch later from your profile settings.
        </Text>
      </View>

      {/* Cards */}
      <View style={styles.cardsWrap}>
        <RoleCard
          title="Customer"
          description="I'm looking to hire experts"
          selected={role === "customer"}
          onPress={() => setRole("customer")}
          illustration={<CustomerIllustration selected={role === "customer"} />}
        />
        <RoleCard
          title="Provider"
          description="I want to offer my skills"
          selected={role === "provider"}
          onPress={() => setRole("provider")}
          illustration={<ProviderIllustration selected={role === "provider"} />}
        />
      </View>

      {/* Bottom */}
      <View style={styles.bottom}>
        <Animated.View style={{ transform: [{ scale: btnScale }] }}>
          <TouchableOpacity style={styles.cta} onPress={handleContinue}>
            <Text style={styles.ctaText}>Continue →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
}

/* ───────── Styles ───────── */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F7FB",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  watermark: {
    position: "absolute",
    fontSize: 100,
    fontFamily: FONTS.BOLD,
    color: "rgba(59,48,196,0.04)",
    top: "35%",
    alignSelf: "center",
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    fontFamily: FONTS.BOLD,
    fontSize: 20,
    color: BRAND,
    marginBottom: 10,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 26,
    textAlign: "center",
    color: DARK,
  },
  subtitle: {
    fontSize: 13,
    color: GRAY_TEXT,
    textAlign: "center",
    marginTop: 6,
  },

  cardsWrap: {
    gap: 14,
    marginTop: 10,
  },

  card: {
    borderRadius: 18,
    borderWidth: 2, // FIXED (no jump)
    borderColor: GRAY_BORDER,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardSelected: {
    borderColor: BRAND,
    backgroundColor: BRAND_LIGHT,
  },

  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },

  cardTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: DARK,
  },
  cardTitleGray: {
    color: GRAY_TEXT,
  },
  cardDesc: {
    fontSize: 12,
    color: GRAY_TEXT,
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: GRAY_BORDER,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BRAND,
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    color: "#fff",
    fontSize: 12,
  },

  bottom: {
    marginTop: 20,
  },

  cta: {
    height: 54,
    borderRadius: 14,
    backgroundColor: BRAND,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: "#fff",
    fontFamily: FONTS.BOLD,
    fontSize: 15,
  },
});