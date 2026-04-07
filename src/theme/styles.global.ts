import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FONTS } from './fonts';

const COLORS = {
  white: '#ffffff',
  offWhite: '#f7f7f7',
  primary: '#0f4f8c',
  sd1: '#E1EBFF',
  darkGray: '#333333',
  lightGray: '#9B9B9B',
  offGray: '#CFCFCF',
  bg1: '#0f4f8c',
};


export const STYLES = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.sd1,
    borderWidth: 1,
  },
});

// for react native paper component ( Text Input )
export const BASE_CONTAINER_HEIGHT = 50;

export const DROPDOWN_CONTAINER_STYLE = {
  backgroundColor: COLORS.white,
  height: BASE_CONTAINER_HEIGHT,
  borderColor: COLORS.primary,
  borderWidth: 1,
  borderRadius: 25,
  paddingHorizontal: 20,
  fontSize: scale(13),
  color: COLORS.darkGray,
  marginVertical: scale(5),
};

export const INPUT_CONTAINER_STYLES = {
  placeholderTextColor: COLORS.darkGray,
  activeOutlineColor: COLORS.primary,
  outlineColor: COLORS.darkGray,
  outlineStyle: {
    borderRadius: 15,
  },
  contentStyle: {
    paddingHorizontal: 20,
    fontSize: scale(13),
    color: COLORS.darkGray,
    height: BASE_CONTAINER_HEIGHT,
  },
  style: {
    backgroundColor: COLORS.white,
    height: BASE_CONTAINER_HEIGHT,
  },
};

export const BUTTON_CONTAINER_STYLES = {
  labelStyle: {
    color: COLORS.white,
    fontFamily: FONTS.BOLD,
  },
  contentStyle: {
    backgroundColor: COLORS.bg1,
    height: BASE_CONTAINER_HEIGHT,
    borderRadius: 15,
  },
  style: {
    borderRadius: 15,
  },
};

export const BORDER_CONTAINER_STYLES = {
  backgroundColor: COLORS.white,
  borderColor: '#E1EBFF',
  borderWidth: 1,
  borderRadius: 20,
};

export const BOLD_TEXT = (size?: number, color?: string) => {
  return {
    fontFamily: FONTS.BOLD,
    fontSize: scale(size ?? 12),
    color: color ?? 'rgba(22, 24, 67, 1)',
  };
};

export const MEDIUM_TEXT = (size?: number, color?: string) => {
  return {
    fontFamily: FONTS.REGULAR,
    fontSize: scale(size ?? 12),
    color: color ?? 'rgba(22, 24, 67, 1)',
  };
};

export const REGULAR_TEXT = (size?: number, color?: string) => {
  return {
    fontFamily: FONTS.REGULAR,
    fontSize: scale(size ?? 12),
    color: color ?? 'rgba(22, 24, 67, 1)',
  };
};

export const CENTER_CONTAINER = {
  justifyContent: 'center',
  alignItems: 'center',
};
