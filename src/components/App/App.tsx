import MainPage from '../../pages/MainPage/MainPage';

type AppProps = {
  placeCardsNumber: number;
}

function App({ placeCardsNumber }: AppProps): JSX.Element {
  return <MainPage placeCardsNumber={placeCardsNumber} />;
}

export default App;
