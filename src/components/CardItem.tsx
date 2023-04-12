import { Card, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import {
	flipCard,
	selectIsCardActive,
	selectIsClickDisabled,
} from '../store/slices/memory-game';
import { CardType } from '../types';

type CardItemProps = {
	item: CardType;
};

export const CardItem = ({ item }: CardItemProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const isCardActive = useSelector(selectIsCardActive(item.id));
	const disabled = useSelector(selectIsClickDisabled);

	const handleFlip = () => {
		dispatch(flipCard(item.id));
	};

	return (
		<Card
			sx={{ width: 150, height: 150, m: 2, backgroundColor: 'blue' }}
			onClick={disabled ? undefined : () => handleFlip()}
		>
			{isCardActive ? (
				<CardMedia sx={{ height: '100%' }} image={item.imgUrl} />
			) : null}
		</Card>
	);
};
