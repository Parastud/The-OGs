import { CheckCircle2, ChevronDown } from "lucide-react-native";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../theme/colors";
import { scale } from "react-native-size-matters";
import { BOLD_TEXT, REGULAR_TEXT } from "../../theme/styles.global";

const SelectorRow = ({
  icon,
  label,
  value,
  placeholder,
  onPress,
  loading = false,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  placeholder: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    style={[
      styles.selectorRow,
      value ? styles.selectorRowFilled : styles.selectorRowEmpty,
      disabled && styles.selectorRowDisabled,
    ]}
    onPress={onPress}
    activeOpacity={disabled ? 1 : 0.8}
    disabled={disabled}
  >
    <View style={styles.selectorLeft}>
      <View style={[styles.selectorIconWrap, value ? styles.selectorIconFilled : {}]}>
        {icon}
      </View>
      <View style={styles.selectorText}>
        <Text style={styles.selectorLabel}>{label}</Text>
        <Text
          style={value ? styles.selectorValue : styles.selectorPlaceholder}
          numberOfLines={1}
        >
          {value ?? placeholder}
        </Text>
      </View>
    </View>
    {loading ? (
      <ActivityIndicator size="small" color={COLORS.primary} />
    ) : value ? (
      <CheckCircle2 size={scale(16)} color={COLORS.primary} />
    ) : (
      <ChevronDown size={scale(14)} color={COLORS.textSecondary} />
    )}
  </TouchableOpacity>
);

export default SelectorRow

const styles = StyleSheet.create({
    
      // ── Selector Row ──
      selectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: scale(10),
        borderWidth: 1.5,
        paddingHorizontal: scale(12),
        paddingVertical: scale(10),
      },
      selectorRowEmpty: {
        borderColor: '#E2E5EF',
        backgroundColor: '#FAFBFF',
      },
      selectorRowFilled: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
      },
      selectorRowDisabled: {
        opacity: 0.5,
      },
      selectorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
        flex: 1,
      },
      selectorIconWrap: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(8),
        backgroundColor: '#F0F2F8',
        justifyContent: 'center',
        alignItems: 'center',
      },
      selectorIconFilled: {
        backgroundColor: COLORS.primaryLight + '25',
      },
      selectorText: {
        flex: 1,
      },
      selectorLabel: {
        ...REGULAR_TEXT(9, COLORS.textSecondary),
        marginBottom: scale(1),
      },
      selectorPlaceholder: {
        ...REGULAR_TEXT(11, COLORS.textSecondary),
      },
      selectorValue: {
        ...BOLD_TEXT(11, COLORS.textPrimary),
      },
    
})