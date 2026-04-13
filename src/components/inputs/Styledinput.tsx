import { Colors } from '@/src/theme/colors';
import { FONTS } from '@/src/theme/fonts';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface StyledInputProps extends TextInputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
}

export default function StyledInput({
    placeholder,
    value,
    onChangeText,
    multiline,
    keyboardType,
    ...rest
}: StyledInputProps) {
    const [focused, setFocused] = useState(false);

    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.textTertiary}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            keyboardType={keyboardType}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[
                styles.input,
                multiline && styles.multiline,
                focused && styles.focused,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.background,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: 'transparent',
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontFamily: FONTS.REGULAR,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    multiline: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 14,
    },
    focused: {
        borderColor: Colors.primary,
        backgroundColor: Colors.backgroundAlt,
    },
});