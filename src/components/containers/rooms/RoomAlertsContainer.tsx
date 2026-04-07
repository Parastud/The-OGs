import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AlertCircle, Bell } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import {
    REGULAR_TEXT,
    BOLD_TEXT,
} from '../../../theme/styles.global';

export interface AlertItem {
    id: string;
    title: string;
    description: string;
    type: 'critical' | 'alert' | 'warning';
}

interface RoomAlertsContainerProps {
    alerts: AlertItem[];
    onAlertPress?: (alertId: string) => void;
}

export const RoomAlertsContainer = (props: RoomAlertsContainerProps) => {
    const { alerts } = props;

    const activeCount = alerts.length;

    const getAlertColors = (type: AlertItem['type']) => {
        switch (type) {
            case 'critical':
                return { bg: '#FEE2E2', icon: '#EF4444', badge: '#EF4444' };
            case 'alert':
                return { bg: '#FEF3C7', icon: '#F59E0B', badge: '#F59E0B' };
            case 'warning':
                return { bg: '#FEF9C3', icon: '#EAB308', badge: '#EAB308' };
            default:
                return { bg: '#FEE2E2', icon: '#EF4444', badge: '#EF4444' };
        }
    };

    const getBadgeText = (type: AlertItem['type']) => {
        switch (type) {
            case 'critical':
                return 'CRITICAL';
            case 'alert':
                return 'ALERT';
            case 'warning':
                return 'WARNING';
            default:
                return 'ALERT';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Bell size={16} color={COLORS.primary} />
                    <Text style={BOLD_TEXT(11, COLORS.textSecondary)}>
                        OPERATIONAL ALERTS
                    </Text>
                </View>
                <View style={styles.countBadge}>
                    <Text style={BOLD_TEXT(9, COLORS.white)}>
                        {String(activeCount).padStart(2, '0')} ACTIVE
                    </Text>
                </View>
            </View>

            {alerts.map(alert => {
                const colors = getAlertColors(alert.type);
                return (
                    <View key={alert.id} style={styles.alertItem}>
                        <View style={[styles.alertIcon, { backgroundColor: colors.bg }]}>
                            <AlertCircle size={16} color={colors.icon} />
                        </View>
                        <View style={styles.alertInfo}>
                            <Text style={BOLD_TEXT(11, COLORS.textPrimary)}>
                                {alert.title}
                            </Text>
                            <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>
                                {alert.description}
                            </Text>
                        </View>
                        <View style={[styles.alertBadge, { backgroundColor: colors.badge }]}>
                            <Text style={BOLD_TEXT(8, COLORS.white)}>
                                {getBadgeText(alert.type)}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 14,
        padding: 14,
        marginHorizontal: 16,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    countBadge: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    alertItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    alertIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertInfo: {
        flex: 1,
        gap: 2,
    },
    alertBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
});
