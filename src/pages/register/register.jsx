import React, { Component } from 'react'

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'



import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'employer',// employer or applicant
    }
    register = () => {
        this.props.register(this.state);

    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    toLogin = () => {
        this.props.history.replace('/login')

    }

    render() {
        const { type } = this.state
        const { msg, redirectTo } = this.props.user

        if (redirectTo) {
            return <Redirect to={redirectTo} />
        }


        return (
            <div>
                <NavBar>Silicon Valley Direct Recruitment</NavBar>
                <Logo />
                <WingBlank style={{marginTop: '-20px'}}>
                    <List>
                        {msg ? <div className='error-msg' style={{paddingTop: '10px'}}>{msg}</div> : null} {/* Display error message here */}
                        <WhiteSpace />
                        {/* Top and bottom margin */}
                        <InputItem placeholder='Enter your username' onChange={val => { this.handleChange('username', val) }}>Username:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='Enter your password' type="password" onChange={val => { this.handleChange('password', val) }}>Password:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder='Confirm your password' type="password" onChange={val => { this.handleChange('password2', val) }}>Check Pwd:</InputItem>
                        <ListItem>
                            <span>User Type:</span>
                            <Radio style={{marginLeft: '20px'}} checked={type === 'applicant'} onChange={() => this.handleChange('type', 'applicant')}>Applicant</Radio>
                            <Radio style={{marginLeft: '30px'}} checked={type === 'employer'} onChange={() => this.handleChange('type', 'employer')}>Employer</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>Register</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>Already have an account</Button>
                    </List>
                </WingBlank>

            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { register }
)(Register)