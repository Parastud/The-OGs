import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenWrapper} from '../wrapper';
import LoadingContainerComponent from './LoadingContainerComponent';

export default function LoadingScreenContainer(props: {message?: string}) {
  return (
    <ScreenWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LoadingContainerComponent message={props.message || ''} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
