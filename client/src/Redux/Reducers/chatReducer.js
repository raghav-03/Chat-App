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
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  GET_CHAT_FAIL,
  GET_CHAT_RESET,
  RENAME_GROUP_CHAT_REQUEST,
  RENAME_GROUP_CHAT_SUCCESS,
  RENAME_GROUP_CHAT_FAIL,
  ADDTO_GROUP_CHAT_FAIL,
  ADDTO_GROUP_CHAT_REQUEST,
  ADDTO_GROUP_CHAT_SUCCESS,
  REMOVE_FROM_GROUP_CHAT_FAIL,
  REMOVE_FROM_GROUP_CHAT_REQUEST,
  REMOVE_FROM_GROUP_CHAT_SUCCESS,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAIL,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SET_MESSAGE_LOADING,
  SEND_MESSAGE_RESET,
  SET_NOTIFICATION,
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
    case "CLEAR_SEARCH":
      return {
        ...state,
        users: [],
        resetusers: true,
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
export const GroupChatReducer = (state = { groupchat: {} }, action) => {
  switch (action.type) {
    case CREATE_GROUP_CHAT_REQUEST:
      return {
        groupchatloading: true,
      };
    case CREATE_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        groupchatloading: false,
        groupchat: action.payload,
      };
    case CREATE_GROUP_CHAT_FAIL:
      return {
        ...state,
        groupchatloading: false,
        groupchat: {},
        groupchaterror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        groupchaterror: null,
      };
    default:
      return state;
  }
};

export const GetChatReducer = (state = { chat: {} }, action) => {
  switch (action.type) {
    case GET_CHAT_REQUEST:
      return {
        ...state,
        getchatloading: true,
        getchaterror: null,
      };
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        getchatloading: false,
        chat: action.payload,
      };
    case GET_CHAT_FAIL:
      return {
        ...state,
        getchatloading: false,
        chat: {},
        getchaterror: action.payload,
      };
    case GET_CHAT_RESET:
      return {
        getchatloading: false,
        chat: {},
      };
    case CLEAR_ERROR:
      return {
        ...state,
        getchaterror: null,
      };
    default:
      return state;
  }
};

export const RenameGroupReducer = (state = { chat: {} }, action) => {
  switch (action.type) {
    case RENAME_GROUP_CHAT_REQUEST:
      return {
        renamegroupchatloading: true,
      };
    case RENAME_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        renamegroupchatloading: false,
        chat: action.payload,
      };
    case RENAME_GROUP_CHAT_FAIL:
      return {
        ...state,
        renamegroupchatloading: false,
        chat: {},
        renamegroupchaterror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        renamegroupchaterror: null,
      };
    default:
      return state;
  }
};

export const AddToGroupReducer = (state = { chat: {} }, action) => {
  switch (action.type) {
    case ADDTO_GROUP_CHAT_REQUEST:
      return {
        addtogroupchatloading: true,
      };
    case ADDTO_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        addtogroupchatloading: false,
        chat: action.payload,
      };
    case ADDTO_GROUP_CHAT_FAIL:
      return {
        ...state,
        addtogroupchatloading: false,
        chat: {},
        addtogroupchaterror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        addtogroupchaterror: null,
      };
    default:
      return state;
  }
};

export const RemoveFromGroupReducer = (state = { chat: {} }, action) => {
  switch (action.type) {
    case REMOVE_FROM_GROUP_CHAT_REQUEST:
      return {
        removefromgroupchatloading: true,
      };
    case REMOVE_FROM_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        removefromgroupchatloading: false,
        chat: action.payload,
      };
    case REMOVE_FROM_GROUP_CHAT_FAIL:
      return {
        ...state,
        removefromgroupchatloading: false,
        chat: {},
        removefromgroupchaterror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        removefromgroupchaterror: null,
      };
    default:
      return state;
  }
};

export const SendMessageReducer = (state = { newchat: {} }, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        sendmessageloading: true,
        sendmessagesuccess: false,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        newchat: action.payload,
        sendmessagesuccess: true,
        sendmessageloading: false,
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        sendmessageloading: false,
        sendmessagesuccess: false,
        sendmessageerror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        sendmessageerror: null,
        sendmessagesuccess: false,
      };
    case SEND_MESSAGE_RESET:
      return {
        ...state,
        sendmessagesuccess: false,
      };

    default:
      return state;
  }
};

export const GETMessageReducer = (state = { message: [] }, action) => {
  switch (action.type) {
    case GET_MESSAGE_REQUEST:
      return {
        ...state,
        getmessageloading: true,
      };
    case SET_MESSAGE_LOADING:
      return {
        messageloading: true,
      };
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        getmessageloading: false,
        message: action.payload,
        messageloading: false,
      };
    case GET_MESSAGE_FAIL:
      return {
        ...state,
        getmessageloading: false,
        message: [],
        getmessageerror: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        getmessageerror: null,
      };
    default:
      return state;
  }
};

export const NotificationReducer = (state = { notification: [] }, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        notification: action.payload,
      };
    default:
      return state;
  }
};
