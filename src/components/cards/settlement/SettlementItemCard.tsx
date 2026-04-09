import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';

export interface SettlementItem {
    id: string;
    title: string; // "SETTLEMENT #8421"
    date: string; // "24 OCT, 2023 • 14:20"
    amount: string; // "₹4,250.00"
    status: 'SETTLED' | 'PENDING' | 'FAILED';
}

interface SettlementItemCardProps {
    item: SettlementItem;
}

export const SettlementItemCard: React.FC<SettlementItemCardProps> = ({
    item,
}) => {
    return (
        <View style={styles.container}>
            {/* Left Side */}
            <View style={styles.leftColumn}>
                <Text style={BOLD_TEXT(12, COLORS.textPrimary)}>{item.title}</Text>
                <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>{item.date}</Text>
            </View>

            {/* Right Side */}
            <View style={styles.rightColumn}>
                <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>{item.amount}</Text>
                <View style={styles.statusBadge}>
                    <Text
                        style={{
                            ...BOLD_TEXT(9, '#10B981'), // Green-500
                            textTransform: 'uppercase',
                        }}
                    >
                        {item.status}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: scale(16),
        borderRadius: scale(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(12),
    },
    leftColumn: {
        gap: scale(4),
    },
    rightColumn: {
        alignItems: 'flex-end',
        gap: scale(4),
    },
    statusBadge: {
        backgroundColor: '#D1FAE5', // Green-100
        paddingHorizontal: scale(8),
        paddingVertical: scale(2),
        borderRadius: scale(4),
    },
});
