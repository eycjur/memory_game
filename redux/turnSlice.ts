import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface TurnState {
  isAITurn: boolean;
}

const initialState: TurnState = {
  isAITurn: false,
};

const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    reverseTurn: (state) => {
      state.isAITurn = !state.isAITurn;
      console.log("isAITurn reverse to", state.isAITurn);
    },
    setIsAITurn: (state, action: PayloadAction<boolean>) => {
      state.isAITurn = action.payload;
      console.log("isAITurn set to", state.isAITurn);
    },
  },
});

export const { reverseTurn, setIsAITurn } = turnSlice.actions;
export default turnSlice.reducer;
