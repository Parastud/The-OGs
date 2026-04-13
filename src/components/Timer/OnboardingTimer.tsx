/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store';
import { clearAuthToken } from '../../redux/slices/onboarding.slice';
import { COLORS } from '../../theme/colors';

const TOTAL_SECONDS = 8 * 60; // 480s
const WARNING_THRESHOLD_SECONDS = 60;

function getSecondsRemaining(expiryTimestamp: number | null): number {
  if (!expiryTimestamp) return 0;
  return Math.max(0, Math.floor((expiryTimestamp - Date.now()) / 1000));
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function OnboardingTimer() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const { token, token_validity } = useSelector(
    (state: RootState) => state.onboarding,
  );

  const [secondsLeft, setSecondsLeft] = useState(getSecondsRemaining(token_validity));

  // Animated width: 1 = full, 0 = empty
  const progressAnim = useRef(new Animated.Value(secondsLeft / TOTAL_SECONDS)).current;
  // Color interpolation
  const colorAnim = useRef(new Animated.Value(0)).current; // 0 = normal, 1 = warning

  // ── Countdown ───────────────────────────────────────────────────
  useEffect(() => {
    if (!token || !token_validity) return;
    setSecondsLeft(getSecondsRemaining(token_validity));

    const interval = setInterval(() => {
      const remaining = getSecondsRemaining(token_validity);
      setSecondsLeft(remaining);

      // Smoothly animate bar width
      Animated.timing(progressAnim, {
        toValue: remaining / TOTAL_SECONDS,
        duration: 800,
        useNativeDriver: false, // width can't use native driver
      }).start();

      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [token, token_validity]);

  // ── Shift color to red on warning ──────────────────────────────
  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: secondsLeft <= WARNING_THRESHOLD_SECONDS ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [secondsLeft <= WARNING_THRESHOLD_SECONDS]);

  // ── Auto-reset on expiry ────────────────────────────────────────
  useEffect(() => {
    if (secondsLeft === 0 && token) {
      dispatch(clearAuthToken());
      navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
    }
  }, [secondsLeft]);

  if (!token || !token_validity) return null;

  const isWarning = secondsLeft <= WARNING_THRESHOLD_SECONDS;

  const barColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.primary, '#ef4444'],
  });

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.wrapper}>
      {/* Track */}
      <View style={styles.track}>
        {/* Fill */}
        <Animated.View
          style={[styles.fill, { width: barWidth, backgroundColor: barColor }]}
        />
        {/* Glowing tip */}
        <Animated.View
          style={[styles.tip, { backgroundColor: barColor }]}
        />
      </View>

      {/* Tiny label that appears only on warning */}
      {isWarning && (
        <View style={styles.warningLabel}>
          <Text style={styles.warningText}>{formatTime(secondsLeft)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 20,
  },
  track: {
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  fill: {
    height: 3,
    borderRadius: 2,
  },
  tip: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: -3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  warningLabel: {
    position: 'absolute',
    top: 6,
    right: 12,
    backgroundColor: '#FFF1F1',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  warningText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ef4444',
    letterSpacing: 0.8,
    fontVariant: ['tabular-nums'],
  },
});