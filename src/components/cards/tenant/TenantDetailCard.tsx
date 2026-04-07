import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  User,
  Home,
  Wrench,
  Droplets,
  Flame,
  Zap,
  Building2,
  FileText,
  Phone,
  Headphones,
  MessageSquare,
  Mail,
  BadgeCheck,
} from 'lucide-react-native';

import { COLORS } from '../../../theme/colors';
import { REGULAR_TEXT, BOLD_TEXT } from '../../../theme/styles.global';

export interface TenantCardData {
  tenant_id: string;
  tenant_occupancy_id:string;
  tenant_name: string;
  isPrimary?: boolean;
  bedNumber?: number;
  avatar?: string;
  rent?: string;
  rentPaid?: boolean;
  maint?: string;
  maintPaid?: boolean;
  water?: string;
  waterPaid?: boolean;
  gas?: string;
  gasPaid?: boolean;
  grid?: string;
  gridPaid?: boolean;
  cam?: string;
  camPaid?: boolean;
  checkInDate?: string;
}

interface TenantDetailCardProps {
  tenant: any;
  onAgreementPress?: () => void;
  onCheckoutPress?: () => void;
  onCallPress?: () => void;
  onSupportPress?: () => void;
  onMessagePress?: () => void;
  onEmailPress?: () => void;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isPaid?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, isPaid }) => (
  <View style={styles.statItem}>
    {isPaid !== undefined && (
      <View
        style={[
          styles.paidBadge,
          { backgroundColor: isPaid ? '#D1FAE5' : '#FEE2E2' },
        ]}
      >
        <Text style={BOLD_TEXT(6, isPaid ? '#10B981' : '#EF4444')}>
          {isPaid ? 'PAID' : 'DUE'}
        </Text>
      </View>
    )}
    {icon}
    <Text style={REGULAR_TEXT(8, COLORS.textSecondary)}>{label}</Text>
    <Text style={BOLD_TEXT(10, COLORS.textPrimary)}>{value}</Text>
  </View>
);

export const TenantDetailCard: React.FC<TenantDetailCardProps> = ({
  tenant,
  onAgreementPress,
  onCheckoutPress,
  onCallPress,
  onSupportPress,
  onMessagePress,
  onEmailPress,
}) => {
  // console.log('Rendering TenantDetailCard for:', tenant);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.avatar}>
          <User size={20} color={COLORS.textSecondary} />
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={BOLD_TEXT(13, COLORS.textPrimary)}>
              {tenant?.tenant_name || 'Unknown Tenant'}
            </Text>
            <BadgeCheck
              size={12}
              color={COLORS.primary}
              fill={COLORS.primary}
            />
          </View>
          <Text style={BOLD_TEXT(8, COLORS.primary)}>PRIMARY TENANT</Text>
        </View>
        {tenant?.bedNumber && (
          <View style={styles.bedBadge}>
            <Home size={10} color={COLORS.white} />
            <Text style={BOLD_TEXT(7, COLORS.white)}>
              BED #{tenant?.bedNumber}
            </Text>
          </View>
        )}
      </View>

      {/* Stats Row 1 */}
      <View style={styles.statsRow}>
        <StatItem
          icon={<Home size={12} color="#10B981" />}
          label="RENT"
          value={tenant?.rent || '₹0'}
          isPaid={tenant?.rentPaid || false}
        />
        <StatItem
          icon={<Wrench size={12} color="#8B5CF6" />}
          label="MAINT"
          value={tenant?.maint || '₹0'}
          isPaid={tenant?.maintPaid || false}
        />
        <StatItem
          icon={<Droplets size={12} color="#06B6D4" />}
          label="WATER"
          value={tenant?.water || '₹0'}
          isPaid={tenant?.waterPaid || false}
        />
      </View>

      {/* Stats Row 2 */}
      <View style={styles.statsRow}>
        <StatItem
          icon={<Flame size={12} color="#F97316" />}
          label="GAS"
          value={tenant?.gas || '₹0'}
          isPaid={tenant?.gasPaid || false}
        />
        <StatItem
          icon={<Zap size={12} color="#3B82F6" />}
          label="GRID"
          value={tenant?.grid || '₹0'}
          isPaid={tenant?.gridPaid || false}
        />
        <StatItem
          icon={<Building2 size={12} color="#6366F1" />}
          label="CAM"
          value={tenant?.cam || '₹0'}
          isPaid={tenant?.camPaid || false}
        />
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <View>
          <Text style={REGULAR_TEXT(8, COLORS.textSecondary)}>CHECK-IN</Text>
          <Text style={BOLD_TEXT(10, COLORS.textPrimary)}>
            {tenant?.checkInDate || '--'}
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.agreementButton}
            onPress={onAgreementPress}
          >
            <FileText size={11} color={COLORS.white} />
            <Text style={BOLD_TEXT(8, COLORS.white)}>AGREEMENT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={onCheckoutPress}
          >
            <Text style={BOLD_TEXT(8, COLORS.textPrimary)}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Row */}
      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.contactButton} onPress={onCallPress}>
          <Phone size={16} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={onSupportPress}>
          <Headphones size={16} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={onMessagePress}>
          <MessageSquare size={16} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={onEmailPress}>
          <Mail size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 10,
    marginTop: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 5,
    alignItems: 'center',
    position: 'relative',
  },
  paidBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  agreementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  checkoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  contactButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
