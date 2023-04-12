import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectIsGameWon, startGame } from '../store/slices/memory-game';
import { Confetti } from './Confetti';

const YouWonDialog = () => {
	const [open, setOpen] = useState<boolean>(false);
	const isGameWon = useSelector(selectIsGameWon);
	const dispatch = useDispatch<AppDispatch>();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleStartGame = () => {
		dispatch(startGame());
		handleClose();
	};

	useEffect(() => {
		if (isGameWon) {
			handleOpen();
		}
	}, [isGameWon]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="game-finished-dialog-title"
			aria-describedby="game-finished-dialog-description"
		>
			<DialogTitle id="game-finished-dialog-title">
				You won the game! 🎉
			</DialogTitle>
			<DialogContent>
				<Confetti />
				<DialogContentText id="game-finished-dialog-description">
					Thanks for playing! Would you like to start a new game?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleStartGame} variant="contained" autoFocus>
					Start new game
				</Button>
				<Button onClick={handleClose} variant="outlined">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default YouWonDialog;
