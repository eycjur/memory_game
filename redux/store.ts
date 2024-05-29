import { configureStore } from '@reduxjs/toolkit';

import turnReducer from './turnSlice';
import cardReducer from './cardsSlice';
import scoreReducer from './scoreSlice';

export const store = configureStore({
  reducer: {
    turn: turnReducer,
    cards: cardReducer,
    score: scoreReducer,
  },
});
