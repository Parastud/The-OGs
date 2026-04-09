import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native';
import { BOLD_TEXT, REGULAR_TEXT } from '../../theme/styles.global';
import { COLORS } from '../../theme/colors';
import { scale } from 'react-native-size-matters';

interface Props {
  label: string;
  onExpand?: () => void;
  onCollapse?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  hideToggleLabel?: boolean;
}

export default function CollapseExpandHeader({
  label,
  onExpand,
  onCollapse,
  containerStyle = {},
  hideToggleLabel = false,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (isExpanded) {
      onCollapse?.();
    } else {
      onExpand?.();
    }
    setIsExpanded(!isExpanded);
  };

  const IconComponent = isExpanded ? ChevronUp : ChevronDown;

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={toggleExpand}>
      <Text style={[BOLD_TEXT(12, COLORS.textPrimary), { flex: 1 }]}>{label}</Text>

      <View style={styles.rightContent}>
        {!hideToggleLabel && (
          <Text style={REGULAR_TEXT(12, COLORS.textSecondary)}>
            {isExpanded ? 'Hide' : 'Show'}
          </Text>
        )}
        <IconComponent
          size={scale(20)}
          color={COLORS.textSecondary}
          style={{ marginLeft: 4 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: 12,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
