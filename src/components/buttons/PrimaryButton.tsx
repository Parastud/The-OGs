import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { scale, verticalScale } from 'react-native-size-matters';

interface PrimaryButtonProps {
    text: string;
    onPress?: (event: GestureResponderEvent) => void;
    isLoading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

/**
 * Primary button with the app's brand orange color.
 * A simpler alternative to GradientButton that doesn't require react-native-linear-gradient.
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    text,
    onPress,
    isLoading = false,
    disabled = false,
    style,
    textStyle,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled || isLoading}
            onPress={onPress}
            style={[
                styles.button,
                disabled && styles.disabled,
                style,
            ]}
        >
            {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
            ) : (
                <Text style={[styles.text, textStyle]}>{text}</Text>
            )}
        </TouchableOpacity>
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: verticalScale(50),
        backgroundColor: COLORS.primary,
        borderRadius: scale(12),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        fontSize: scale(16),
        fontWeight: '600',
        color: COLORS.white,
    },
});
