import { Colors } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProfilePhotoUploadProps {
    uri: string | null;
    onPress: () => void;
}

export default function ProfilePhotoUpload({ uri, onPress }: ProfilePhotoUploadProps) {
    return (
        <TouchableOpacity style={styles.box} onPress={onPress} activeOpacity={0.8}>
            {uri ? (
                <Image source={{ uri }} style={styles.preview} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.icon}>📷</Text>
                    <Text style={styles.hint}>Tap to upload</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    box: { alignSelf: 'flex-start' },
    placeholder: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: Colors.backgroundAlt,
        borderWidth: 2,
        borderColor: Colors.border,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    preview: { width: 96, height: 96, borderRadius: 48 },
    icon: { fontSize: 22 },
    hint: { fontFamily: FONTS.REGULAR, fontSize: 10, color: Colors.textSecondary },
});