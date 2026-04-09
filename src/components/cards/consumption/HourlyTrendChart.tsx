import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

import { COLORS } from '../../../theme/colors';
import { SEMI_BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HourlyTrendChartProps {
    hourlyData: number[];
}

const HourlyTrendChart: React.FC<HourlyTrendChartProps> = ({ hourlyData }) => {
    const maxVal = Math.max(...hourlyData, 1);
    const chartW = SCREEN_WIDTH - scale(100);
    const chartH = scale(90);
    const stepX = chartW / (hourlyData.length - 1);

    const points = hourlyData.map((v, i) => ({
        x: i * stepX,
        y: chartH - (v / maxVal) * chartH,
    }));

    const yLabels = [
        maxVal,
        Math.round(maxVal * 0.66),
        Math.round(maxVal * 0.33),
        0,
    ];
    const xLabels = ['12 AM', '6 AM', '12 PM', '6 PM', '11 PM'];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={SEMI_BOLD_TEXT(8, COLORS.textSecondary)}>
                    HOURLY CONSUMPTION TREND
                </Text>
                <Text style={REGULAR_TEXT(8, COLORS.textDisabled)}>00:00 - 23:59</Text>
            </View>

            {/* Y-axis + Chart */}
            <View style={styles.chartArea}>
                <View style={styles.yAxis}>
                    {yLabels.map((v, i) => (
                        <Text key={i} style={REGULAR_TEXT(7, COLORS.textDisabled)}>
                            {v}
                        </Text>
                    ))}
                </View>

                <View style={[styles.chartGraph, { height: chartH }]}>
                    {/* Grid lines */}
                    {[0, 1, 2, 3].map(i => (
                        <View
                            key={`grid-${i}`}
                            style={[styles.gridLine, { top: (i / 3) * chartH }]}
                        />
                    ))}

                    {/* Data points */}
                    {points.map((pt, i) => (
                        <View
                            key={`dot-${i}`}
                            style={[
                                styles.dataPoint,
                                { left: pt.x - scale(2), top: pt.y - scale(2) },
                            ]}
                        />
                    ))}

                    {/* Connecting lines */}
                    {points.map((pt, i) => {
                        if (i === 0) return null;
                        const prev = points[i - 1];
                        const dx = pt.x - prev.x;
                        const dy = pt.y - prev.y;
                        const length = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                        return (
                            <View
                                key={`line-${i}`}
                                style={[
                                    styles.lineSegment,
                                    {
                                        left: prev.x,
                                        top: prev.y,
                                        width: length,
                                        transform: [{ rotate: `${angle}deg` }],
                                    },
                                ]}
                            />
                        );
                    })}
                </View>
            </View>

            {/* X-axis */}
            <View style={styles.xAxis}>
                {xLabels.map((label, i) => (
                    <Text key={i} style={REGULAR_TEXT(7, COLORS.textDisabled)}>
                        {label}
                    </Text>
                ))}
            </View>
        </View>
    );
};

export default HourlyTrendChart;

const styles = StyleSheet.create({
    container: {
        marginTop: scale(14),
        paddingTop: scale(10),
        borderTopWidth: 1,
        borderTopColor: COLORS.divider,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(8),
    },
    chartArea: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    yAxis: {
        width: scale(20),
        justifyContent: 'space-between',
        paddingRight: scale(4),
    },
    chartGraph: {
        flex: 1,
        position: 'relative',
    },
    gridLine: {
        position: 'absolute',
        width: '100%',
        height: 1,
        backgroundColor: COLORS.divider,
    },
    dataPoint: {
        position: 'absolute',
        width: scale(4),
        height: scale(4),
        borderRadius: scale(2),
        backgroundColor: COLORS.primary,
    },
    lineSegment: {
        position: 'absolute',
        height: 1.5,
        backgroundColor: COLORS.primary,
        transformOrigin: 'left center',
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scale(4),
        paddingLeft: scale(20),
    },
});
