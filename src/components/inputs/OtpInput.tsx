import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface OtpInputProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

export default function OtpInput({ value, onChange, error }: OtpInputProps) {
    const inputs = useRef<(TextInput | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(0);

    const handleChange = (text: string, index: number) => {
        // Handle paste (full OTP)
        if (text.length > 1) {
            const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
            onChange(cleaned);
            inputs.current[cleaned.length - 1]?.focus();
            return;
        }

        const digit = text.replace(/[^0-9]/g, '');
        const chars = value.split('').concat(['', '', '', '']).slice(0, 4);
        chars[index] = digit;

        const newOtp = chars.join('');
        onChange(newOtp);

        if (digit && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (value[index]) {
                const chars = value.split('');
                chars[index] = '';
                onChange(chars.join(''));
            } else if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    };

    return (
        <View style={styles.row}>
            {[0, 1, 2, 3].map((i) => {
                const isFocused = focusedIndex === i;
                const isFilled = !!value[i];

                return (
                    <TextInput
                        key={i}
                        ref={(r) => { inputs.current[i] = r }}
                        value={value[i] ?? ''}
                        onFocus={() => setFocusedIndex(i)}
                        onBlur={() => setFocusedIndex(null)}
                        onChangeText={(t) => handleChange(t, i)}
                        onKeyPress={(e) => handleKeyPress(e, i)}
                        keyboardType="number-pad"
                        maxLength={1}
                        selectTextOnFocus
                        caretHidden
                        style={[
                            styles.box,
                            isFocused && styles.boxActive,
                            isFilled && styles.boxFilled,
                            error && styles.boxError,
                        ]}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },

    box: {
        width: 60,
        height: 64,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.inputBackground,
        fontSize: 26,
        fontFamily: FONTS.BOLD,
        color: COLORS.textPrimary,
        textAlign: 'center',
    },

    boxActive: {
        borderColor: COLORS.primary,
        backgroundColor: '#F5F3FF',
        transform: [{ scale: 1.05 }],
    },

    boxFilled: {
        borderColor: COLORS.primary,
        backgroundColor: '#EEF2FF',
        color: COLORS.primary,
    },

    boxError: {
        borderColor: COLORS.error,
        backgroundColor: '#FEF2F2',
    },
});