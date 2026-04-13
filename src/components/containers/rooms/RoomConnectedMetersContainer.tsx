import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Zap, Droplets, Flame, Signal } from "lucide-react-native";
import { COLORS } from "../../../theme/colors";
import { REGULAR_TEXT, BOLD_TEXT } from "../../../theme/styles.global";
import RechargeDeviceBottomSheet from "../../../screens/appScreens/rechargeScreens/RechargeDeviceBottomSheet";

export type MeterType = "elm" | "wtm" | "gsm";

export interface MeterData {
  id: string;
  name: string;
  type: MeterType;
  lastPing: string;
  network: "online" | "offline";
  isOnline: boolean;
}

interface RoomConnectedMetersContainerProps {
  elmMeters: MeterData[];
  wtmMeters: MeterData[];
  gsmMeters: MeterData[];
  onRechargePress?: (meterId: string) => void;
}

const getMeterIcon = (type: MeterType, size: number = 16) => {
  switch (type) {
    case "elm":
      return <Zap size={size} color={COLORS.primary} />;
    case "wtm":
      return <Droplets size={size} color="#06B6D4" />;
    case "gsm":
      return <Flame size={size} color="#F97316" />;
    default:
      return <Zap size={size} color={COLORS.primary} />;
  }
};

const getMeterLabel = (type: MeterType) => {
  switch (type) {
    case "elm":
      return "Electric";
    case "wtm":
      return "Water";
    case "gsm":
      return "Gas";
    default:
      return "Unknown";
  }
};

export const RoomConnectedMetersContainer = (
  props: RoomConnectedMetersContainerProps,
) => {
  const { elmMeters, wtmMeters, gsmMeters, onRechargePress } = props;

  // Determine which tabs have meters
  const hasElmMeters = elmMeters.length > 0;
  const hasWtmMeters = wtmMeters.length > 0;
  const hasGsmMeters = gsmMeters.length > 0;

  // Set initial active tab to first available type with meters
  const getInitialTab = (): MeterType => {
    if (hasElmMeters) return "elm";
    if (hasWtmMeters) return "wtm";
    if (hasGsmMeters) return "gsm";
    return "elm"; // Default fallback
  };

  const [activeTab, setActiveTab] = useState<MeterType>(getInitialTab());

  // State for recharge bottom sheet
  const [showRechargeSheet, setShowRechargeSheet] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState<MeterData | null>(null);

  // Check if any meters exist at all
  const hasAnyMeters = hasElmMeters || hasWtmMeters || hasGsmMeters;

  // ========== HANDLERS ==========

  const handleRechargePress = (meter: MeterData) => {
    setSelectedMeter(meter);
    setShowRechargeSheet(true);
    onRechargePress?.(meter.id);
  };

  const handleRechargeClose = () => {
    setShowRechargeSheet(false);
    setSelectedMeter(null);
  };

  const handleProceedToPay = (amount: number) => {
    console.log("Proceed to pay:", { amount, meterId: selectedMeter?.id });
    // Here you would integrate with payment gateway (e.g., Razorpay)
    handleRechargeClose();
  };

  const renderTab = (type: MeterType, hasMeters: boolean, count: number) => {
    const isActive = activeTab === type;

    return (
      <TouchableOpacity
        key={type}
        style={[
          styles.tab,
          isActive && styles.tabActive,
          !hasMeters && styles.tabDisabled,
        ]}
        onPress={() => hasMeters && setActiveTab(type)}
        activeOpacity={hasMeters ? 0.7 : 1}
      >
        {getMeterIcon(type, 14)}
        <Text
          style={
            isActive
              ? BOLD_TEXT(10, COLORS.primary)
              : REGULAR_TEXT(10, hasMeters ? COLORS.textSecondary : "#9CA3AF")
          }
        >
          {getMeterLabel(type)}
        </Text>
        {count > 0 && (
          <View
            style={[
              styles.tabCount,
              { backgroundColor: isActive ? COLORS.primary : "#E5E7EB" },
            ]}
          >
            <Text
              style={BOLD_TEXT(
                8,
                isActive ? COLORS.white : COLORS.textSecondary,
              )}
            >
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderMeterCard = (meter: MeterData, showRecharge: boolean = false) => (
    <View key={meter.id} style={styles.meterCard}>
      {/* Meter Header Row */}
      <View style={styles.meterHeader}>
        <View style={styles.meterIconContainer}>
          {getMeterIcon(meter.type, 18)}
        </View>
        <Text style={BOLD_TEXT(12, COLORS.textPrimary)}>{meter.name}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: meter.isOnline ? "#D1FAE5" : "#FEE2E2" },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: meter.isOnline ? "#10B981" : "#EF4444" },
            ]}
          />
          <Text style={BOLD_TEXT(8, meter.isOnline ? "#10B981" : "#EF4444")}>
            {meter.isOnline ? "ONLINE" : "OFFLINE"}
          </Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>LAST PING</Text>
          <Text style={BOLD_TEXT(11, COLORS.textPrimary)}>
            {meter.lastPing}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>NETWORK</Text>
          <Signal size={16} color={COLORS.textPrimary} />
        </View>
        {showRecharge && (
          <TouchableOpacity
            style={styles.rechargeButton}
            onPress={() => handleRechargePress(meter)}
            activeOpacity={0.7}
          >
            <Text style={BOLD_TEXT(10, COLORS.white)}>RECHARGE</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderEmptyState = (type: MeterType) => (
    <View style={styles.emptyState}>
      <Text style={REGULAR_TEXT(11, COLORS.textSecondary)}>
        No {getMeterLabel(type).toLowerCase()} meters connected
      </Text>
    </View>
  );

  const renderElmDevices = () => {
    if (elmMeters.length === 0) {
      return renderEmptyState("elm");
    }
    return elmMeters.map((meter) => renderMeterCard(meter, true));
  };

  const renderWtmDevices = () => {
    if (wtmMeters.length === 0) {
      return renderEmptyState("wtm");
    }
    return wtmMeters.map((meter) => renderMeterCard(meter, false));
  };

  const renderGsmDevices = () => {
    if (gsmMeters.length === 0) {
      return renderEmptyState("gsm");
    }
    return gsmMeters.map((meter) => renderMeterCard(meter, false));
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "elm":
        return renderElmDevices();
      case "wtm":
        return renderWtmDevices();
      case "gsm":
        return renderGsmDevices();
      default:
        return renderEmptyState("elm");
    }
  };

  if (!hasAnyMeters) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Zap size={16} color={COLORS.primary} />
          <Text style={BOLD_TEXT(11, COLORS.textSecondary)}>
            CONNECTED METERS
          </Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={REGULAR_TEXT(11, COLORS.textSecondary)}>
            No meters connected
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Zap size={16} color={COLORS.primary} />
        <Text style={BOLD_TEXT(11, COLORS.textSecondary)}>
          CONNECTED METERS
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {renderTab("elm", hasElmMeters, elmMeters.length)}
        {renderTab("wtm", hasWtmMeters, wtmMeters.length)}
        {renderTab("gsm", hasGsmMeters, gsmMeters.length)}
      </View>

      {/* Meter Cards based on active tab */}
      {renderActiveTabContent()}

      {/* Recharge Bottom Sheet */}
      {selectedMeter && (
        <RechargeDeviceBottomSheet
          visible={showRechargeSheet}
          onClose={handleRechargeClose}
          meterInfo={{
            id: selectedMeter.id,
            name: selectedMeter.name,
            consumerId: "BB2100",
            balance: "₹142.50",
          }}
          onProceedToPay={handleProceedToPay}
        />
      )}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  tabsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  tabActive: {
    backgroundColor: "#E8F4FD",
  },
  tabDisabled: {
    opacity: 0.5,
  },
  tabCount: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  meterCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  meterHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  meterIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E8F4FD",
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: "auto",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statItem: {
    gap: 2,
  },
  rechargeButton: {
    marginLeft: "auto",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
