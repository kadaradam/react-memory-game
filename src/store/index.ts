import { configureStore } from '@reduxjs/toolkit';
import memoryGameReducer from './slices/memory-game';

export const store = configureStore({
	reducer: {
		memoryGame: memoryGameReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
