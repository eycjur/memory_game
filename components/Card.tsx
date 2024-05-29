import React from 'react';
import { Image, StyleSheet, Pressable, View } from 'react-native';
import ReactCardFlip from 'react-card-flip';
import { ImageSourcePropType } from 'react-native';
import FlipCard from 'react-native-flip-card'

interface CardProps {
  image: ImageSourcePropType;
  onPress: () => void;
  isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({ image, onPress, isFlipped }) => {
  /*
  isFlipped:
    true: show the image
    false: show the card back
  */
  return (
    <View style={styles.cardContainer}>
      <FlipCard flip={isFlipped} flipHorizontal={true} flipVertical={false} clickable={false}>
        <Pressable style={styles.card} onPress={onPress} key="front">
          <Image
            style={styles.image}
            source={require('../assets/card-back.png')}
          />
        </Pressable>

        <Pressable style={styles.card} onPress={onPress} key="back">
          <Image
            style={styles.image}
            source={image}
          />
        </Pressable>
      </FlipCard>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 3,
    width: 72,
    height: 108,
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default Card;
