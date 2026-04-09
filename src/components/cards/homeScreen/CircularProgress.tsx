import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';

interface CircularProgressProps {
    value: number;
    maxValue: number;
    label: string;
    color: string;
    size?: number;
}

export const CircularProgress = ({
    value,
    maxValue,
    label,
    color,
    size = 44,
}: CircularProgressProps) => {
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / maxValue) * circumference;

    return (
        <View style={styles.container}>
            <View style={styles.svgContainer}>
                <Svg width={size} height={size}>
                    {/* Background circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={COLORS.grayLight}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={`${progress} ${circumference}`}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                        rotation="-90"
                        origin={`${size / 2}, ${size / 2}`}
                    />
                </Svg>
                <View style={styles.valueContainer}>
                    <Text style={BOLD_TEXT(12, COLORS.textPrimary)}>{value}</Text>
                </View>
            </View>
            <Text style={REGULAR_TEXT(8, COLORS.textSecondary)}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: scale(4),
    },
    svgContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

