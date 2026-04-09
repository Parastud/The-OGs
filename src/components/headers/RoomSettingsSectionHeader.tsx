import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import { COLORS } from "../../theme/colors";
import { BOLD_TEXT } from "../../theme/styles.global";

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrap}>{icon}</View>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginBottom: scale(12),
    },
    sectionIconWrap: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(8),
        backgroundColor: COLORS.primaryLight + '25',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        ...BOLD_TEXT(12, COLORS.textPrimary),
    },
})

export default SectionHeader