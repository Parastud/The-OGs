import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Calendar } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT } from '../../../theme/styles.global';

interface SettlementSummaryCardProps {
    totalSettled: string; // e.g., "₹4,82,192.45"
    upcomingSettlement: string; // e.g., "₹5,200.00"
    nextSettlementDate: string; // e.g., "25 MAY"
}

export const SettlementSummaryCard: React.FC<SettlementSummaryCardProps> = ({
    totalSettled,
    upcomingSettlement,
    nextSettlementDate,
}) => {
    return (
        <View style={styles.card}>
            {/* Top Section */}
            <View>
                <Text style={styles.label}>TOTAL SETTLED</Text>
                <Text style={BOLD_TEXT(32, COLORS.white)}>{totalSettled}</Text>
            </View>

            <View style={styles.divider} />

            {/* Bottom Section */}
            <View style={styles.bottomRow}>
                <View>
                    <Text style={styles.label}>UPCOMING SETTLEMENT</Text>
                    <Text style={BOLD_TEXT(20, COLORS.white)}>{upcomingSettlement}</Text>
                </View>

                <View style={styles.dateBadge}>
                    <Calendar size={scale(12)} color={COLORS.white} strokeWidth={2.5} />
                    <Text style={BOLD_TEXT(10, COLORS.white)}>
                        {nextSettlementDate}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#3B82F6', // Brighter Blue
        borderRadius: scale(16),
        padding: scale(20),
        marginBottom: scale(20),
        // Add subtle gradient effect via background color or separate library if needed, 
        // but for now solid blue matching screenshot
    },
    label: {
        ...BOLD_TEXT(10, 'rgba(255,255,255,0.7)'),
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: scale(4),
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: scale(16),
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: scale(10),
        paddingVertical: scale(6),
        borderRadius: scale(8),
        gap: scale(6),
    },
});
