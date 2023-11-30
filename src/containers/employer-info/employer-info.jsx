// boss update info page
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import {updateUser} from '../../redux/actions'

class EmployerInfo extends Component{
    state={
        header:'',
        post:'',
        info:'',
        company:'',
        salary:'',
    }
    // update header state
    setHeader=(header)=>{
        this.setState({
            header
        })
    }


    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    save=()=>{
        console.log(this.state);
        this.props.updateUser(this.state);
    }
    render(){
        const {header,type}=this.props.user
        if(header){// means user info is completed
            const path=type==="applicant"?'/applicant':'/employer'
            return <Redirect to={path} />
        }


        return(
            <div>
                <NavBar>Employer Information Update</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="Enter job position for recruitment" onChange={val => {this.handleChange('post', val)}}>Job Position:</InputItem>
                <InputItem placeholder="Enter company name" onChange={val => {this.handleChange('company', val)}}>Company Name:</InputItem>
                <InputItem placeholder="Enter job salary" onChange={val => {this.handleChange('salary', val)}}>Job Salary:</InputItem>
                <TextareaItem title="Requirements:" rows={3} onChange={val => {this.handleChange('info', val)}} />
                <Button type="primary" onClick={this.save}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {updateUser}
)(EmployerInfo)