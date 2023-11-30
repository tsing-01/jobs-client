// all apis

import ajax from './ajax'

// register interface
export const reqRegister=(user)=>ajax('/register',user,'POST') // it can be transfer to http://localhost:4000 in package.json
// login interface
export const reqLogin=({username,password})=>ajax('/login',{username,password},'POST')
// update user interface
export const reqUpdateUser=(user)=>ajax('/update',user,'POST')
// get user interface
export const reqUser = () => ajax('/user')
// get user list interface
export const reqUserList = (type) => ajax('/userlist',{type})
// get current user's chat msg list
export const reqChatMsgList = () => ajax('/msglist')
// mark read
export const reqReadMsg = (from) => ajax('/readmsg',{from}, 'POST')
