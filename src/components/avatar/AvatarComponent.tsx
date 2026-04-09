import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Some dummy colors to assign consistently per user
const COLORS = [
  '#FF5733',
  '#33A1FF',
  '#33FF57',
  '#FF33A8',
  '#FFC133',
  '#8D33FF',
  '#33FFF3',
  '#FF8C33',
  '#B6FF33',
  '#FF3333',
];

type AvatarProps = {
  name: string;
  imageUrl?: string;
  size?: number;
  onPress?: () => void;
  viewNavigation?: boolean; // <-- new prop
  viewNavigationHeaderTitle?: string;
};

export default function AvatarComponent(props: AvatarProps) {
  const { name, imageUrl, size = 72, viewNavigation } = props;
  const navigation = useNavigation<any>();
  const [imageError, setImageError] = useState(false);

  // Pick color based on first letter to keep it consistent
  const firstLetter = name?.[0]?.toUpperCase() || '?';
  const colorIndex = firstLetter.charCodeAt(0) % COLORS.length;
  const bgColor = COLORS[colorIndex];

  const handlePress = () => {
    if (viewNavigation && imageUrl && !imageError) {
      navigation.navigate('ViewPictureScreen', {
        image: imageUrl,
        viewNavigationHeaderTitle: props?.viewNavigationHeaderTitle || 'View',
      });
      return;
    }
    props?.onPress?.();
  };

  return (
    <Pressable onPress={handlePress}>
      {imageUrl && !imageError ? (
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              // borderColor: COLORS[4], borderWidth: 2
            },
          ]}
          onError={() => setImageError(true)}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: bgColor,
            },
          ]}
        >
          <Text style={[styles.letter, { fontSize: size / 2 }]}>
            {firstLetter}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    marginBottom: 8,
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
});
