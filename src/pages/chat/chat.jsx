import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'
import { emojiList } from '../../utils/emoj'

import { sendMsg, readMsg } from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    state = {
        content: '',
        isShow: false,// is show emoji list
    }
    // first time render
    componentWillMount() {
        this.emojis = emojiList.map(emoji => ({ text: emoji }))
        const { users } = this.props.chat

        // get target header icon
        const targetId = this.props.match.params.userid
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader && require(`../../assets/images/${targetHeader}.png`);
        this.setState({
            targetIcon,
            targetId
        })
    }
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate() {
        // update the list
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount() {
        // unread msg to read msg
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }

    // toggle emoji list
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({ isShow })
        if (isShow) {
            // async dispatch resize event, to fix the bug of emoji list
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        // send msg
        if (content) {
            this.props.sendMsg({ from, to, content })
        }
        // clear input
        this.setState({
            content: '',
            isShow: false,
        })
    }

    render() {
        const { user } = this.props
        const {users, chatMsgs} = this.props.chat
        const { targetIcon, content, isShow, targetId } = this.state;
        const meId = user._id
        if (!users[meId]) { // not show until users have been loaded
            return null
        }
        
         // calculate chatId
         
         const chatId = [meId, targetId].sort().join('_')
 
         // filter the chatMsgs
         const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left' />}
                    className="sticky-header"
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{ marginTop: 50, marginBottom: 50 }}>
                    {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
                    <QueueAnim type='alpha' delay={100}>
                        {
                            msgs.map(msg => {
                                if (meId === msg.to) { // send by target
                                    return (
                                        <Item key={msg._id} thumb={targetIcon} >
                                            {msg.content}
                                        </Item>
                                    )
                                }
                                else { // send by me
                                    return (
                                        <Item key={msg._id} className='chat-me' extra='me'>
                                            {msg.content}
                                        </Item>
                                    )

                                }
                            })
                        }
                    </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder='Please input'
                        value={content}
                        onChange={val => this.setState({ content: val })}
                        onFocus={() => this.setState({ isShow: false })}
                        extra={
                            <span style={{display: 'flex', alignItems: 'center'}}>
                                <span onClick={this.toggleShow} style={{ marginRight: 5 }}><span role='img' aria-label="emoj">😃</span></span>
                                <span onClick={this.handleSend}>Send</span>
                            </span>
                        }
                    />
                    {isShow ?
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({
                                    content: content + item.text
                                })
                            }}
                        />
                        : null}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg, readMsg }
)(Chat)