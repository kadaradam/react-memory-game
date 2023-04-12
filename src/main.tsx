import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store';
import { ThemeStateProvider } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeStateProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeStateProvider>
	</React.StrictMode>,
);
