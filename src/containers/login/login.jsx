// login route component
//register route component
import React,{Component} from 'react'

// Introducing components from antd-mobile on demand
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'



import Logo from '../../components/logo/logo'


// const ListItem=List.Item

class Login extends Component {
    state={
        username:'',
        password:'',
        
    }
    // login
    login=()=>{
        console.log(this.state);
        this.props.login(this.state)
    }
    handleChange=(name,val)=>{
        this.setState({
            [name]:val // attribute name is not name, but the value of name
        })
    }
    // go to register
    toRegister=()=>{
        this.props.history.replace('/register') 
        
    }

    render () {

        const {msg,redirectTo} =this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }


        return(
            <div>
                <NavBar>Silicon Valley Direct Recruitment</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className="error-msg">{msg}</div> : null}
                        <WhiteSpace/>
                        {/* Top and bottom margin */}
                        <InputItem placeholder='Enter your username' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='Enter your password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.login}>Login</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>Don't have an account yet</Button>
                    </List>
                </WingBlank>

            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {login}
)(Login)