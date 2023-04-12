import { Box, CardMedia, styled } from '@mui/material';
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
		<GameCard onClick={disabled ? undefined : () => handleFlip()}>
			<FlipperWrap isCardActive={isCardActive}>
				<Front>
					<CardImage image={'/default_front_card.webp'} />
				</Front>
				<Back>
					<CardImage image={item.imgUrl} />
				</Back>
			</FlipperWrap>
		</GameCard>
	);
};

const GameCard = styled(Box)(({ theme }) => ({
	width: 150,
	height: 150,
	margin: theme.spacing(2),
	perspective: '1000px',
	cursor: 'pointer',
}));

const FlipperWrap = styled(Box, {
	shouldForwardProp: (prop) =>
		prop !== 'lowerCase' && prop !== 'isCardActive',
})<{ isCardActive?: boolean }>(({ isCardActive }) => ({
	transition: '0.6s',
	transformStyle: 'preserve-3d',
	position: 'relative',
	...(isCardActive && { transform: 'rotateY(180deg)' }),
}));

const CardSideBase = styled(Box)({
	backfaceVisibility: 'hidden',
	position: 'absolute',
	top: 0,
	left: 0,
	width: 150,
	height: 150,
});

const Front = styled(CardSideBase)({
	zIndex: 2,
	transform: 'rotateY(0deg)',
});

const Back = styled(CardSideBase)({
	zIndex: 2,
	transform: 'rotateY(180deg)',
});

const CardImage = styled(CardMedia)(({ theme }) => ({
	height: '100%',
	borderRadius: theme.spacing(1.5),
}));
