//主界面路由组件
import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import EmployerInfo from '../employer-info/employer-info'
import ApplicantInfo from '../applicant-info/applicant-info'
import Employer from '../applicant/applicant'
import Applicant from '../applicant/applicant'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {

    navList = [
        {
            path: '/employer',
            component: Employer,
            title: 'Applicant List',
            icon: 'applicant',
            text: 'Applicant'
        },
        {
            path: '/applicant',
            component: Applicant,
            title: 'Employer List',
            icon: 'employer',
            text: 'Employer'
        },
        {
            path: '/message',
            component: Message,
            title: 'Message List',
            icon: 'message',
            text: 'Message'
        },
        {
            path: '/personal',
            component: Personal,
            title: 'User Center',
            icon: 'personal',
            text: 'Personal'
        },
    ]

    componentDidMount(){
        // login in the past, but redux user does not have _id. (This is similar to refreshing the page. All the data in redux is empty)
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id) {
            //  send ajax request to get user
            this.props.getUser()
        }
    }
    
    render () {
        //  check if user is login in
        const userid =Cookies.get('userid')
        if(!userid){
            return <Redirect to='/login' />
        }
        //  read user from redux if it has _id
        const {user, unReadCount} = this.props
        if (!user._id){
            return null
        }else{
            let path = this.props.location.pathname
            if(path==='/'){
                path=getRedirectTo(user.type,user.header)
                return <Redirect to={path} />
            }

        }
        
        const {navList} = this
        const path = this.props.location.pathname 
        const currentNav = navList.find(nav => nav.path===path) 

        if(currentNav) {
            if(user.type === 'employer') {
                //  hidden boss show applicant
                navList[1].hide=true
            }
            else{
                // 隐藏数组的第一个 （隐藏大神，显示老板）
                navList[0].hide=true
            }
        }

        return(
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {   // 动态化配置路由 (注意：这里只能用map，不能用forEach)
                        navList.map(nav => <Route path={nav.path} component={nav.component} />)
                    }
                    <Route path="/employerinfo" component={EmployerInfo} />
                    <Route path="/applicantinfo" component={ApplicantInfo} />
                    <Route path="/chat/:userid" component={Chat} />
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount} /> : null}
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user, unReadCount: state.chat.unReadCount}), //这里是1
    {getUser}
)(Main)
