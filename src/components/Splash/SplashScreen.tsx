import { setAuthorizationStatus, setInitialized } from '@/src/redux/slices/auth.slice';
import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { getAccessTokenFromSecureStore } from '@/src/utils/localStorageKey';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  // One animated value per dot
  const dot0 = useRef(new Animated.Value(0.4)).current;
  const dot1 = useRef(new Animated.Value(0.4)).current;
  const dot2 = useRef(new Animated.Value(0.4)).current;

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getAccessTokenFromSecureStore();
        if (token) {
          dispatch(setAuthorizationStatus(true));
          router.replace('/(tabs)')
        } else {
          dispatch(setAuthorizationStatus(false));
          router.replace('/(auth)/Login')
        }
      } catch (error) {
        console.error('Auth init error:', error);
        dispatch(setAuthorizationStatus(false));
        setTimeout(() => router.replace('/(auth)/Login'), 1500);
      } finally {
        dispatch(setInitialized(true));
      }
    };

    // Animate dots in a looping pulse with stagger
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
          Animated.delay(700 - delay), // keep the cycle aligned
        ])
      );

    const dotAnimation = Animated.parallel([
      makeDotPulse(dot0, 0),
      makeDotPulse(dot1, 200),
      makeDotPulse(dot2, 400),
    ]);

    // Entrance sequence, then kick off auth + dot animations
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
      dotAnimation.start();
      setTimeout(() => {
        initializeAuth();
      }, 800);
    });

    return () => {
      dotAnimation.stop();
    };
  }, [dispatch, router]);

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
        {[dot0, dot1, dot2].map((dot, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              i === 1 && styles.dotWide,
              { opacity: dot },
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