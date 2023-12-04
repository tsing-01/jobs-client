// all apis

import ajax from './ajax'

// register interface
export const reqRegister=(user)=>ajax('/register',user,'POST') 
// login interface
export const reqLogin=({username,password})=>ajax('/login',{username,password},'POST')
// update user interface
export const reqUpdateUser=(user)=>ajax('/user/update',user,'POST')
// get user interface
export const reqUser = () => ajax('/user/info')
// get user list interface
export const reqUserList = (type) => ajax('/user/list',{type})
// get current user's chat msg list
export const reqChatMsgList = () => ajax('/chat/messages')
// mark read
export const reqReadMsg = (from) => ajax('/chat/isread',{from}, 'POST')
