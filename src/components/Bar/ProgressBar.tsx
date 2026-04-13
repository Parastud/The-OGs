import { COLORS } from '@/src/theme/colors';
import { StyleSheet, View } from 'react-native';
interface ProgressBarProps {
    progress: number; // 0 to 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: { height: 4, backgroundColor: COLORS.backgroundAlt, width: '100%' },
    fill: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },
});