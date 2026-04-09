import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../theme/colors';
import {
  REGULAR_TEXT,
  BOLD_TEXT,
} from '../../../theme/styles.global';

export type RoomStatus = 'OCCUPIED' | 'EMPTY' | 'VACANT';

export interface RoomSimpleDetail {
  id: string;
  roomName: string; // "Room 101"
  sharingType: string; // "DOUBLE SHARING"
  occupiedCount: number;
  emptyCount: number;
  totalDues: string; // "₹2,500"
  status: RoomStatus;
}

export interface RoomCardSimpleProps {
  roomDetail: RoomSimpleDetail;
  onAddTenant?: () => void;
  onCheckout?: () => void;
  onRecharge?: () => void;
  onPress?: () => void;
}

export const RoomCardSimple: React.FC<RoomCardSimpleProps> = props => {
  const { onAddTenant, onCheckout, onRecharge, onPress } = props;

  const isVacant =
    props.roomDetail.status === 'VACANT' || props.roomDetail.status === 'EMPTY';
  const showAddTenant = props.roomDetail.emptyCount > 0;
  const showCheckout =
    props.roomDetail.occupiedCount > 0 && props.roomDetail.emptyCount === 0;

  const getStatusBadge = () => {
    const bgColor = isVacant ? '#FEE2E2' : '#D1FAE5';
    const textColor = isVacant ? '#EF4444' : '#10B981';
    const label = isVacant ? 'EMPTY' : 'OCCUPIED';

    return (
      <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
        <Text style={{ ...BOLD_TEXT(8, textColor) }}>{label}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={BOLD_TEXT(14, COLORS.textPrimary)}>
            {props.roomDetail.roomName}
          </Text>
          {getStatusBadge()}
        </View>
        <View style={styles.headerRight}>
          <Text style={REGULAR_TEXT(10, COLORS.textSecondary)}>TOTAL DUES</Text>
          <Text style={BOLD_TEXT(16, COLORS.primary)}>
            {props.roomDetail.totalDues}
          </Text>
        </View>
      </View>

      {/* Sharing Info */}
      <Text style={styles.sharingText}>{props.roomDetail.sharingType}</Text>
      <Text style={styles.occupancyText}>
        <Text style={{ color: COLORS.primary }}>
          {props.roomDetail.occupiedCount} OCCUPIED
        </Text>
        {' | '}
        <Text style={{ color: '#EF4444' }}>
          {props.roomDetail.emptyCount} EMPTY
        </Text>
      </Text>

      {/* Actions */}
      <View style={styles.actionsRow}>
        {showAddTenant && (
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={onAddTenant}
            activeOpacity={0.7}
          >
            <Text style={styles.outlineButtonText}>ADD TENANT</Text>
          </TouchableOpacity>
        )}
        {showCheckout && (
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={onCheckout}
            activeOpacity={0.7}
          >
            <Text style={styles.outlineButtonText}>CHECKOUT</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onRecharge}
          activeOpacity={0.7}
        >
          <Text style={styles.primaryButtonText}>RECHARGE</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sharingText: {
    ...REGULAR_TEXT(11, COLORS.textSecondary),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  occupancyText: {
    ...BOLD_TEXT(10, COLORS.textSecondary),
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  outlineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  outlineButtonText: {
    ...BOLD_TEXT(10, COLORS.textPrimary),
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...BOLD_TEXT(10, COLORS.white),
  },
});
