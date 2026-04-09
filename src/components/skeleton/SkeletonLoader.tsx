import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SkeletonItemConfig {
    height?: number;       // default: 60
    borderRadius?: number; // default: 8
    flex?: number;         // default: 1
    width?: string | number; // override width
}

interface SkeletonGridProps {
    cols?: number;              // number of columns per row
    rows?: number;              // number of rows
    gap?: number;               // gap between items
    rowGap?: number;            // vertical gap (overrides gap)
    colGap?: number;            // horizontal gap (overrides gap)
    itemHeight?: number;        // height of each skeleton item
    itemBorderRadius?: number;  // border radius of each item
    containerStyle?: ViewStyle; // outer container style
    itemConfigs?: SkeletonItemConfig[][]; // per-item custom config [row][col]
    animated?: boolean;         // shimmer animation (default: true)
}

// ─── Shimmer Hook ─────────────────────────────────────────────────────────────

const useShimmer = (enabled: boolean) => {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!enabled) return;
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmer, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ]),
        );
        loop.start();
        return () => loop.stop();
    }, [enabled]);

    const opacity = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 1],
    });

    return opacity;
};

// ─── Single Skeleton Box ──────────────────────────────────────────────────────

interface SkeletonBoxProps {
    height: number;
    borderRadius: number;
    flex?: number;
    width?: DimensionValue;  // ✅ was: string | number
    opacity: Animated.AnimatedInterpolation<number>;
}

interface SkeletonItemConfig {
    height?: number;
    borderRadius?: number;
    flex?: number;
    width?: DimensionValue;  // ✅ was: string | number
}

const SkeletonBox = ({ height, borderRadius, flex, width, opacity }: SkeletonBoxProps) => {
    const dynamicStyle: ViewStyle =
        width !== undefined
            ? { width, height: scale(height), borderRadius: scale(borderRadius) }
            : { flex: flex ?? 1, height: scale(height), borderRadius: scale(borderRadius) };

    return (
        <Animated.View style={[styles.box, dynamicStyle, { opacity }]} />
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const SkeletonLoader = ({
    cols = 1,
    rows = 1,
    gap = 10,
    rowGap,
    colGap,
    itemHeight = 60,
    itemBorderRadius = 8,
    containerStyle,
    itemConfigs,
    animated = true,
}: SkeletonGridProps) => {
    const opacity = useShimmer(animated);

    const vGap = rowGap ?? gap;
    const hGap = colGap ?? gap;

    return (
        <View style={[styles.container, containerStyle]}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <View
                    key={rowIndex}
                    style={[
                        styles.row,
                        {
                            gap: scale(hGap),
                            marginBottom: rowIndex < rows - 1 ? scale(vGap) : 0,
                        },
                    ]}
                >
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        const config = itemConfigs?.[rowIndex]?.[colIndex] ?? {};
                        return (
                            <SkeletonBox
                                key={colIndex}
                                height={config.height ?? itemHeight}
                                borderRadius={config.borderRadius ?? itemBorderRadius}
                                flex={config.width === undefined ? (config.flex ?? 1) : undefined}
                                width={config.width as DimensionValue | undefined}  // ✅ cast here
                                opacity={opacity}
                            />
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    box: {
        backgroundColor: '#d9dadf',
    },
});