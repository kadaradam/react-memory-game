import { Options } from 'canvas-confetti';
import { useCallback, useEffect, useRef } from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';

// Source: https://nextjs-notion-blog-starter.vercel.app/blog/how-to-make-confetti-with-react-in-5-minutes
export function Confetti() {
	const refAnimationInstance = useRef<confetti.CreateTypes | null>(null);

	const getInstance = useCallback((instance: confetti.CreateTypes) => {
		refAnimationInstance.current = instance;
	}, []);

	const makeShot = useCallback((particleRatio: number, opts: Options) => {
		refAnimationInstance.current &&
			refAnimationInstance.current({
				...opts,
				origin: { y: 0.7 },
				particleCount: Math.floor(200 * particleRatio),
			});
	}, []);

	useEffect(() => fire(), []);

	const fire = useCallback(() => {
		makeShot(0.25, {
			spread: 26,
			startVelocity: 55,
		});

		makeShot(0.2, {
			spread: 60,
		});

		makeShot(0.35, {
			spread: 100,
			decay: 0.91,
			scalar: 0.8,
		});

		makeShot(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2,
		});

		makeShot(0.1, {
			spread: 120,
			startVelocity: 45,
		});
	}, [makeShot]);

	return (
		<ReactCanvasConfetti
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			refConfetti={getInstance}
			style={{
				position: 'fixed',
				pointerEvents: 'none',
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
			}}
		/>
	);
}
