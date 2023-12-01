// boss update info page
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import { updateUser } from '../../redux/actions'

class EmployerInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
        company: '',
        salary: '',
    }
    // update header state
    setHeader = (header) => {
        console.log('header', header)
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
        this.props.updateUser(this.state);
        this.props.history.push('/' + this.props.user.type)
    }

    initData = (user) => {
        this.setState({
            header: user.header,
            post: user.post,
            info: user.info,
            company: user.company,
            salary: user.salary,
        })
    }

    componentWillMount() {
        this.initData(this.props.user)
    }

    render() {
        return (
            <div>
                <NavBar>Employer Information Update</NavBar>
                <HeaderSelector icon={require(`../../assets/images/${this.state.header}.png`)} setHeader={this.setHeader} />
                <InputItem value={this.state.post} clear placeholder="Enter job position for recruitment" onChange={val => { this.handleChange('post', val) }}>Job Position:</InputItem>
                <InputItem value={this.state.company} clear placeholder="Enter company name" onChange={val => { this.handleChange('company', val) }}>Company:</InputItem>
                <InputItem value={this.state.salary} clear placeholder="Enter job salary" onChange={val => { this.handleChange('salary', val) }}>Job Salary:</InputItem>
                <TextareaItem value={this.state.info} clear title="description:" rows={3} onChange={val => { this.handleChange('info', val) }} />
                <Button type="primary" onClick={this.save}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(EmployerInfo)