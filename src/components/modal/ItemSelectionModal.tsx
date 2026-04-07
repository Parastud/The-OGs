import React, { useMemo, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { REGULAR_TEXT, BOLD_TEXT } from '../../theme/styles.global';
import { COLORS } from '../../theme/colors';
import { X, Search } from 'lucide-react-native';

type ItemType = {
  label: string;
  value: any;
};

type ItemSelectionModalProps = {
  visible: boolean;
  data: ItemType[];
  onCancel: () => void;
  onSelect: (item: ItemType) => void;
  searchable?: boolean;
  title?: string;
};

export default function ItemSelectionModal({
  visible,
  data,
  onCancel,
  onSelect,
  searchable = true,
  title = 'Select Item',
}: ItemSelectionModalProps) {
  const [searchText, setSearchText] = useState('');

  const filteredData = useMemo(() => {
    if (!searchable || !searchText.trim()) return data;

    return data.filter(item =>
      item.label.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, data, searchable]);

  const handleClose = () => {
    setSearchText('');
    onCancel();
  };

  const handleSelect = (item: ItemType) => {
    setSearchText('');
    onSelect(item);
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <TouchableOpacity
      style={styles.itemRow}
      onPress={() => handleSelect(item)}
      activeOpacity={0.6}
    >
      <Text style={REGULAR_TEXT(12, COLORS.textPrimary)}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      // animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable
          style={styles.modalContainer}
          onPress={e => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={BOLD_TEXT(16, COLORS.textPrimary)}>{title}</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X
                size={scale(20)}
                color={COLORS.textSecondary}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>

          {/* Search */}
          {searchable && (
            <View style={styles.searchContainer}>
              <Search
                size={scale(16)}
                color={COLORS.textSecondary}
                strokeWidth={2}
              />
              <TextInput
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchInput}
                placeholderTextColor={COLORS.textDisabled}
              />
            </View>
          )}

          {/* List */}
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => `${item.label}-${index}`}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <Text
                style={[
                  REGULAR_TEXT(13, COLORS.textDisabled),
                  styles.emptyText,
                ]}
              >
                No items found
              </Text>
            )}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },

  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: scale(16),
    padding: scale(16),
    width: '100%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
    paddingBottom: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },

  closeButton: {
    padding: scale(4),
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    marginBottom: scale(12),
  },

  searchInput: {
    flex: 1,
    paddingVertical: scale(12),
    paddingHorizontal: scale(8),
    fontSize: scale(14),
    color: COLORS.textPrimary,
  },

  list: {
    flexGrow: 0,
  },

  itemRow: {
    paddingVertical: scale(14),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
  },

  separator: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: scale(4),
  },

  emptyText: {
    textAlign: 'center',
    marginVertical: scale(24),
  },
});
