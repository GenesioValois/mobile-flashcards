import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

function configureStore() {
  return createStore(reducers, {}, applyMiddleware(thunk));
}

const store = configureStore();
export default store;
