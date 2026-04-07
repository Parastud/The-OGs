import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  ChevronRight,
  Zap,
  Droplets,
  Flame,
  Building2,
  Wifi,
  WifiOff,
  Link,
  User,
  Home,
  Wrench,
  ArrowRight,
} from 'lucide-react-native';
import { COLORS } from '../../../theme/colors';
import { REGULAR_TEXT, BOLD_TEXT } from '../../../theme/styles.global';

export type RoomStatus = 'OCCUPIED' | 'EMPTY' | 'VACANT';

export interface Tenant {
  tenant_id: string;
  tenant_name: string;
  tenant_occupancy_id: string;
  tenant_phone_number: string;
  avatar?: string; // URL to avatar image (optional for now)
}

export interface RoomDetail {
  id: string;
  roomName: string; // "Room 101 • 1BHK"
  tenants?: Tenant[]; // Array of tenants
  status: RoomStatus;
  hasCam?: boolean;
  // Payment Info
  rentPaid?: string;
  maintPaid?: string;
  rentPending?: string;
  maintDue?: string;
  baseRent?: string;
  // Usage Stats
  powerUsage?: string;
  waterUsage?: string;
  gasUsage?: string;
  dgUsage?: string;
  // Device Stats
  attachedDevices?: number;
  onlineDevices?: number;
  offlineDevices?: number;
  // Balance Info
  latestRefill?: string;
  latestRefillDate?: string;
  gridBal?: string;
  gridBalDate?: string;
  camBal?: string;
  camBalDate?: string;
}

export interface RoomCardDetailsProps {
  roomDetail: RoomDetail;
  onPress?: () => void;
  onAssignTenant?: () => void;
  onConsumptionLogPress?: () => void;
}

const MAX_VISIBLE_AVATARS = 2;

export const RoomCardDetails: React.FC<RoomCardDetailsProps> = props => {
  const { onPress, onAssignTenant, onConsumptionLogPress } = props;

  const tenants = props.roomDetail.tenants || [];
  const tenantCount = tenants.length;
  const remainingCount = tenantCount - MAX_VISIBLE_AVATARS;

  const isVacant =
    props.roomDetail.status === 'VACANT' || props.roomDetail.status === 'EMPTY';
  const hasRentPending = !!props.roomDetail.rentPending;

  // Generate display name from tenants
  const getDisplayName = () => {
    if (tenantCount === 0) return 'No Tenant';
    if (tenantCount === 1) return tenants[0].tenant_name;
    const names = tenants.slice(0, 2).map(t => t.tenant_name.split(' ')[0]);
    return names.join(', ') + (tenantCount > 2 ? '...' : '');
  };

  const getStatusBadge = () => {
    const bgColor = isVacant ? '#FEE2E2' : '#D1FAE5';
    const textColor = isVacant ? '#EF4444' : '#10B981';
    const label = isVacant ? 'VACANT' : 'OCCUPIED';

    return (
      <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
        <Text style={{ ...BOLD_TEXT(8, textColor) }}>{label}</Text>
      </View>
    );
  };

  const renderAvatars = () => {
    if (tenantCount === 0) {
      // Show home icon for vacant rooms
      return (
        <View style={styles.avatarsContainer}>
          <View style={[styles.avatar, styles.avatarVacant]}>
            <Home size={18} color={COLORS.primary} />
          </View>
        </View>
      );
    }

    const visibleTenants = tenants.slice(0, MAX_VISIBLE_AVATARS);

    return (
      <View style={styles.avatarsContainer}>
        {visibleTenants.map((tenant, index) => (
          <View
            key={tenant.tenant_id}
            style={[
              styles.avatar,
              styles.avatarTenant,
              { marginLeft: index > 0 ? -12 : 0, zIndex: 10 - index },
            ]}
          >
            <User size={16} color={COLORS.textSecondary} />
          </View>
        ))}
        {remainingCount > 0 && (
          <View style={[styles.avatar, styles.avatarMore, { marginLeft: -12 }]}>
            <Text style={BOLD_TEXT(10, COLORS.white)}>+{remainingCount}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderUsageItem = (
    icon: React.ReactNode,
    label: string,
    value: string,
    color: string,
  ) => (
    <View style={styles.usageItem}>
      {icon}
      <Text style={{ ...BOLD_TEXT(9, color), marginTop: 2 }}>{label}</Text>
      <Text style={REGULAR_TEXT(11, COLORS.textPrimary)}>{value}</Text>
    </View>
  );

  const renderDeviceStat = (
    icon: React.ReactNode,
    label: string,
    count: number,
    color: string,
  ) => (
    <View style={styles.deviceStat}>
      <View style={styles.deviceStatRow}>
        {icon}
        <Text style={{ ...BOLD_TEXT(9, color) }}>{label}</Text>
      </View>
      <View>
        <Text style={BOLD_TEXT(12, COLORS.textPrimary)}>
          {count.toString().padStart(2, '0')}{' '}
          <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>DEVICES</Text>
        </Text>
      </View>
    </View>
  );

  const renderBalanceItem = (
    label: string,
    value: string,
    date: string,
    valueColor: string,
  ) => (
    <View style={styles.balanceItem}>
      <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>{label}</Text>
      <Text style={BOLD_TEXT(12, valueColor)}>{value}</Text>
      <Text style={REGULAR_TEXT(8, COLORS.textDisabled)}>{date}</Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          {renderAvatars()}
          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text
                style={BOLD_TEXT(
                  14,
                  isVacant ? COLORS.gray : COLORS.textPrimary,
                )}
                numberOfLines={1}
              >
                {getDisplayName()}
              </Text>
              {getStatusBadge()}
            </View>
            <View style={styles.roomInfoRow}>
              <Text
                style={REGULAR_TEXT(
                  10,
                  isVacant ? COLORS.gray : COLORS.textSecondary,
                )}
              >
                {props.roomDetail.roomName}
              </Text>
              {props.roomDetail.hasCam && (
                <View style={styles.camBadge}>
                  <Text style={BOLD_TEXT(8, COLORS.white)}>CAM</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {isVacant && props.roomDetail.baseRent && (
          <View style={styles.headerRight}>
            <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>BASE RENT</Text>
            <Text
              style={BOLD_TEXT(16, isVacant ? COLORS.gray : COLORS.textPrimary)}
            >
              {props.roomDetail.baseRent}
            </Text>
          </View>
        )}
        <ChevronRight size={20} color={COLORS.textSecondary} />
      </View>

      {/* Payment Row - Only for Occupied */}
      {!isVacant && (
        <View style={styles.paymentRow}>
          <View style={styles.paymentItem}>
            <View
              style={[
                styles.paymentIcon,
                { backgroundColor: hasRentPending ? '#FEE2E2' : '#D1FAE5' },
              ]}
            >
              <Home size={12} color={hasRentPending ? '#EF4444' : '#10B981'} />
              <Text
                style={BOLD_TEXT(8, hasRentPending ? '#EF4444' : '#10B981')}
              >
                {hasRentPending ? 'RENT PENDING' : 'RENT PAID'}
              </Text>
            </View>
            <Text style={BOLD_TEXT(14, hasRentPending ? '#EF4444' : '#10B981')}>
              {props.roomDetail.rentPending || props.roomDetail.rentPaid}
            </Text>
          </View>
          <View style={styles.paymentItem}>
            <View
              style={[
                styles.paymentIcon,
                {
                  backgroundColor: props.roomDetail.maintDue
                    ? '#FEE2E2'
                    : '#D1FAE5',
                },
              ]}
            >
              <Wrench
                size={12}
                color={props.roomDetail.maintDue ? '#EF4444' : '#10B981'}
              />
              <Text
                style={BOLD_TEXT(
                  8,
                  props.roomDetail.maintDue ? '#EF4444' : '#10B981',
                )}
              >
                {props.roomDetail.maintDue ? 'MAINT. DUE' : 'MAINT. PAID'}
              </Text>
            </View>
            <Text
              style={BOLD_TEXT(
                14,
                props.roomDetail.maintDue ? '#EF4444' : '#10B981',
              )}
            >
              {props.roomDetail.maintDue || props.roomDetail.maintPaid}
            </Text>
          </View>
        </View>
      )}

      {/* Usage Stats */}
      {!isVacant && (
        <TouchableOpacity
          style={styles.usageRow}
          activeOpacity={0.7}
          onPress={onConsumptionLogPress}
          disabled={!onConsumptionLogPress}
        >
          {renderUsageItem(
            <Zap size={14} color="#3B82F6" />,
            'GRID',
            props.roomDetail.powerUsage || '--',
            '#3B82F6',
          )}
          {renderUsageItem(
            <Building2 size={14} color="#8B5CF6" />,
            'DG',
            props.roomDetail.dgUsage || '--',
            '#8B5CF6',
          )}
          {renderUsageItem(
            <Droplets size={14} color="#06B6D4" />,
            'WATER',
            props.roomDetail.waterUsage || '--',
            '#06B6D4',
          )}
          {renderUsageItem(
            <Flame size={14} color="#F97316" />,
            'GAS',
            props.roomDetail.gasUsage || '--',
            '#F97316',
          )}
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={onConsumptionLogPress}
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: 6,
          flexDirection: 'row',
          gap: 4,
          // backgroundColor: '#f1f3fb',
          // alignSelf: 'flex-end',
          // paddingHorizontal: 10,
          // borderRadius: 20,
          // marginBottom: 8,
        }}
        hitSlop={10}
      >
        <Text style={REGULAR_TEXT(11, COLORS.primary)}>
          View Room Consumption
        </Text>
        <ArrowRight size={16} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Device Stats */}
      <View style={styles.deviceRow}>
        {renderDeviceStat(
          <Link size={12} color="#3B82F6" />,
          'ATTACHED',
          props.roomDetail.attachedDevices || 0,
          '#3B82F6',
        )}
        {renderDeviceStat(
          <Wifi size={12} color="#10B981" />,
          'ONLINE',
          props.roomDetail.onlineDevices || 0,
          '#10B981',
        )}
        {renderDeviceStat(
          <WifiOff size={12} color="#EF4444" />,
          'OFFLINE',
          props.roomDetail.offlineDevices || 0,
          '#EF4444',
        )}
      </View>

      {/* Balance Row - Only for Occupied */}
      {!isVacant && (
        <View style={styles.balanceRow}>
          {renderBalanceItem(
            'LATEST REFILL',
            props.roomDetail.latestRefill || '--',
            props.roomDetail.latestRefillDate || '--',
            COLORS.textPrimary,
          )}
          {renderBalanceItem(
            'GRID BAL (ROOM)',
            props.roomDetail.gridBal || '--',
            props.roomDetail.gridBalDate || '--',
            '#10B981',
          )}
          {renderBalanceItem(
            'CAM BAL (ROOM)',
            props.roomDetail.camBal || '--',
            props.roomDetail.camBalDate || '--',
            COLORS.primary,
          )}
        </View>
      )}

      {/* Assign Tenant Button - Only for Vacant */}
      {isVacant && onAssignTenant && (
        <TouchableOpacity
          style={styles.assignButton}
          onPress={onAssignTenant}
          activeOpacity={0.7}
        >
          <Text style={styles.assignButtonText}>ASSIGN TENANT</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  avatarPlaceholder: {
    backgroundColor: COLORS.primary,
  },
  avatarVacant: {
    backgroundColor: '#E8F4FD',
    borderColor: '#E8F4FD',
  },
  avatarTenant: {
    backgroundColor: '#E5E7EB',
  },
  avatarMore: {
    backgroundColor: COLORS.primary,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  roomInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  camBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  headerRight: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  paymentItem: {
    alignItems: 'flex-start',
  },
  paymentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  usageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  usageItem: {
    alignItems: 'center',
    flex: 1,
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  deviceStat: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  deviceStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  assignButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#c6d8fc3a',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
    width: '70%',
    alignSelf: 'center',
    boxShadow: '0px 2px 4px rgba(15, 37, 240, 0.1)',
  },
  assignButtonText: {
    ...BOLD_TEXT(11, COLORS.primary),
  },
});
