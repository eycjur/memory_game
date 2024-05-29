import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

// 動的importができないため、画像のパスを配列で持つ
const images = [
  require('../assets/cats/0.png'),
  require('../assets/cats/1.png'),
  require('../assets/cats/2.png'),
  require('../assets/cats/3.png'),
  require('../assets/cats/4.png'),
  require('../assets/cats/5.png'),
  require('../assets/cats/6.png'),
  require('../assets/cats/7.png'),
  require('../assets/cats/8.png'),
  require('../assets/cats/9.png'),
  require('../assets/cats/10.png'),
  require('../assets/cats/11.png'),
  require('../assets/cats/12.png'),
  require('../assets/cats/13.png'),
  require('../assets/cats/14.png'),
  require('../assets/cats/15.png'),
  require('../assets/cats/16.png'),
  require('../assets/cats/17.png'),
  require('../assets/cats/18.png'),
  require('../assets/cats/19.png'),
  require('../assets/cats/20.png'),
  require('../assets/cats/21.png'),
  require('../assets/cats/22.png'),
  require('../assets/cats/23.png'),
  require('../assets/cats/24.png'),
  require('../assets/cats/25.png'),
  require('../assets/cats/26.png'),
  require('../assets/cats/27.png'),
  require('../assets/cats/28.png'),
  require('../assets/cats/29.png'),
  require('../assets/cats/30.png'),
  require('../assets/cats/31.png'),
];

export interface CardType {
  id: number;
  image_id: number;
  image: ImageSourcePropType;
  selected: boolean;  // 開かれているかどうか
  finished: boolean;  // 一致したかどうか
  opened: boolean;  // 一度でも開いたかどうか
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateCards = (num: number): CardType[] => {
  if (num % 2 !== 0) {
    console.error('num must be even number');
  }
  let num_unique = Math.floor(num / 2);

  let cards: CardType[] = [];
  for (let i = 0; i < num_unique; i++) {
    cards.push({ id: i, image_id: i, image: images[i], selected: false, finished: false , opened: false});
    cards.push({ id: i + num_unique, image_id: i, image: images[i], selected: false, finished: false , opened: false});
  }
  shuffleArray(cards);
  return cards;
};

const initialState: Array<CardType> = generateCards(16);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectCardById: (state, action: PayloadAction<number>) => {
      const card = state.find(card => card.id === action.payload);
      if (card) {
        card.selected = true;
        card.opened = true;
      }
    },
    deselectAllCards: (state) => {
      state.forEach(card => card.selected = false);
    },
    finishCardsById: (state, action: PayloadAction<number[]>) => {
      for (const id of action.payload) {
        const card = state.find(card => card.id === id);
        if (card) {
          card.finished = true;
          card.selected = false;
        }
      }
    },
    initializeCards: (state) => {
      state.forEach(card => {
        card.selected = false;
        card.finished = false;
        card.opened = false;
      });
      shuffleArray(state);
    }
  },
});

export const { selectCardById, deselectAllCards, finishCardsById, initializeCards } = cardsSlice.actions;
export default cardsSlice.reducer;
