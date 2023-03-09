import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  CLEAR_ERROR,
  CHAT_REQUEST,
  CHAT_SUCCESS,
  CHAT_FAIL,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAIL,
} from "../Constants/chatConstants";
export const SearchReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        searchloading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchloading: false,
        users: action.payload,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        searchloading: false,
        users: [],
        searcherror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        searcherror: null,
      };
    default:
      return state;
  }
};
export const accessChatReducer = (state = { chat: {} }, action) => {
  switch (action.type) {
    case CHAT_REQUEST:
      return {
        chatloading: true,
      };
    case CHAT_SUCCESS:
      return {
        ...state,
        chatloading: false,
        chat: action.payload,
      };
    case CHAT_FAIL:
      return {
        ...state,
        chatloading: false,
        chat: {},
        chaterror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        chaterror: null,
      };
    default:
      return state;
  }
};
export const allChatReducer = (state = { chats: [] }, action) => {
  switch (action.type) {
    case FETCH_CHAT_REQUEST:
      return {
        allchatloading: true,
      };
    case FETCH_CHAT_SUCCESS:
      return {
        ...state,
        allchatloading: false,
        chats: action.payload,
      };
    case FETCH_CHAT_FAIL:
      return {
        ...state,
        allchatloading: false,
        chats: [],
        allchaterror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        allchaterror: null,
      };
    default:
      return state;
  }
};
