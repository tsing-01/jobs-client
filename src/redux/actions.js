// Include all action creator functions
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
  } from './action-types';
  
  import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
  } from '../api/index';
  
  // Import the client-side IO
  import io from 'socket.io-client';
  
  function initIO(dispatch, userid) {
    // Before creating the object: Check if the object already exists, only create it if it doesn't (singleton)
    if (!io.socket) {
      // Connect to the server and get the connection object
      io.socket = io('ws://localhost:4000'); // After creating the object, save the object
      // Bind a listener to receive messages sent by the server
      io.socket.on('receiveMsg', function (chatMsg) {
        console.log('Client receives a message sent by the server', chatMsg);
        // Only dispatch a synchronous action to save the message when chatMsg is related to the current user
        if (userid === chatMsg.from || userid === chatMsg.to) {
          dispatch(receiveMsg(chatMsg, userid));
        }
      });
    }
  }
  
  // Asynchronously get message list data
  async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid);
    const response = await reqChatMsgList();
    const result = response.data;
    if (result.code === 0) {
      const { users, chatMsgs } = result.data;
      // Dispatch a synchronous action
      dispatch(receiveMsgList({ users, chatMsgs, userid }));
    }
  }
  
  // Asynchronous action to send a message
  export const sendMsg = ({ from, to, content }) => {
    return (dispatch) => {
      console.log('Sending a message', { from, to, content });
      // Send a message
      io.socket.emit('sendMsg', { from, to, content });
    };
  };
  
  // Asynchronous action to read a message
  export const readMsg = (from, to) => {
    return async (dispatch) => {
      const response = await reqReadMsg(from);
      const result = response.data;
      if (result.code === 0) {
        const count = result.data;
        // Dispatch a synchronous action
        dispatch(msgRead({ count, from, to }));
      }
    };
  };
  
  // One action type corresponds to one synchronous action
  // Synchronous action for successful authorization
  const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
  // Synchronous action for error message
  const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
  // Synchronous action to receive user
  const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
  // Synchronous action to reset user
  export const resetUser = (msg) => ({ type: RESET_USER, data: msg }); // Used in logout, so expose externally
  // Synchronous action to receive user list
  const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList });
  // Synchronous action to receive message list
  const receiveMsgList = ({ users, chatMsgs, userid }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid } });
  // Synchronous action to receive a message
  const receiveMsg = (chatMsg, userid) => ({ type: RECEIVE_MSG, data: { chatMsg, userid } }); // Parameters are not objects here to illustrate that it can also be done this way
  // Synchronous action for reading a specific chat message
  const msgRead = ({ count, from, to }) => ({ type: MSG_READ, data: { count, from, to } });
  
  // Asynchronous action for user registration
  export const register = (user) => {
    const { username, password, password2, type } = user;
    // Front-end validation of the form, if not passed, dispatch an errorMsg synchronous action
    if (!username) {
      return errorMsg('Username must be specified!');
    } else if (password !== password2) {
      return errorMsg('Passwords must match!');
    }
  
    return async (dispatch) => {
      // Send an asynchronous AJAX request for registration
      const response = await reqRegister(user);
      const result = response.data;
  
      if (result.code === 0) {
        // Registration successful
        // After successful registration, get user chat data
        getMsgList(dispatch, result.data._id);
        // Dispatch a successful synchronous action, i.e., the authSuccess synchronous action
        dispatch(authSuccess(result.data));
      } else {
        // Registration failed
        // Dispatch a failed synchronous action, i.e., the errorMsg synchronous action
        dispatch(errorMsg(result.msg));
      }
    };
  };
  
  // Asynchronous action for user login
  export const login = (user) => {
    const { username, password } = user;
    // Front-end validation of the form, if not passed, dispatch an errorMsg synchronous action
    if (!username) {
      return errorMsg('Username must be specified!');
    } else if (!password) {
      return errorMsg('Password must be specified!');
    }
  
    return async (dispatch) => {
      const response = await reqLogin(user);
      const result = response.data;
      if (result.code === 0) {
        // Login successful
        // After successful login, get user chat data
        getMsgList(dispatch, result.data._id);
        // Dispatch a successful synchronous action, i.e., the authSuccess synchronous action
        dispatch(authSuccess(result.data));
      } else {
        // Login failed
        // Dispatch a failed synchronous action, i.e., the errorMsg synchronous action
        dispatch(errorMsg(result.msg));
      }
    };
  };
  
  // Asynchronous action for updating user information
  export const updateUser = (user) => {
    return async (dispatch) => {
      const response = await reqUpdateUser(user);
      const result = response.data;
      if (result.code === 0) {
        // Update successful
        // Dispatch a synchronous action
        dispatch(receiveUser(result.data));
      } else {
        // Update failed
        dispatch(resetUser(result.msg));
      }
    };
  };
  
  // Asynchronous action to get user information
  export const getUser = () => {
    return async (dispatch) => {
      // Execute an asynchronous AJAX request
      const response = await reqUser();
      const result = response.data;
      if (result.code === 0) {
        // Successful
        // Get user chat data
        getMsgList(dispatch, result.data._id);
        dispatch(receiveUser(result.data));
      } else {
        // Failed
        dispatch(resetUser(result.msg));
      }
    };
  };
  
  // Asynchronous action to get user list (applicants and employers)
  export const getUserList = (type) => {
    return async (dispatch) => {
      // Execute an asynchronous AJAX request
      const response = await reqUserList(type);
      const result = response.data;
      if (result.code === 0) {
        dispatch(receiveUserList(result.data));
      }
    };
  };
  