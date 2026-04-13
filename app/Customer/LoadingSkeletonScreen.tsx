import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function LoadingSkeletonScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Skeleton width={80} height={20} />
          <Skeleton width={28} height={28} radius={14} />
        </View>

        {/* SEARCH BAR */}
        <Skeleton height={40} style={{ marginTop: 12 }} />

        {/* FEATURE CARD */}
        <View style={styles.card}>
          <Skeleton width="70%" height={16} />
          <Skeleton width="40%" height={14} style={{ marginTop: 6 }} />

          <Skeleton
            height={140}
            style={{ marginTop: 10, borderRadius: 12 }}
          />

          <View style={styles.row}>
            <Skeleton width="40%" height={14} />
            <Skeleton width="20%" height={14} />
          </View>
        </View>

        {/* LIST ITEMS */}
        {[1, 2, 3].map((_, i) => (
          <View key={i} style={styles.listItem}>
            <Skeleton width={44} height={44} radius={22} />
            <View style={{ flex: 1 }}>
              <Skeleton width="70%" height={14} />
              <Skeleton
                width="50%"
                height={12}
                style={{ marginTop: 6 }}
              />
            </View>
          </View>
        ))}

        {/* SMALL CARDS */}
        {[1, 2].map((_, i) => (
          <View key={i} style={styles.smallCard}>
            <Skeleton width="60%" height={14} />
            <Skeleton
              width="80%"
              height={12}
              style={{ marginTop: 6 }}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

//
// 🔷 REUSABLE SKELETON COMPONENT
//
const Skeleton = ({
  width = "100%",
  height = 20,
  radius = 8,
  style,
}: any) => {
  const translateX = useSharedValue(-200);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(300, { duration: 1200 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: "#E5E7EB",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={["transparent", "#ffffff80", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
    </View>
  );
};

//
// 🎨 STYLES
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },

  smallCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
});