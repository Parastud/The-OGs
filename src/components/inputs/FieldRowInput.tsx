import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { COLORS } from '../../theme/colors';
import { REGULAR_TEXT } from '../../theme/styles.global';
import { scale } from 'react-native-size-matters';

interface FieldRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  prefix?: React.ReactNode;
  suffix?: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
}

const FieldRow = ({
  icon,
  label,
  value,
  prefix,
  suffix,
  editable = false,
  onChangeText,
  keyboardType = 'default',
  placeholder,
}: FieldRowProps) => (
  <View style={styles.fieldRow}>
    <View style={styles.fieldHeader}>
      <View style={styles.fieldIconContainer}>{icon}</View>
      <Text style={styles.fieldLabel}>{label}</Text>
    </View>
    <View style={[styles.inputWrapper, editable && styles.inputWrapperActive]}>
      {prefix && <View style={styles.inputPrefix}>{prefix}</View>}
      <TextInput
        style={[styles.input, !editable && styles.inputReadOnly]}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
      />
      {suffix && <Text style={styles.inputSuffix}>{suffix}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  fieldRow: {
    marginBottom: scale(14),
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginBottom: scale(6),
  },
  fieldIconContainer: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: COLORS.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldLabel: {
    ...REGULAR_TEXT(10, COLORS.textSecondary),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(10),
    backgroundColor: '#F8F9FC',
  },
  inputWrapperActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  inputPrefix: {
    paddingLeft: scale(12),
    paddingRight: scale(4),
  },
  input: {
    flex: 1,
    height: scale(44),
    paddingHorizontal: scale(10),
    ...REGULAR_TEXT(12, COLORS.textPrimary),
  },
  inputReadOnly: {
    color: COLORS.textSecondary,
  },
  inputSuffix: {
    ...REGULAR_TEXT(11, COLORS.textSecondary),
    paddingRight: scale(12),
  },
});

export default FieldRow;