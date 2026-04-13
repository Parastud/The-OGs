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

// ─── Illustration placeholders (swap with your actual images/lottie) ──────────
function CustomerIllustration() {
  return (
    <View style={[illustStyles.wrap, illustStyles.wrapActive]}>
      <View style={illustStyles.avatarCircle}>
        <Text style={illustStyles.emoji}>🔍</Text>
      </View>
      {/* decorative dots */}
      <View
        style={[
          illustStyles.dot,
          { top: 16, left: 24, width: 6, height: 6, opacity: 0.5 },
        ]}
      />
      <View
        style={[
          illustStyles.dot,
          { top: 30, right: 32, width: 4, height: 4, opacity: 0.4 },
        ]}
      />
      <View
        style={[
          illustStyles.dot,
          { bottom: 18, right: 48, width: 5, height: 5, opacity: 0.35 },
        ]}
      />
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
      <View
        style={[
          illustStyles.avatarCircle,
          !selected && illustStyles.avatarCircleGray,
        ]}
      >
        <Text style={illustStyles.emoji}>🛠️</Text>
      </View>
      <View
        style={[
          illustStyles.dot,
          {
            top: 16,
            left: 24,
            width: 6,
            height: 6,
            opacity: selected ? 0.5 : 0.3,
          },
        ]}
      />
      <View
        style={[
          illustStyles.dot,
          {
            top: 30,
            right: 32,
            width: 4,
            height: 4,
            opacity: selected ? 0.4 : 0.2,
          },
        ]}
      />
    </View>
  );
}

const illustStyles = StyleSheet.create({
  wrap: {
    height: 160,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
  },
  wrapActive: {
    backgroundColor: "#2D1F8A",
  },
  wrapGray: {
    backgroundColor: "#C8C8D4",
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCircleGray: {
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  emoji: {
    fontSize: 32,
  },
  dot: {
    position: "absolute",
    borderRadius: 99,
    backgroundColor: "#7B6EF0",
  },
});

// ─── Role Card ────────────────────────────────────────────────────────────────
function RoleCard({
  emoji,
  title,
  description,
  selected,
  onPress,
  illustration,
}: {
  emoji: string;
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
      activeOpacity={0.85}
    >
      {/* Illustration */}
      {illustration}

      {/* Info row */}
      <View style={styles.cardInfoRow}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardTitle, !selected && styles.cardTitleGray]}>
            {title}
          </Text>
          <Text style={styles.cardDesc}>{description}</Text>
        </View>

        {/* Radio / Checkmark */}
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

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function RoleSelect() {
  const [role, setRole] = useState<"customer" | "provider">("customer");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const btnScale = useRef(new Animated.Value(1)).current;

  const handleContinue = () => {
    if (!role) return;
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
      if (role === "customer") {
        router.push({
          pathname: "/(auth)/Register",
        });
      } else {
        router.push({
          pathname: "/(auth)/Provider/Step1",
        });
      }
    });
  };

  return (
    <View style={styles.screen}>
      {/* Watermark */}
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
          emoji="🔍"
          title="Customer"
          description="I'm looking to hire experts for a task"
          selected={role === "customer"}
          onPress={() => setRole("customer")}
          illustration={<CustomerIllustration />}
        />
        <RoleCard
          emoji="🛠️"
          title="Provider"
          description="I want to offer my professional skills"
          selected={role === "provider"}
          onPress={() => setRole("provider")}
          illustration={<ProviderIllustration selected={role === "provider"} />}
        />
      </View>

      {/* Bottom */}
      <View style={styles.bottom}>
        {/* Step indicator */}
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>STEP 2 OF 4</Text>
          <View style={styles.stepDots}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[styles.stepDot, i === 1 && styles.stepDotActive]}
              />
            ))}
          </View>
        </View>

        {/* CTA */}
        <Animated.View style={{ transform: [{ scale: btnScale }] }}>
          <TouchableOpacity
            style={[styles.cta, !role && styles.ctaDisabled]}
            onPress={handleContinue}
            disabled={!role || isLoading}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Continue to next step →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FB",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 32,
    justifyContent: "space-between",
  },

  watermark: {
    position: "absolute",
    fontSize: 110,
    fontFamily: FONTS.BOLD,
    color: "rgba(59,48,196,0.04)",
    top: "30%",
    alignSelf: "center",
    letterSpacing: -4,
    pointerEvents: "none",
  },

  // ── Header ──
  header: {
    alignItems: "center",
    gap: 8,
  },
  logo: {
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    color: BRAND,
    marginBottom: 16,
  },
  title: {
    fontFamily: FONTS.BOLD,
    fontSize: 30,
    color: DARK,
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: GRAY_TEXT,
    textAlign: "center",
    lineHeight: 22,
  },

  // ── Cards ──
  cardsWrap: {
    flex: 1,
    justifyContent: "center",
    gap: 14,
    marginVertical: 24,
  },
  card: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: GRAY_BORDER,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardSelected: {
    borderColor: BRAND,
    borderWidth: 2.5,
    backgroundColor: BRAND_LIGHT,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  cardTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 17,
    color: DARK,
    marginBottom: 3,
  },
  cardTitleGray: {
    color: GRAY_TEXT,
  },
  cardDesc: {
    fontFamily: FONTS.REGULAR,
    fontSize: 13,
    color: GRAY_TEXT,
    lineHeight: 18,
  },

  // ── Radio / Check ──
  radio: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: GRAY_BORDER,
    flexShrink: 0,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: BRAND,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  checkMark: {
    color: "#fff",
    fontSize: 14,
    fontFamily: FONTS.BOLD,
  },

  // ── Bottom ──
  bottom: {
    gap: 16,
  },
  stepIndicator: {
    alignItems: "center",
    gap: 10,
  },
  stepText: {
    fontFamily: FONTS.BOLD,
    fontSize: 11,
    color: GRAY_TEXT,
    letterSpacing: 1.5,
  },
  stepDots: {
    flexDirection: "row",
    gap: 6,
  },
  stepDot: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: GRAY_BORDER,
  },
  stepDotActive: {
    backgroundColor: BRAND,
    width: 32,
  },

  // ── CTA ──
  cta: {
    backgroundColor: BRAND,
    borderRadius: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaDisabled: {
    opacity: 0.5,
  },
  ctaText: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    color: "#fff",
    letterSpacing: 0.3,
  },
});
