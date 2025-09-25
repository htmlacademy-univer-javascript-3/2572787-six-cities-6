import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

const enum Settings {
  PlaceCardsNumber = 10
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placeCardsNumber={Settings.PlaceCardsNumber} />
  </React.StrictMode>,
);
