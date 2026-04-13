import { Colors } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { StyleSheet, Text } from 'react-native';

export default function SectionLabel({ text }: { text: string }) {
    return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
    label: {
        fontFamily: FONTS.BOLD,
        fontSize: 11,
        color: Colors.textSecondary,
        letterSpacing: 1.4,
        marginBottom: 10,
        marginTop: 24,
    },
});