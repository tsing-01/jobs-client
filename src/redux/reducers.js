import {
    combineReducers
} from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'

import Cookies from 'js-cookie'



const initUser = {
    username: '', //username
    type: '', // user type applicant/employer
    msg: '', // error message warning
}

// produce state according to previous state and action
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            Cookies.set('userid', action.data._id, { expires: 7 })
            return {
                ...action.data
            }
        case ERROR_MSG:
            return {
                ...state, msg: action.data
            }
        case RECEIVE_USER:
            Cookies.set('userid', action.data._id, { expires: 7 })
            return action.data
        case RESET_USER:
            return {
                ...initUser, msg: action.data
            }
        default:
                return state
    }
}

const initUserList = []

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0,
}
// create reducer to manage chat related data
function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST: // data: {users, chatMsgs}
            const {
                users, chatMsgs, userid
            } = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0), 0)
            }
        case RECEIVE_MSG: // data: chatMsg
            const {
                chatMsg
            } = action.data
            return {
                users: state.users,
                    chatMsgs: [...state.chatMsgs, chatMsg],
                    unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            }
        case MSG_READ:
            const {
                from, to, count
            } = action.data
            return {
                users: state.users,
                    chatMsgs: state.chatMsgs.map(msg => {
                        if (msg.from === from && msg.to === to && !msg.read) {
                            return {
                                ...msg,
                                read: true
                            }
                        } else {
                            return msg
                        }
                    }),
                    unReadCount: state.unReadCount - count
            }
        default:
                return state
    }
}


export default combineReducers({
    user,
    userList,
    chat
})