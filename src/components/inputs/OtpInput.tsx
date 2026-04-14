import { COLORS } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { useRef, useState } from 'react';
import {
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

interface OtpInputProps {
    value: string;
    onChange: (val: string) => void;
    textContentType?: "oneTimeCode" | "none";
    hasError?: boolean; 
}


export default function OtpInput({ value, onChange, textContentType, hasError }: OtpInputProps) {
    const hiddenInputRef = useRef<TextInput | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(0);

    const handleOtpChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
        onChange(cleaned);
        setFocusedIndex(cleaned.length > 3 ? 3 : cleaned.length);
    };

    return (
        <View>
            <Pressable
                style={styles.row}
                onPress={() => {
                    hiddenInputRef.current?.focus();
                    setFocusedIndex(Math.min(value.length, 3));
                }}
            >
                {[0, 1, 2, 3].map((i) => {
                    const isFocused = focusedIndex === i;
                    const isFilled = !!value[i];

                    return (
                        <View
                            key={i}
                            style={[
                                styles.box,
                                isFocused && styles.boxActive,
                                isFilled && styles.boxFilled,
                                hasError && styles.boxError, // ← only when error
                            ]}
                        >
                            <Text style={styles.boxText}>{value[i] ?? ''}</Text>
                        </View>
                    );
                })}
            </Pressable>
            <TextInput
                ref={hiddenInputRef}
                value={value}
                onChangeText={handleOtpChange}
                onFocus={() => setFocusedIndex(Math.min(value.length, 3))}
                onBlur={() => setFocusedIndex(null)}
                keyboardType="number-pad"
                maxLength={4}
                autoComplete={
                    Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'
                }
                textContentType={textContentType ?? "oneTimeCode"}
                importantForAutofill="yes"
                style={styles.hiddenInput}
            />
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.inputBackground,
    },

    boxText: {
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

    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        width: 1,
        height: 1,
    },
});