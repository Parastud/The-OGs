import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { Zap } from "lucide-react-native";
import { COLORS } from "../../../theme/colors";
import { BOLD_TEXT, REGULAR_TEXT } from "../../../theme/styles.global";
import { DashboardDataTypes } from "../../../types/dashboard.types";
import { SkeletonLoader } from "../../skeleton/SkeletonLoader";
import { useRateManagement } from "../../../hooks/apiHooks/useRateManagementApi";

interface EstimatedBillCardProps {
  isLoading: boolean;
  dashboardSummaryData: DashboardDataTypes;
  onSettlePress?: () => void;
}

export const EstimatedBillCard = ({
  isLoading,
  dashboardSummaryData,
  onSettlePress = () => {},
}: EstimatedBillCardProps) => {
  const { deviceEntries } = useRateManagement();
  const { elm_dg_forecasted_unit, elm_grid_forecasted_unit } =
    dashboardSummaryData;

  const dgUnitPrice = parseFloat(
    deviceEntries.find((e) => e.type === "2")?.unit_price ?? "0",
  );
  const gridUnitPrice = parseFloat(
    deviceEntries.find((e) => e.type === "3")?.unit_price ?? "0",
  );

  const amount = (
    dgUnitPrice * (elm_dg_forecasted_unit ?? 0) +
    gridUnitPrice * (elm_grid_forecasted_unit ?? 0)
  ).toLocaleString("en-IN");

  if (isLoading) {
    return (
      <SkeletonLoader
        cols={1}
        rows={1}
        itemHeight={52}
        itemBorderRadius={10}
        containerStyle={{ marginBottom: scale(10) }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Left: icon + label + amount */}
      <View style={styles.left}>
        <View style={styles.iconDot}>
          <Zap size={scale(12)} color="#4A7BF7" fill="#4A7BF7" />
        </View>
        <View>
          <Text style={REGULAR_TEXT(9, COLORS.textSecondary)}>EST. BILL</Text>
          <Text style={BOLD_TEXT(16, COLORS.textPrimary)}>₹{amount}</Text>
        </View>
      </View>

      {/* Right: CTA */}
      <TouchableOpacity style={styles.button} onPress={onSettlePress}>
        <Text style={BOLD_TEXT(10, COLORS.white)}>SETTLE DUES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    marginBottom: scale(10),
    borderWidth: 1,
    borderColor: COLORS.divider,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  iconDot: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(8),
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: scale(7),
    paddingHorizontal: scale(11),
    borderRadius: scale(8),
  },
});
