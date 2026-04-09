import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';

interface BHKBreakdownCardProps {
    title?: string;
    units?: number;
    occupied?: number;
    vacant?: number;
    total?: number;
}

export const BHKBreakdownCard = ({
    title = '1 BHK',
    units,
    occupied = 10,
    vacant = 2,
    total = 12,
}: BHKBreakdownCardProps) => {
    const occupiedPercent = ((occupied) / total) * 100;
    const vacantPercent = ((vacant) / total) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    {/* <Text style={BOLD_TEXT(12, COLORS.textPrimary)}>{title}</Text> */}
                    <Text style={REGULAR_TEXT(11, COLORS.textSecondary)}>{title} Breakdown</Text>
                </View>
                <View style={styles.unitsBadge}>
                    <Text style={BOLD_TEXT(9, COLORS.blueAccent)}>{units} UNITS</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.labelRow}>
                    <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
                    <Text style={REGULAR_TEXT(10, COLORS.textPrimary)}>Occupied</Text>
                </View>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: COLORS.success, width: `${occupiedPercent}%` }]} />
                </View>
                <Text style={BOLD_TEXT(11, COLORS.textPrimary)}>{String(occupied).padStart(2, '0')}</Text>
            </View>

            <View style={[styles.row, { marginBottom: 0 }]}>
                <View style={styles.labelRow}>
                    <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
                    <Text style={REGULAR_TEXT(10, COLORS.textPrimary)}>Vacant</Text>
                </View>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: COLORS.primary, width: `${vacantPercent}%` }]} />
                </View>
                <Text style={BOLD_TEXT(11, COLORS.textPrimary)}>{String(vacant).padStart(2, '0')}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.grayLight,
        borderRadius: scale(10),
        padding: scale(12),
        marginTop: scale(10),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(10),
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    unitsBadge: {
        backgroundColor: COLORS.blueLight,
        paddingHorizontal: scale(8),
        paddingVertical: scale(3),
        borderRadius: scale(8),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scale(8),
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: scale(70),
        gap: scale(5),
    },
    dot: {
        width: scale(6),
        height: scale(6),
        borderRadius: scale(3),
    },
    progressContainer: {
        flex: 1,
        height: scale(6),
        backgroundColor: COLORS.divider,
        borderRadius: scale(3),
        marginHorizontal: scale(8),
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: scale(3),
    },
});

