import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import Layout from "./components/Layout";

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Layout />
      </PaperProvider>
    </StoreProvider>
  );
}
