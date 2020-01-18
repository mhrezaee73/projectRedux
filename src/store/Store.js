import { createStore, combineReducers } from "redux";
import Reducer from "../redusers/Reducer";

const RootReducer = combineReducers({ Reducer });

const store = createStore(RootReducer);

export default store;
