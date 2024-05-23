"use client";
import { Provider } from 'react-redux';
import store from '../lib/redux/stateVariables';
import Home from './mainPage'

export default function Page() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
