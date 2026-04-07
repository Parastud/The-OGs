import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Wifi, WifiOff, ChevronRight, Cpu } from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import {
    REGULAR_TEXT,
    BOLD_TEXT,
} from '../../../theme/styles.global';

export interface DeviceItem {
    id: string;
    name: string;
    model: string;
    isOnline: boolean;
}

interface RoomDevicesContainerProps {
    devices: DeviceItem[];
    onDevicePress?: (deviceId: string) => void;
}

export const RoomConnectedDevicesContainer = (props: RoomDevicesContainerProps) => {
    const { devices, onDevicePress } = props;

    const onlineCount = devices.filter(d => d.isOnline).length;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Cpu size={16} color={COLORS.primary} />
                    <Text style={BOLD_TEXT(11, COLORS.textSecondary)}>
                        CONNECTED DEVICES
                    </Text>
                </View>
                <Text style={BOLD_TEXT(10, '#10B981')}>
                    {String(onlineCount).padStart(2, '0')} ONLINE
                </Text>
            </View>

            {devices.map(device => (
                <TouchableOpacity
                    key={device.id}
                    style={styles.deviceItem}
                    onPress={() => onDevicePress?.(device.id)}
                    activeOpacity={0.7}
                >
                    <View
                        style={[
                            styles.deviceIcon,
                            {
                                backgroundColor: device.isOnline ? '#D1FAE5' : '#FEE2E2',
                            },
                        ]}
                    >
                        {device.isOnline ? (
                            <Wifi size={18} color="#10B981" />
                        ) : (
                            <WifiOff size={18} color="#EF4444" />
                        )}
                    </View>
                    <View style={styles.deviceInfo}>
                        <Text style={BOLD_TEXT(12, COLORS.textPrimary)}>{device.name}</Text>
                        <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>
                            {device.model}
                        </Text>
                    </View>
                    <ChevronRight size={18} color={COLORS.textSecondary} />
                </TouchableOpacity>
            ))}
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
    deviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    deviceIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deviceInfo: {
        flex: 1,
        gap: 2,
    },
});
