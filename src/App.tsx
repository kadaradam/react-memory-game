import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from './components/CardList';
import { StartButton } from './components/StartButton';
import { AppDispatch } from './store';
import {
	checkMatch,
	preCheck,
	selectCards,
	selectCountOfMoves,
	selectFlippedCardIds,
} from './store/slices/memory-game';

function App() {
	const countOfMoves = useSelector(selectCountOfMoves);
	const gameCards = useSelector(selectCards);
	const flippedCardIds = useSelector(selectFlippedCardIds);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		let timerId = -1;

		if (flippedCardIds.length >= 2) {
			dispatch(preCheck());

			timerId = setTimeout(() => {
				dispatch(checkMatch());
			}, 600);
		}

		() => {
			clearTimeout(timerId);
		};
	}, [dispatch, flippedCardIds.length]);

	return (
		<Container component="main">
			<Box>
				<Typography variant="body1">Moves: {countOfMoves}</Typography>
			</Box>
			<StartButton />
			<CardList />
		</Container>
	);
}

export default App;
