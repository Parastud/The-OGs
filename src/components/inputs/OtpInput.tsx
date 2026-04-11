import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface OtpInputProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

export default function OtpInput({ value, onChange, error }: OtpInputProps) {
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = (text: string, index: number) => {
        const digit = text.replace(/[^0-9]/g, '').slice(-1);
        const chars = value.split('').concat(['', '', '', '']).slice(0, 4);
        chars[index] = digit;
        const next = chars.join('');
        onChange(next);
        if (digit && index < 3) inputs.current[index + 1]?.focus();
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.row}>
            {[0, 1, 2, 3].map((i) => (
                <TextInput
                    key={i}
                    ref={(r) => { inputs.current[i] = r }}
                    style={[
                        styles.box,
                        value[i] ? styles.boxFilled : null,
                        error ? styles.boxError : null,
                    ]}
                    value={value[i] ?? ''}
                    onChangeText={(t) => handleChange(t, i)}
                    onKeyPress={(e) => handleKeyPress(e, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    caretHidden
                    textAlign="center"
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    box: {
        flex: 1,
        height: 58,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.inputBackground,
        fontSize: 24,
        fontFamily: FONTS.BOLD,
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
    boxFilled: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,  // e.g. a faint tint of primary
        color: COLORS.primaryDark,
    },
    boxError: {
        borderColor: COLORS.error,
    },
});