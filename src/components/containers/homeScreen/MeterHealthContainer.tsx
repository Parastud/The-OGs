import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Zap, Droplets, LucideIcon } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import { BOLD_TEXT, REGULAR_TEXT } from '../../../theme/styles.global';
import { DashboardDataTypes } from '../../../types/dashboard.types';
import { SkeletonLoader } from '../../skeleton/SkeletonLoader';

interface MeterCardProps {
    icon: LucideIcon;
    iconColor: string;
    label: string;
    onlinePercent: string;
    online: number;
    offline: number;
    total: number;
    progressColor: string;
}

const MeterCard = ({
    icon: Icon,
    iconColor,
    label,
    onlinePercent,
    online,
    offline,
    total,
    progressColor,
}: MeterCardProps) => {
    const progressWidth = total > 0 ? (online / total) * 100 : 0;

    return (
        <View style={styles.meterCard}>
            <View style={styles.meterHeader}>
                <View style={styles.meterLabelRow}>
                    <Icon size={scale(16)} strokeWidth={2} color={iconColor} />
                    <Text style={BOLD_TEXT(12, COLORS.textPrimary)}>{label}</Text>
                </View>
                <Text style={BOLD_TEXT(11, COLORS.success)}>{onlinePercent}</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statColumn}>
                    <View style={styles.statHeader}>
                        <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>ONLINE</Text>
                        <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
                            {String(online).padStart(2, '0')}
                        </Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                { backgroundColor: progressColor, width: `${progressWidth}%` },
                            ]}
                        />
                    </View>
                </View>
                <View style={styles.statColumn}>
                    <View style={styles.statHeader}>
                        <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>OFFLINE</Text>
                        <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
                            {String(offline).padStart(2, '0')}
                        </Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { backgroundColor: COLORS.grayLight, width: '0%' }]} />
                    </View>
                </View>
            </View>
        </View>
    );
};

interface MeterHealthContainerProps {
    isLoading: boolean;
    dashboardSummaryData: DashboardDataTypes;
}

export const MeterHealthContainer = ({
    isLoading,
    dashboardSummaryData,
}: MeterHealthContainerProps) => {
    const {
        elm_online_devices,
        elm_offline_devices,
        wtm_p_online_devices,
        wtm_p_offline_devices
    } = dashboardSummaryData

    const electricityTotal = (elm_online_devices ?? 0) + (elm_offline_devices ?? 0);
    const waterTotal = (wtm_p_online_devices ?? 0) + (wtm_p_offline_devices ?? 0);

    const electricityPercent =
        electricityTotal > 0 ? Math.round(((elm_online_devices ?? 0) / electricityTotal) * 100) : 0;
    const waterPercent =
        waterTotal > 0 ? Math.round(((wtm_p_online_devices ?? 0) / waterTotal) * 100) : 0;

    if (isLoading) {
        return (
            <View style={styles.container}>
                <SkeletonLoader cols={1} rows={1} itemHeight={14} itemBorderRadius={4} />
                <SkeletonLoader
                    cols={1}
                    rows={2}
                    itemHeight={70}
                    gap={10}
                    containerStyle={{ marginTop: scale(12) }}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={BOLD_TEXT(13, COLORS.textPrimary)}>METER HEALTH</Text>

            <MeterCard
                icon={Zap}
                iconColor={COLORS.warning}
                label="ELECTRICITY"
                onlinePercent={`${electricityPercent}% ONLINE`}
                online={elm_online_devices ?? 0}
                offline={elm_offline_devices ?? 0}
                total={electricityTotal}
                progressColor={COLORS.blueAccent}
            />

            <MeterCard
                icon={Droplets}
                iconColor={COLORS.blueAccent}
                label="WATER"
                onlinePercent={`${waterPercent}% ONLINE`}
                online={wtm_p_online_devices ?? 0}
                offline={wtm_p_offline_devices ?? 0}
                total={waterTotal}
                progressColor={COLORS.info}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: scale(12),
        padding: scale(14),
        marginBottom: scale(12),
    },
    meterCard: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
        paddingVertical: scale(12),
    },
    meterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(10),
    },
    meterLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
    },
    statsRow: { flexDirection: 'row' },
    statColumn: { flex: 1 },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(6),
        paddingRight: scale(16),
    },
    progressContainer: {
        height: scale(5),
        backgroundColor: COLORS.divider,
        borderRadius: scale(2.5),
        overflow: 'hidden',
        marginRight: scale(16),
    },
    progressBar: {
        height: '100%',
        borderRadius: scale(2.5),
    },
});