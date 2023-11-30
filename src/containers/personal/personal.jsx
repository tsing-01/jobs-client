// personally information page
import React, {Component} from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief =Item.Brief


class Personal extends Component {

    // logout
    logout = () => {
        Modal.alert('exit','Are you going to logout?',[
            {text:'cancel',onPress: ()=>{ console.log('cancel logout') }}, 
            {
                text: 'confirm',
                onPress: () => {
                    // dedete cookie
                    Cookies.remove('userid')
                    // delete redux user
                    this.props.resetUser()
                    // jump to login
                    // rerender main page.
                }
            }
        ])
    }

    render () {
        const {username, info, header, company, post, salary} = this.props.user
        return (
            <div style={{marginBottom:50,marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header" />}
                    title={username}
                    message={company}
                />
                <List renderHeader={()=> 'relative info'} >
                    <Item multipleLine>
                        <Brief>Position: {post}</Brief>
                        <Brief>Description:{info}</Brief>
                        {salary? <Brief>Salary: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='warning' onClick={this.logout} >Log out</Button>
                </List>
                

            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)