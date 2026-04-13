import { FONTS } from '@/src/theme/fonts';
import { saveOnboardingStatus } from '@/src/utils/localStorageKey';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewToken
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ─── Slide data ────────────────────────────────────────────────────────────────
const slides = [
  {
    id: '1',
    emoji: '🛡️',
    bgTop: '#1A1060',
    bgBottom: '#2D1F8A',
    accentColor: '#F5A623',
    badge: 'Gigly Verified',
    title: 'Hire with confidence',
    subtitle:
      'Every provider is rated, reviewed, and trust‑scored by the Gigly community.',
  },
  {
    id: '2',
    emoji: '⚡',
    bgTop: '#0F2240',
    bgBottom: '#163560',
    accentColor: '#F5A623',
    badge: 'New Gig Available!',
    title: 'Post any task in seconds',
    subtitle:
      'From plumbing to tutoring — describe what you need and get bids fast.',
  },
  {
    id: '3',
    emoji: '💰',
    bgTop: '#1A0F00',
    bgBottom: '#3B2200',
    accentColor: '#F5A623',
    badge: 'Earnings Grow!',
    title: 'Earn on your terms',
    subtitle:
      'Offer your skills, set your price, and get paid securely via escrow in ₹.',
  },
];

// ─── Illustration per slide ─────────────────────────────────────────────────
function SlideIllustration({ slide }: { slide: typeof slides[0] }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.08, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.illustrationContainer}>
      {/* Glow ring */}
      <Animated.View
        style={[
          styles.glowRing,
          {
            borderColor: slide.accentColor + '55',
            transform: [{ scale: pulse }],
          },
        ]}
      />
      {/* Card */}
      <View style={[styles.illustrationCard, { backgroundColor: slide.bgBottom }]}>
        {/* Badge */}
        <View style={[styles.badge, { backgroundColor: slide.accentColor }]}>
          <Text style={styles.badgeText}>{slide.badge}</Text>
        </View>
        {/* Emoji icon */}
        <Text style={styles.illustrationEmoji}>{slide.emoji}</Text>
      </View>
    </View>
  );
}

// ─── Single slide ─────────────────────────────────────────────────────────────
function OnboardingSlide({ slide }: { slide: typeof slides[0] }) {
  return (
    <View style={[styles.slide, { width }]}>
      {/* Gradient-like background via layered views */}
      <View style={[styles.slideBgTop, { backgroundColor: slide.bgTop }]} />
      <View style={[styles.slideBgBottom, { backgroundColor: slide.bgBottom }]} />

      {/* Decorative circles */}
      <View style={styles.decoCircleTopLeft} />
      <View style={styles.decoCircleBottomRight} />

      {/* Illustration */}
      <SlideIllustration slide={slide} />

      {/* Text content */}
      <View style={styles.textContent}>
        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
      </View>
    </View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const finishOnboarding = async () => {
    await saveOnboardingStatus('true');
    router.replace('/(auth)/Login');
  };

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      finishOnboarding();
    }
  };

  const isLastSlide = currentIndex === slides.length - 1;
  const currentSlide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Skip */}
      {!isLastSlide && (
        <TouchableOpacity style={styles.skipBtn} onPress={finishOnboarding} activeOpacity={0.7}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OnboardingSlide slide={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      {/* Bottom controls */}
      <View style={styles.bottomBar}>
        {/* Dot indicators */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex
                  ? [styles.dotActive, { backgroundColor: currentSlide.accentColor }]
                  : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* CTA button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: currentSlide.accentColor }]}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>
              {isLastSlide ? 'GET STARTED' : 'Next  →'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const ILLUSTRATION_SIZE = width * 0.68;
const CARD_SIZE = ILLUSTRATION_SIZE * 0.78;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // ── Skip ──
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: 28,
    zIndex: 10,
  },
  skipText: {
    fontFamily: FONTS.BOLD,
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 1.5,
  },

  // ── Slide ──
  slide: {
    flex: 1,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  slideBgTop: {
    ...StyleSheet.absoluteFillObject,
    bottom: '45%',
  },
  slideBgBottom: {
    ...StyleSheet.absoluteFillObject,
    top: '55%',
    opacity: 0.6,
  },

  // Decorative circles
  decoCircleTopLeft: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(255,255,255,0.04)',
    top: -width * 0.2,
    left: -width * 0.2,
  },
  decoCircleBottomRight: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(0,0,0,0.12)',
    bottom: height * 0.18,
    right: -width * 0.1,
  },

  // ── Illustration ──
  illustrationContainer: {
    width: ILLUSTRATION_SIZE,
    height: ILLUSTRATION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    marginTop: 60,
  },
  glowRing: {
    position: 'absolute',
    width: ILLUSTRATION_SIZE,
    height: ILLUSTRATION_SIZE,
    borderRadius: ILLUSTRATION_SIZE / 2,
    borderWidth: 2,
  },
  illustrationCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badge: {
    position: 'absolute',
    top: -14,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontFamily: FONTS.BOLD,
    fontSize: 12,
    color: '#1A1060',
    letterSpacing: 0.5,
  },
  illustrationEmoji: {
    fontSize: 72,
    marginTop: 10,
  },

  // ── Text content ──
  textContent: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  slideTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: 0.3,
    lineHeight: 38,
  },
  slideSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 24,
  },

  // ── Bottom bar ──
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 48,
    paddingHorizontal: 28,
    alignItems: 'center',
    gap: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },
  dotActive: {
    width: 22,
  },
  dotInactive: {
    width: 7,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  ctaButton: {
    width: width - 56,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: FONTS.BOLD,
    fontSize: 15,
    color: '#1A1060',
    letterSpacing: 1.5,
  },
});