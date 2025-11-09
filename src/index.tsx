import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import places from './mocks/places';
import reviews from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App places={places} reviews={reviews} />
  </React.StrictMode>,
);
