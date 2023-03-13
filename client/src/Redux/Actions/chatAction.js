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
} from "../Constants/chatConstants";
import axios from "axios";

export const searchaction =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: SEARCH_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      let link = `/user/?search=${search}`;
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
    let link = `/chat`;
    const { data } = await axios.post(link, { userId }, config);

    dispatch({ type: CHAT_SUCCESS, payload: data.chat });
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
    let link = `/chat`;
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
    let link = `/chat/create-group`;
    const { data } = await axios.post(link, { name, users }, config);

    dispatch({ type: CREATE_GROUP_CHAT_SUCCESS, payload: data.allchats });
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
    let link = `/chat/getchat`;
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
    let link = `/chat/rename-group`;
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
    let link = `/chat/addtogroup`;
    const { data } = await axios.put(link, { chatId, userId }, config);
    dispatch({ type: ADDTO_GROUP_CHAT_SUCCESS, payload: data.chat });
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
    let link = `/chat/removefromgroup`;
    const { data } = await axios.put(link, { chatId, userId }, config);
    dispatch({ type: REMOVE_FROM_GROUP_CHAT_SUCCESS, payload: data.chat });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_GROUP_CHAT_FAIL,
      payload: error.response.data.message,
    });
  }
};
