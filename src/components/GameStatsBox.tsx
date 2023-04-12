import { Box, Grid, Typography, colors, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import {
	selectCountOfMatchedPairs,
	selectCountOfMoves,
	selectCountOfPairs,
} from '../store/slices/memory-game';

export const GameStatsBox = () => {
	const countOfMoves = useSelector(selectCountOfMoves);
	const countOfMatchedPairs = useSelector(selectCountOfMatchedPairs);
	const countOfPairs = useSelector(selectCountOfPairs);

	return (
		<Box py={2}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<StatBox>
						<Typography variant="body1" fontWeight="bold">
							Moves
						</Typography>
						<Typography variant="h6">{countOfMoves}</Typography>
					</StatBox>
				</Grid>
				<Grid item xs={6}>
					<StatBox>
						<Typography variant="body1">Pairs matched:</Typography>
						<Typography variant="h6">
							{countOfMatchedPairs} / {countOfPairs}
						</Typography>
					</StatBox>
				</Grid>
			</Grid>
		</Box>
	);
};

const StatBox = styled(Box)(({ theme }) => ({
	backgroundColor: colors.blueGrey[800],
	borderRadius: 8,
	padding: theme.spacing(1),
}));
