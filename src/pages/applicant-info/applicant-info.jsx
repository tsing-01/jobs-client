// Applicant main page
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import { updateUser } from '../../redux/actions'

class ApplicantInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',

    }
    // update header state
    setHeader = (header) => {
        this.setState({
            header
        })
    }


    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    save = () => {
        this.props.updateUser(this.state)
        // jump to main page
        this.props.history.push('/' + this.props.user.type)
    }

    initData = (user) => {
        this.setState({
            header: user.header,
            post: user.post,
            info: user.info
        })
    }

    componentWillMount() {
        this.initData(this.props.user)
    }

    render() {
        return (
            <div>
                <NavBar>Profile Information Update</NavBar>
                <HeaderSelector icon={require(`../../assets/images/${this.state.header}.png`)} setHeader={this.setHeader} />
                <InputItem value={this.state.post} placeholder="Enter desired job position" onChange={val => { this.handleChange('post', val) }}>J Position:</InputItem>
                <TextareaItem value={this.state.info} title="Intro:" rows={3} onChange={val => { this.handleChange('info', val) }} />
                <Button type="primary" onClick={this.save}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(ApplicantInfo)