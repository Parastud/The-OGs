import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const DOT_CYCLE = 1400;

export default function SplashScreen() {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  const dot0 = useRef(new Animated.Value(0.4)).current;
  const dot1 = useRef(new Animated.Value(0.4)).current;
  const dot2 = useRef(new Animated.Value(0.4)).current;

  const dotAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // Reset all animated values on mount
    logoScale.setValue(0);
    logoOpacity.setValue(0);
    textOpacity.setValue(0);
    taglineOpacity.setValue(0);
    dot0.setValue(0.4);
    dot1.setValue(0.4);
    dot2.setValue(0.4);

    const makeDotPulse = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.4,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.delay(DOT_CYCLE - delay - 700),
        ])
      );

    dotAnimationRef.current = Animated.parallel([
      makeDotPulse(dot0, 0),
      makeDotPulse(dot1, 200),
      makeDotPulse(dot2, 400),
    ]);

    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      dotAnimationRef.current?.start();
    });

    return () => {
      dotAnimationRef.current?.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Background circles */}
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      {/* Logo box */}
      <Animated.View
        style={[
          styles.logoBox,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Text style={styles.logoText}>OGs</Text>
      </Animated.View>

      {/* App name */}
      <Animated.Text style={[styles.appName, { opacity: textOpacity }]}>
        The OGs
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Hackvision
      </Animated.Text>

      {/* Animated dot loader */}
      <View style={styles.loaderRow}>
        {(['dot0', 'dot1', 'dot2'] as const).map((key, i) => (
          <Animated.View
            key={key}
            style={[
              styles.dot,
              i === 1 && styles.dotWide,
              { opacity: [dot0, dot1, dot2][i] },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.splashBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleLarge: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -width * 0.2,
    left: -width * 0.2,
  },
  circleSmall: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(0,0,0,0.06)',
    bottom: -width * 0.15,
    right: -width * 0.1,
  },

  logoBox: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: COLORS.logoBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  logoText: {
    fontFamily: FONTS.BOLD,
    fontSize: 32,
    color: COLORS.splashBackground,
    letterSpacing: 1,
  },

  appName: {
    fontFamily: FONTS.BOLD,
    fontSize: 42,
    color: COLORS.white,
    letterSpacing: 2,
    marginBottom: 10,
  },
  tagline: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1.5,
  },

  loaderRow: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  dotWide: {
    width: 20,
  },
});