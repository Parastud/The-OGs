import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {WifiOff, RefreshCw} from 'lucide-react-native';
import {BOLD_TEXT, REGULAR_TEXT} from '../../theme/styles.global';
import {COLORS} from '../../theme/colors';
// import NetInfo from '@react-native-community/netinfo';

export default function NoInternetScreen() {
  const handleRefresh = async () => {
    // const state = await NetInfo.fetch();
    // if (state.isConnected) {
    //   // You can trigger re-render / navigation here if needed
    //   console.log('Internet connection restored!');
    // } else {
    //   console.log('Still offline');
    // }
  };

  return (
    <View style={styles.container}>
      <WifiOff size={80} color={COLORS.gray} strokeWidth={1.5} />
      <Text style={[BOLD_TEXT(18, COLORS.white), {marginTop: 16}]}>
        No Internet Connection
      </Text>
      <Text
        style={[
          REGULAR_TEXT(14, COLORS.gray),
          {textAlign: 'center', marginTop: 6, width: '80%'},
        ]}>
        Please check your network settings and try again.
      </Text>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <RefreshCw size={18} color={COLORS.white} strokeWidth={2} />
        <Text style={[BOLD_TEXT(14, COLORS.white), {marginLeft: 8}]}>
          Refresh
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: COLORS.brandColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
