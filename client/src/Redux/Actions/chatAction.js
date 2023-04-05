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
  RENAME_GROUP_CHAT_REQUEST,
  RENAME_GROUP_CHAT_SUCCESS,
  RENAME_GROUP_CHAT_FAIL,
  ADDTO_GROUP_CHAT_FAIL,
  ADDTO_GROUP_CHAT_REQUEST,
  ADDTO_GROUP_CHAT_SUCCESS,
  REMOVE_FROM_GROUP_CHAT_REQUEST,
  REMOVE_FROM_GROUP_CHAT_SUCCESS,
  REMOVE_FROM_GROUP_CHAT_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAIL,
  // GET_CHAT_RESET,
} from "../Constants/chatConstants";
import axios from "axios";
import { socket } from "../../Services/Socket";
export const searchaction =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: SEARCH_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      let link = `/api/user/?search=${search}`;
      const { data } = await axios.get(link, config);

      dispatch({ type: SEARCH_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({
        type: SEARCH_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearerr = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};

export const accessChat = (userId) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/chat`;
    const { data } = await axios.post(link, { userId }, config);
    dispatch({ type: CHAT_SUCCESS, payload: data.chat });
    dispatch(getchatbyid(data.chat._id));
    dispatch({ type: "CLEAR_SEARCH" });
  } catch (error) {
    dispatch({
      type: CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const fetchChat = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/chat`;
    const { data } = await axios.get(link, config);

    dispatch({ type: FETCH_CHAT_SUCCESS, payload: data.allchats });
  } catch (error) {
    dispatch({
      type: FETCH_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const fetchChatwloading = () => async (dispatch) => {
  try {
    // dispatch({ type: FETCH_CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/chat`;
    const { data } = await axios.get(link, config);

    dispatch({ type: FETCH_CHAT_SUCCESS, payload: data.allchats });
  } catch (error) {
    dispatch({
      type: FETCH_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const CreateGroupchat = (name, users) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_GROUP_CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/chat/create-group`;
    const { data } = await axios.post(link, { name, users }, config);
    dispatch({ type: CREATE_GROUP_CHAT_SUCCESS, payload: data.chat });
    socket.emit("refresh", data.chat);
    dispatch(getchatbyid(data.chat._id));
    dispatch({ type: "CLEAR_SEARCH" });
  } catch (error) {
    dispatch({
      type: CREATE_GROUP_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getchatbyid = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/chat/getchat`;
    const { data } = await axios.post(link, { chatId }, config);
    dispatch({ type: GET_CHAT_SUCCESS, payload: data.chat });
  } catch (error) {
    dispatch({
      type: GET_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const renamegroupchat = (chatId, name) => async (dispatch) => {
  try {
    dispatch({ type: RENAME_GROUP_CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/chat/rename-group`;
    const { data } = await axios.put(link, { chatId, name }, config);
    dispatch({ type: RENAME_GROUP_CHAT_SUCCESS, payload: data.chat });
  } catch (error) {
    dispatch({
      type: RENAME_GROUP_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addtogroupchat = (chatId, userId) => async (dispatch) => {
  try {
    dispatch({ type: ADDTO_GROUP_CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/chat/addtogroup`;
    const { data } = await axios.put(link, { chatId, userId }, config);
    dispatch({ type: ADDTO_GROUP_CHAT_SUCCESS, payload: data.chat });
    socket.emit("refresh", data.chat);
    dispatch(getchatbyid(data.chat._id));
    dispatch({ type: "CLEAR_SEARCH" });
  } catch (error) {
    dispatch({
      type: ADDTO_GROUP_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const removefromgroupchat = (chatId, userId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_GROUP_CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/chat/removefromgroup`;
    const { data } = await axios.put(link, { chatId, userId }, config);
    dispatch({ type: REMOVE_FROM_GROUP_CHAT_SUCCESS, payload: data.chat });
    socket.emit("refresh", data.chat);
    dispatch(getchatbyid(data.chat._id));
    dispatch({ type: "CLEAR_SEARCH" });
    // dispatch({ type: GET_CHAT_RESET });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_GROUP_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sendmessage = (chatId, content) => async (dispatch) => {
  try {
    dispatch({ type: SEND_MESSAGE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/message`;
    const { data } = await axios.post(link, { chatId, content }, config);
    dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data.data });
    // socket.emit("new message", data.data);
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getmessage = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: GET_MESSAGE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    let link = `/api/message/${chatId}`;
    const { data } = await axios.get(link, config);
    dispatch({ type: GET_MESSAGE_SUCCESS, payload: data.messages });
  } catch (error) {
    dispatch({
      type: GET_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
