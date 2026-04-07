import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';
import { scale } from 'react-native-size-matters';
import { REGULAR_TEXT } from '../../theme/styles.global';

interface NavigationHeaderProps {
  title: string;
  subTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  rightComponent?: React.ReactNode; // ✅ NEW
  rightComponentWidth?: ViewStyle['width']; // ✅ NEW
  onBackPress?: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subTitle,
  containerStyle,
  titleStyle,
  rightComponent,
  rightComponentWidth,
  onBackPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.sideButton}
        onPress={() => {
          if (onBackPress) {
            onBackPress();
          } else {
            navigation.goBack();
          }
        }}
        activeOpacity={0.7}
      >
        <ArrowLeft
          size={scale(22)}
          strokeWidth={2}
          color={COLORS.textPrimary}
        />
      </TouchableOpacity>

      {/* Title */}
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {title}
        </Text>

        {subTitle && (
          <Text style={[REGULAR_TEXT(9, COLORS.darkGray)]} numberOfLines={1}>
            {subTitle}
          </Text>
        )}
      </View>

      {/* Right Component */}
      {rightComponent && (
        <View style={[styles.sideButton, { width: rightComponentWidth ?? 40 }]}>
          {rightComponent ?? null}
        </View>
      )}
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  sideButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
