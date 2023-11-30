// Applicant main page
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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
    }



    render() {
        // redirect to Applicant or employer main page
        const { header, type } = this.props.user
        if (header) {// means user info is completed
            const path = type === 'applicant' ? '/applicant' : '/employer'
            return <Redirect to={path} />
        }


        return (
            <div>
                <NavBar>Profile Information Update</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder="Enter desired job position" onChange={val => { this.handleChange('post', val) }}>Job Position:</InputItem>
                <TextareaItem title="Introduction:" rows={3} onChange={val => { this.handleChange('info', val) }} />

                <Button type="primary" onClick={this.save}>Save</Button>

            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(ApplicantInfo)