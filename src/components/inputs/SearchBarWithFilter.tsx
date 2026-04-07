import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';

interface SearchBarWithFilterProps {
    value: string;
    onChangeText: (text: string) => void;
    onFilterPress?: () => void;
    placeholder?: string;
}

export const SearchBarWithFilter: React.FC<SearchBarWithFilterProps> = ({
    value,
    onChangeText,
    onFilterPress,
    placeholder = 'Search by Room or Tenant',
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Search size={18} color={COLORS.textSecondary} strokeWidth={2} />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textDisabled}
                />
            </View>
            {onFilterPress && (
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={onFilterPress}
                    activeOpacity={0.7}
                >
                    <SlidersHorizontal
                        size={18}
                        color={COLORS.textSecondary}
                        strokeWidth={2}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: COLORS.textPrimary,
        padding: 0,
    },
    filterButton: {
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 12,
    },
});
