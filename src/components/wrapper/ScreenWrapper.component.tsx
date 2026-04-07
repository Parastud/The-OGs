import React, { useCallback, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
  StatusBarStyle,
  ImageBackground,
  Platform,
  RefreshControl,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../theme/colors';
import { IMAGES } from '../../theme/images';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  statusBarColor?: string;
  headerComponent?: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  barStyle?: StatusBarStyle;
  hideStatusBar?: boolean;
  centerContent?: boolean;
  safeArea?: boolean;
  scrollProps?: KeyboardAwareScrollViewProps;
  disableScroll?: boolean;
  onRefresh?: () => Promise<void>;
}

export function ScreenWrapper({
  children,
  statusBarColor = COLORS.white,
  headerComponent,
  style,
  contentContainerStyle,
  barStyle = 'dark-content',
  hideStatusBar = false,
  centerContent = false,
  safeArea = true,
  scrollProps,
  disableScroll,
  onRefresh,
}: Props) {
  const ContainerComponent = View;

  const safeAreaInsert = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);

  const combinedContentStyle = [
    styles.contentContainer,
    centerContent && styles.centerContent,
    contentContainerStyle,
  ];

  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  const renderContent = () => {
    const content = disableScroll ? (
      <View style={[combinedContentStyle, { flex: 1 }]}>{children}</View>
    ) : (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={combinedContentStyle}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          ) : undefined
        }
        {...scrollProps}
      >
        {children}
      </KeyboardAwareScrollView>
    );

    return content;
  };

  const innerContent = (
    <ContainerComponent
      style={[
        styles.flex,
        { paddingTop: headerComponent || safeArea ? safeAreaInsert.top : 0 },
      ]}
    >
      {headerComponent}
      {renderContent()}
    </ContainerComponent>
  );

  return (
    <View style={[styles.mainContainer, style]}>
      {!hideStatusBar && (
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle={barStyle}
        />
      )}
      {innerContent}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    zIndex: 1,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  centerContent: {
    justifyContent: 'center',
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
});
