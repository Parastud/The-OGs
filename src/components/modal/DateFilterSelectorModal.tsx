import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FONTS } from '../../theme/fonts';
import { COLORS } from '../../theme/colors';

export const TimeFrameMenuItem = {
  today_data: 'Today',
  yesterday_data: 'Yesterday',
  this_month: 'This Month',
  previous_month: 'Previous Months',
  last_3_month: 'Last 3 months',
};

export const getPeriodKeyByValue = (value: string) => {
  return Object.keys(TimeFrameMenuItem).find(
    key => TimeFrameMenuItem[key as keyof typeof TimeFrameMenuItem] === value,
  );
};

interface DateFilterSelectorModalProps {
  visible: boolean;
  currentTimeFrame: string;
  onSelectTimeFrame: (timeFrame: string) => void;
  onCancel: () => void;
}

export default function DateFilterSelectorModal({
  visible,
  currentTimeFrame,
  onSelectTimeFrame,
  onCancel,
}: DateFilterSelectorModalProps) {
  const menuItems = [
    TimeFrameMenuItem.today_data,
    TimeFrameMenuItem.yesterday_data,
    TimeFrameMenuItem.this_month,
    TimeFrameMenuItem.previous_month,
    TimeFrameMenuItem.last_3_month,
  ];

  const handleSelect = (item: string) => {
    onSelectTimeFrame(item);
    onCancel();
  };

  return (
    <Modal visible={visible} transparent onRequestClose={onCancel}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onCancel}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Select Time Frame</Text>

          {menuItems.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.menuItem,
                currentTimeFrame === item && styles.activeItem,
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text
                style={[
                  styles.menuText,
                  currentTimeFrame === item && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center', // 👈 center modal
    alignItems: 'center',
  },

  modalContainer: {
    width: '85%',
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    paddingVertical: scale(12),
    paddingHorizontal: scale(14),
  },

  title: {
    fontSize: scale(14), // 👈 smaller
    fontFamily: FONTS.BOLD,
    color: COLORS.textGray,
    marginBottom: scale(8),
    textAlign: 'center',
  },

  menuItem: {
    paddingVertical: scale(10), // 👈 compact
    paddingHorizontal: scale(10),
    borderRadius: scale(6),
    marginBottom: scale(4),
  },

  activeItem: {
    backgroundColor: '#E1EBFF',
  },

  menuText: {
    fontSize: scale(13), // 👈 compact text
    fontFamily: FONTS.REGULAR,
    color: COLORS.textGray,
  },

  activeText: {
    fontFamily: FONTS.BOLD,
    color: COLORS.primary,
  },
});
