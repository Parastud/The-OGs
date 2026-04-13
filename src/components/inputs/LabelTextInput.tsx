/* eslint-disable */
import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { REGULAR_TEXT, BOLD_TEXT } from '../../theme/styles.global';
import { ChevronDown, Eye, EyeOff } from 'lucide-react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Variant = 'default' | 'phone' | 'selection' | 'datepicker' | 'password';

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  onPressSelection?: () => void;
  keyboardType?: 'default' | 'email-address' | 'number-pad' | 'phone-pad';
  maxLength?: number;
  error?: string;
  variant?: Variant;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  isRequired?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: React.ReactNode; // Custom left icon
};

const LabelTextInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onPressSelection,
  keyboardType = 'default',
  maxLength,
  error,
  variant = 'default',
  autoCapitalize = 'none',
  editable = true,
  isRequired = false,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
}) => {
  const isSelection = variant === 'selection' || variant === 'datepicker';
  const isPhone = variant === 'phone';
  const isPassword = variant === 'password';

  const [secure, setSecure] = useState(isPassword);

  const handlePress = () => {
    if (isSelection && onPressSelection) {
      Keyboard.dismiss();
      onPressSelection();
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[BOLD_TEXT(11, COLORS.textGray), { padding: 5 }]}>
          {label} {isRequired && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={isSelection ? 0.8 : 1}
        onPress={handlePress}
        style={styles.inputWrapper}
      >
        {isPhone && (
          <View style={styles.iconContainer}>
            <Image
              source={{ uri: 'https://flagcdn.com/w40/in.png' }}
              style={styles.flagImage}
              resizeMode="contain"
            />
          </View>
        )}

        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLightGray}
          style={[
            styles.input,
            multiline
              ? {
                height: 'auto',
                minHeight: 80,
                textAlignVertical: 'top',
              }
              : undefined,
          ]}
          keyboardType={keyboardType}
          maxLength={maxLength ?? undefined}
          multiline={multiline}
          numberOfLines={numberOfLines}
          value={value}
          editable={editable && !isSelection}
          pointerEvents={isSelection ? 'none' : 'auto'}
          secureTextEntry={isPassword ? secure : false}
          onChangeText={text => {
            if (!isSelection) {
              onChangeText(text);
            }
          }}
          autoCapitalize={autoCapitalize}
        />

        {/* Password toggle */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.eyeIcon}
          >
            {secure ? (
              <Eye size={20} color={COLORS.textGray} />
            ) : (
              <EyeOff size={20} color={COLORS.textGray} />
            )}
          </TouchableOpacity>
        )}

        {isSelection && (
          <View style={styles.chevronIcon}>
            <ChevronDown
              size={22}
              color={COLORS.textGray}
            />
          </View>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default LabelTextInput;

const styles = StyleSheet.create({
  container: {},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  input: {
    flex: 1,
    height: 55,
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    color: COLORS.black,
  },
  eyeIcon: {
    paddingRight: 12,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronIcon: {
    paddingRight: 12,
    paddingLeft: 8,
  },
  error: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 4,
  },
  flagImage: {
    width: 20,
    height: 20,
    borderRadius: 3,
  },
  required: {
    color: COLORS.red,
  },
  iconContainer: {
    paddingLeft: 12,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
