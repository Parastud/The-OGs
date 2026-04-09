import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../theme/colors';

export const SummaryCardLargeSkeleton = () => {
  return (
    <View style={styles.containerLarge}>
      <View style={styles.topRow}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.iconSkeleton}
          shimmerColors={[COLORS.grayLight, COLORS.white, COLORS.grayLight]}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.chartIconSkeleton}
          shimmerColors={[COLORS.grayLight, COLORS.white, COLORS.grayLight]}
        />
      </View>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.labelSkeleton}
        shimmerColors={[COLORS.grayLight, COLORS.white, COLORS.grayLight]}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.valueSkeleton}
        shimmerColors={[COLORS.grayLight, COLORS.white, COLORS.grayLight]}
      />
    </View>
  );
};

export const SummaryCardSmallSkeleton = () => {
  return (
    <View style={styles.containerSmall}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.iconSkeletonSmall}
        shimmerColors={[COLORS.grayLight, COLORS.white, COLORS.grayLight]}
      />
      <View style={styles.textContainerSmall}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.labelSkeletonSmall}
          shimmerColors={[COLORS.grayLight, COLORS.white, COLORS.grayLight]}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.valueSkeletonSmall}
          shimmerColors={[COLORS.grayLight, COLORS.white, COLORS.grayLight]}
        />
      </View>
    </View>
  );
};

export const SummaryCardsSkeleton = () => {
  return (
    <>
      <View style={styles.grid}>
        <SummaryCardLargeSkeleton />
        <SummaryCardLargeSkeleton />
        <SummaryCardLargeSkeleton />
        <SummaryCardLargeSkeleton />
      </View>
      <View style={styles.grid}>
        <SummaryCardSmallSkeleton />
        <SummaryCardSmallSkeleton />
        <SummaryCardSmallSkeleton />
        <SummaryCardSmallSkeleton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
    marginBottom: scale(12),
  },
  containerLarge: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(12),
    gap: scale(4),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(4),
  },
  iconSkeleton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(10),
  },
  chartIconSkeleton: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(4),
  },
  labelSkeleton: {
    width: scale(70),
    height: scale(10),
    borderRadius: scale(4),
  },
  valueSkeleton: {
    width: scale(90),
    height: scale(18),
    borderRadius: scale(4),
  },
  containerSmall: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  iconSkeletonSmall: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(7),
  },
  textContainerSmall: {
    flex: 1,
    gap: scale(4),
  },
  labelSkeletonSmall: {
    width: scale(50),
    height: scale(8),
    borderRadius: scale(3),
  },
  valueSkeletonSmall: {
    width: scale(60),
    height: scale(12),
    borderRadius: scale(3),
  },
});
