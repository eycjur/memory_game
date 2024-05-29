import { configureStore } from "@reduxjs/toolkit";

import turnReducer, { TurnState } from "./turnSlice";
import cardReducer, { CardsState } from "./cardsSlice";
import scoreReducer, { ScoreState } from "./scoreSlice";

export interface RootState {
  turn: TurnState;
  cards: CardsState;
  score: ScoreState;
}

export const store = configureStore({
  reducer: {
    turn: turnReducer,
    cards: cardReducer,
    score: scoreReducer,
  },
});
