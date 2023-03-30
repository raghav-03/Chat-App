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
  GETMessageReducer,
  SendMessageReducer,
  NotificationReducer,
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
  GETMessageReducer: GETMessageReducer,
  SendMessageReducer: SendMessageReducer,
  NotificationReducer: NotificationReducer,
});

let initialstate = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
