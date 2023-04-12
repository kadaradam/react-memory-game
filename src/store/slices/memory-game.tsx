import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { CardType, CatApiItemType } from '../../types';
import { shuffleArray } from '../../utils';

type MemoryGameState = {
	isGameRunning: boolean;
	countOfMoves: number;
	cards: CardType[];
	foundCardIds: string[];
	flippedCardIds: string[];
	isCheckRunning: boolean;
};

const initialState: MemoryGameState = {
	isGameRunning: false,
	countOfMoves: 0,
	cards: [],
	foundCardIds: [],
	flippedCardIds: [],
	isCheckRunning: false,
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
			const firstCardDeck: CardType[] = items.map(({ id, url }) => ({
				id,
				imgUrl: url,
			}));

			// Assign inique ids to new batch
			const secondCardDeck: CardType[] = firstCardDeck.map(
				({ id, ...rest }) => ({
					id: `second_${id}`,
					...rest,
				}),
			);

			// Deep copy array, to throw out memory references
			const gameCards = structuredClone([
				...firstCardDeck,
				...secondCardDeck,
			]) as CardType[];
			const shuffledGameCards = shuffleArray(gameCards);

			state.isGameRunning = true;
			state.cards = shuffledGameCards;
		});
	},
	reducers: {
		resetGame(state) {
			state.countOfMoves = 0;
			state.flippedCardIds = [];
			state.foundCardIds = [];
			state.isGameRunning = false;
		},
		flipCard(state, action: PayloadAction<string>) {
			const cardId = action.payload;

			// Disable to click on the same card
			if (state.flippedCardIds.includes(cardId)) {
				return;
			}

			state.flippedCardIds = [...state.flippedCardIds, cardId];
		},
		preCheck(state) {
			state.isCheckRunning = true;
		},
		checkMatch(state) {
			const [firstId, secondId] = state.flippedCardIds;

			const firstCard = state.cards.find((card) => card.id === firstId);
			const secondCard = state.cards.find((card) => card.id === secondId);

			if (firstCard?.imgUrl === secondCard?.imgUrl) {
				state.foundCardIds.push(firstId, secondId);
			}

			state.flippedCardIds = [];
			state.isCheckRunning = false;
			state.countOfMoves += 1;
		},
	},
});

export const { resetGame, checkMatch, flipCard, preCheck } =
	memoryGameSlice.actions;
export const selectCards = (state: RootState) => state.memoryGame.cards;
export const selectIsGameRunning = (state: RootState) =>
	state.memoryGame.isGameRunning;
export const selectCountOfMoves = (state: RootState) =>
	state.memoryGame.countOfMoves;
export const selectFlippedCardIds = (state: RootState) =>
	state.memoryGame.flippedCardIds;

export const selectIsCardActive = (cardId: string) => (state: RootState) =>
	state.memoryGame.flippedCardIds.includes(cardId) ||
	state.memoryGame.foundCardIds.includes(cardId);

export const selectIsClickDisabled = (state: RootState) =>
	state.memoryGame.isCheckRunning;

export default memoryGameSlice.reducer;
