import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectDeckSize, setDeckSize } from '../store/slices/memory-game';

const DECK_SIZES = [5, 10, 15, 20];

export const DeckSizeSelect = () => {
	const dispatch = useDispatch<AppDispatch>();
	const deckSize = useSelector(selectDeckSize);

	const handleChange = (event: SelectChangeEvent) => {
		const value = parseInt(event.target.value);

		dispatch(setDeckSize(value));
	};

	return (
		<Box sx={{ minWidth: 90 }}>
			<FormControl fullWidth>
				<InputLabel id="select-deck-size-label">Deck size</InputLabel>
				<Select
					labelId="select-deck-size-label"
					value={deckSize.toString()}
					label="Deck size"
					onChange={handleChange}
					size="small"
				>
					{DECK_SIZES.map((size) => (
						<MenuItem key={size} value={size.toString()}>
							{size}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};
