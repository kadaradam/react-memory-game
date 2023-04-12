import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';

import {
	resetGame,
	selectIsGameRunning,
	startGame,
} from '../store/slices/memory-game';
import { DeckSizeSelect } from './DeckSizeSelect';

export const GameActionButtons = () => {
	const isGameRunning = useSelector(selectIsGameRunning);
	const dispatch = useDispatch<AppDispatch>();

	const handleStartGame = () => {
		dispatch(startGame());
	};

	const handleResetGame = () => {
		dispatch(resetGame());
	};

	return (
		<Box display="flex">
			<Button
				onClick={handleStartGame}
				variant="contained"
				sx={{ mr: 2 }}
				disabled={isGameRunning}
				startIcon={<PlayCircleFilledWhiteIcon />}
			>
				Start game
			</Button>
			<Button
				onClick={handleResetGame}
				variant="outlined"
				disabled={!isGameRunning}
				startIcon={<RestartAltIcon />}
			>
				Reset game
			</Button>
			<Box flexGrow={1} />
			<DeckSizeSelect />
		</Box>
	);
};
