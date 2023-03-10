import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./Reducers/userReducer";
import {
  SearchReducer,
  accessChatReducer,
  allChatReducer,
  GroupChatReducer,
  GetChatReducer,
  RenameGroupReducer,
  AddToGroupReducer,
  RemoveFromGroupReducer,
} from "./Reducers/chatReducer";
const reducer = combineReducers({
  user: userReducer,
  searchusers: SearchReducer,
  accesschat: accessChatReducer,
  allChatReducer: allChatReducer,
  groupchatReducer: GroupChatReducer,
  GetChatReducer: GetChatReducer,
  RenameGroupReducer: RenameGroupReducer,
  AddToGroupReducer: AddToGroupReducer,
  RemoveFromGroupReducer: RemoveFromGroupReducer,
});

let initialstate = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
