import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { CardType, CatApiItemType } from '../../types';
import { shuffleArray } from '../../utils';

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

export const startGame = createAsyncThunk<
	CatApiItemType[],
	{ cardCount: number }
>('offers/fetchOffers', async (action) => {
	const { cardCount } = action;

	const { data } = await axios.get<CatApiItemType[]>(
		`https://api.thecatapi.com/v1/images/search?limit=${cardCount}`,
	);

	return data;
});

const memoryGameSlice = createSlice({
	name: 'memory-game',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(startGame.pending, (state) => {
			state.cards = [];
		});
		builder.addCase(startGame.rejected, (state) => {
			state.cards = [];
		});
		builder.addCase(startGame.fulfilled, (state, action) => {
			const items = action.payload;
			const cards: CardType[] = items.map(({ id, url }) => ({
				id,
				imgUrl: url,
				found: false,
			}));

			// Deep copy array, to throw out memory references
			const gameCards = structuredClone([
				...cards,
				...cards,
			]) as CardType[];
			const shuffledGameCards = shuffleArray(gameCards);

			state.isGameRunning = true;
			state.cards = shuffledGameCards;
		});
	},
	reducers: {
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

export const { resetGame, increaseScore } = memoryGameSlice.actions;
export const selectCards = (state: RootState) => state.memoryGame.cards;
export default memoryGameSlice.reducer;
