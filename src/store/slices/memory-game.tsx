import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { CardType } from '../../types';

type MemoryGameState = {
	isGameRunning: boolean;
	score: number;
	cards: CardType[];
	flipQueue: [CardType, CardType] | [];
};

const initialState: MemoryGameState = {
	isGameRunning: false,
	score: 0,
	cards: [],
	flipQueue: [],
};

const memoryGameSlice = createSlice({
	name: 'memory-game',
	initialState,
	reducers: {
		startGame(state, action: PayloadAction<{ cardCount: number }>) {
			state.isGameRunning = true;

			const numOfCardsToGenerate = action.payload.cardCount;
		},
		resetGame(state) {
			state.score = 0;
			state.flipQueue = [];
			state.isGameRunning = false;
		},
		increaseScore(state) {
			state.score = +1;
		},
	},
});

export const { startGame, resetGame, increaseScore } = memoryGameSlice.actions;
export const selectCards = (state: RootState) => state.memoryGame.cards;
export default memoryGameSlice.reducer;
