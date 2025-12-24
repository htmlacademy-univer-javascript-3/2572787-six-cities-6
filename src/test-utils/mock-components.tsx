import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/HistoryRouter/HistoryRouter';
import { State } from '../types/state';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { AppThunkDispatch } from './mocks';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

export function withHistory(
  component: JSX.Element,
  history: MemoryHistory,
): JSX.Element {
  const mockHistory = history ?? createMemoryHistory();
  return <HistoryRouter history={mockHistory}>{component}</HistoryRouter>;
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<State>,
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockAxiosAdapter,
    mockStore,
  };
}
