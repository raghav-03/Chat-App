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
