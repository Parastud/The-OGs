import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface ChipGroupProps {
    options: string[];
    selected: string[];
    onToggle: (v: string) => void;
    color?: string;
    loading?: boolean;
}

export default function ChipGroup({
    options,
    selected,
    onToggle,
    color = COLORS.primary,
    loading = false,
}: ChipGroupProps) {
    if (loading) {
        return (
            <View style={styles.loadingWrap}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading…</Text>
            </View>
        );
    }

    return (
        <View style={styles.wrap}>
            {options.map((opt) => {
                const active = selected.includes(opt);
                return (
                    <TouchableOpacity
                        key={opt}
                        onPress={() => onToggle(opt)}
                        activeOpacity={0.75}
                        style={[styles.chip, active && { backgroundColor: color, borderColor: color }]}
                    >
                        <Text style={[styles.label, active && styles.labelActive]}>{opt}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    loadingWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 },
    loadingText: { fontFamily: FONTS.REGULAR, fontSize: 13, color: COLORS.textTertiary },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: '#fff',
    },
    label: { fontFamily: FONTS.REGULAR, fontSize: 13, color: COLORS.textPrimary },
    labelActive: { color: COLORS.textInverse, fontFamily: FONTS.BOLD },
});