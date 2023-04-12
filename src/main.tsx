import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeStateProvider } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeStateProvider>
			<App />
		</ThemeStateProvider>
	</React.StrictMode>,
);
