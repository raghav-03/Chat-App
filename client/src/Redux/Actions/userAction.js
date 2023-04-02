import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERROR,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOAD_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../Constants/userConstants";
import axios from "axios";

export const loginaction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/user/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const registeraction =
  (name, email, password, avatar, confirmpassword) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/user/signup`,
        { name, email, password, avatar, confirmpassword },
        config
      );

      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearerr = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};

export const logoutaction = () => async (dispatch) => {
  try {
    await axios.get(`/api/user/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.payload.data.message,
    });
  }
};
export const loadcredentials = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });

    const { data } = await axios.get(`/api/user/userdetail`);
    dispatch({ type: LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
      payload: error.response.data.message,
    });
  }
};
