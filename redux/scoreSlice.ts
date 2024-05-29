import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScoreState {
  human: number;
  ai: number;
}

const initialState: ScoreState = {
  human: 0,
  ai: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    addScoreHuman: (state, action: PayloadAction<number>) => {
      state.human += action.payload;
    },
    addScoreAI: (state, action: PayloadAction<number>) => {
      state.ai += action.payload;
    },
    initializeScore: (state) => {
      state.human = 0;
      state.ai = 0;
    },
  },
});

export const { addScoreHuman, addScoreAI, initializeScore } = scoreSlice.actions;
export default scoreSlice.reducer;
