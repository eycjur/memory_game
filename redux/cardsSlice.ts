import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";

// 動的importができないため、画像のパスを配列で持つ
const IMAGES = [
  require("../assets/sample/0.png"),
  require("../assets/sample/1.png"),
  require("../assets/sample/2.png"),
  require("../assets/sample/3.png"),
  require("../assets/sample/4.png"),
  require("../assets/sample/5.png"),
  require("../assets/sample/6.png"),
  require("../assets/sample/7.png"),
];

export interface CardType {
  id: number;
  image_id: number;
  image: ImageSourcePropType;
  selected: boolean; // 開かれているかどうか
  finished: boolean; // 一致したかどうか
  opened: boolean; // 一度でも開いたかどうか
}

const shuffleArray = (array: CardType[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateCards = (num: number): CardType[] => {
  if (num % 2 !== 0) {
    console.error("num must be even number");
  }
  const num_unique = Math.floor(num / 2);

  const cards: CardType[] = [];
  for (let i = 0; i < num_unique; i++) {
    cards.push({
      id: i,
      image_id: i,
      image: IMAGES[i],
      selected: false,
      finished: false,
      opened: false,
    });
    cards.push({
      id: i + num_unique,
      image_id: i,
      image: IMAGES[i],
      selected: false,
      finished: false,
      opened: false,
    });
  }
  shuffleArray(cards);
  return cards;
};

export interface CardsState {
  cards: CardType[];
}

const initialState: CardsState = {
  cards: generateCards(16),
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    selectCardById: (state, action: PayloadAction<number>) => {
      const card = state.cards.find((card) => card.id === action.payload);
      if (card) {
        card.selected = true;
        card.opened = true;
      }
    },
    deselectAllCards: (state) => {
      state.cards.forEach((card) => (card.selected = false));
    },
    finishCardsById: (state, action: PayloadAction<number[]>) => {
      for (const id of action.payload) {
        const card = state.cards.find((card) => card.id === id);
        if (card) {
          card.finished = true;
          card.selected = false;
        }
      }
    },
    initializeCards: (state) => {
      state.cards.forEach((card) => {
        card.selected = false;
        card.finished = false;
        card.opened = false;
      });
      shuffleArray(state.cards);
    },
  },
});

export const { selectCardById, deselectAllCards, finishCardsById, initializeCards } =
  cardsSlice.actions;
export default cardsSlice.reducer;
