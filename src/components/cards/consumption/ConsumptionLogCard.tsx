import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';

import { COLORS } from '../../../theme/colors';
import {
    BOLD_TEXT,
    REGULAR_TEXT,
    SEMI_BOLD_TEXT,
} from '../../../theme/styles.global';
import HourlyTrendChart from './HourlyTrendChart';

export interface DailyConsumptionLog {
    id: string;
    date: string;
    day: string;
    consumption: number;
    billed: number;
    hourlyData: number[];
}

interface ConsumptionLogCardProps {
    item: DailyConsumptionLog;
    isExpanded: boolean;
    onPress: () => void;
}

const ConsumptionLogCard: React.FC<ConsumptionLogCardProps> = ({
    item,
    isExpanded,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.card, isExpanded && styles.cardExpanded]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            {/* Card row: date | consumption | billed */}
            <View style={styles.cardRow}>
                <View style={styles.dateCol}>
                    <Text style={BOLD_TEXT(13, COLORS.textPrimary)}>{item.date}</Text>
                    <Text style={REGULAR_TEXT(8, COLORS.textDisabled)}>{item.day}</Text>
                </View>

                <View style={styles.consumptionCol}>
                    <Text style={BOLD_TEXT(13, COLORS.textPrimary)}>
                        {item.consumption.toFixed(1)}{' '}
                        <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>Units</Text>
                    </Text>
                    <Text style={SEMI_BOLD_TEXT(8, COLORS.primary)}>CONSUMPTION</Text>
                </View>

                <View style={styles.billedCol}>
                    <Text style={BOLD_TEXT(13, COLORS.textPrimary)}>
                        ₹{item.billed.toFixed(2)}
                    </Text>
                    <Text style={SEMI_BOLD_TEXT(8, COLORS.primary)}>BILLED</Text>
                </View>
            </View>

            {/* Expanded chart */}
            {isExpanded && <HourlyTrendChart hourlyData={item.hourlyData} />}
        </TouchableOpacity>
    );
};

export default ConsumptionLogCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: scale(12),
        padding: scale(14),
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardExpanded: {
        borderColor: COLORS.primary,
        borderWidth: 1.5,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    dateCol: {
        flex: 1,
        gap: scale(2),
    },
    consumptionCol: {
        flex: 1,
        alignItems: 'center',
        gap: scale(2),
    },
    billedCol: {
        flex: 1,
        alignItems: 'flex-end',
        gap: scale(2),
    },
});
