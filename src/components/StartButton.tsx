import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './../store';
import { startGame } from './../store/slices/memory-game';

export const StartButton = () => {
	const dispatch = useDispatch<AppDispatch>();

	const handleStartGame = () => {
		dispatch(startGame({ cardCount: 10 }));
	};
	return <Button onClick={handleStartGame}>Start game</Button>;
};
