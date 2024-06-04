import { configureStore } from "@reduxjs/toolkit";

import turnReducer, { TurnState } from "@/redux/turnSlice";
import cardReducer, { CardsState } from "@/redux/cardsSlice";
import scoreReducer, { ScoreState } from "@/redux/scoreSlice";

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
