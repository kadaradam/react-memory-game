import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardItem } from '../components/CardItem';
import { AppDispatch } from '../store';
import {
	checkMatch,
	preCheck,
	selectCards,
	selectFlippedCardIds,
} from '../store/slices/memory-game';

export const CardList = () => {
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
		<Box
			display="flex"
			flexDirection="row"
			flexWrap="wrap"
			justifyContent="center"
		>
			{gameCards.map((card) => (
				<CardItem key={card.id} item={card} />
			))}
		</Box>
	);
};

export default CardList;
