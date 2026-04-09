import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  DimensionValue,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../theme/colors';
import { BOLD_TEXT } from '../../theme/styles.global';
import { truncateSentence } from '../../utils/utils.ts';

// ---------- TYPES ----------
interface GradientButtonProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
  gradientColors?: string[]; // If provided, shows gradient
  backgroundColor?: string; // For solid color (fallback if no gradient)
  borderColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  textColor?: string;
  textSize?: number;
  logo?: ImageSourcePropType; // Optional logo on the left
  maxTextLength?: number; // For truncation
  style?: ViewStyle; // Additional container style
  textStyle?: TextStyle; // Additional text style
}

// ---------- COMPONENT ----------
const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  onPress,
  isLoading = false,
  disabled = false,
  gradientColors,
  backgroundColor = COLORS.black,
  borderColor = 'transparent',
  width = '100%',
  height = 55,
  borderRadius = 15,
  textColor = COLORS.white,
  textSize = 14,
  logo,
  maxTextLength = 50,
  style,
  textStyle,
}) => {
  const ButtonContent = () => (
    <View style={[styles.content, { height }]}>
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {logo && (
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          )}
          <Text
            style={[
              BOLD_TEXT(textSize, textColor),
              { maxWidth: '90%' },
              textStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {truncateSentence(text, maxTextLength)}
          </Text>
        </>
      )}
    </View>
  );

  const commonStyle: ViewStyle = {
    width,
    height,
    borderRadius,
    borderColor,
    borderWidth: 1,
    opacity: disabled ? 0.6 : 1,
  };

  // Gradient Background if gradientColors provided
  return gradientColors ? (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[commonStyle, style]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { borderRadius }]}
      >
        <ButtonContent />
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[commonStyle, { backgroundColor }, styles.solid, style]}
    >
      <ButtonContent />
    </TouchableOpacity>
  );
};

export default GradientButton;

// ---------- STYLES ----------
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
