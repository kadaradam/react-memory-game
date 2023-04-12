import {
	Box,
	Container,
	Divider,
	Paper,
	Typography,
	styled,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardList } from './components/CardList';
import { GameActionButtons } from './components/GameActionButtons';
import { GameStatsBox } from './components/GameStatsBox';
import { AppDispatch } from './store';
import {
	checkMatch,
	preCheck,
	selectFlippedCardIds,
} from './store/slices/memory-game';

function App() {
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
			<Box display="flex" justifyContent="center">
				<GamePaper elevation={3}>
					<Typography variant="h5">Memory game</Typography>
					<Divider sx={{ my: 2 }} />
					<GameActionButtons />
					<GameStatsBox />
					<CardList />
				</GamePaper>
			</Box>
		</Container>
	);
}

export default App;

const GamePaper = styled(Paper)(({ theme }) => ({
	maxWidth: 800,
	width: '100%',
	marginTop: theme.spacing(6),
	padding: theme.spacing(4),
}));
