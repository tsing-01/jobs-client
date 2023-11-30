// message list page
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief


function getLastMsgs(chatMsgs,userid) {
    //1、 find every chat's last msg and save in lastMsgObjs
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        // analyze msg
        if(msg.to===userid && !msg.read){
            msg.unReadCount = 1
        }else{
            msg.unReadCount = 0
        }


        // get chatId
        const chatId = msg.chat_id
        // get lastMsg
        let lastMsg = lastMsgObjs[chatId]
        if(!lastMsg) { 
            lastMsgObjs[chatId] = msg
        }else { 
            // sum up unReadCount
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            // save in lastMsg if msg is later than lastMsg
            if(msg.create_time > lastMsg.create_time){
                lastMsgObjs[chatId] = msg
            }
            // save unReadCount in lastMsg
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    })
    // 2、get lastMsgs array
    const lastMsgs = Object.values(lastMsgObjs)
    // 3、sort lastMsgs by create_time
    lastMsgs.sort(function (m1,m2) { 
        // if result < 0, m1 before m2
        return m2.create_time - m1.create_time
        
    })
    console.log(lastMsgs)
    return lastMsgs
}

class Message extends Component {
    render () {
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat

        // group chatMsgs by chat_id
        const lastMsgs = getLastMsgs(chatMsgs,user._id)

        return (
            <List style={{marginTop: 50,marginBottom: 50}}>
                {
                    lastMsgs.map(msg=>{
                        // get target id
                        const targetUserId = msg.to===user._id?msg.from:msg.to
                        // get user info（avatar，username）
                        const targetUser = users[targetUserId]
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount} />}
                                thumb={targetUser.header? require(`../../assets/images/${targetUser.header}.png`) : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                            {msg.content}
                            <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}
export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)