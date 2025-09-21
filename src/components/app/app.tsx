import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  placeCardsNumber: number;
}

function App({ placeCardsNumber }: AppProps): JSX.Element {
  return <MainPage placeCardsNumber={placeCardsNumber} />;
}

export default App;
