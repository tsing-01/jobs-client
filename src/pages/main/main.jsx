//主界面路由组件
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import { navList, subnavList } from './routerList'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'

class Main extends Component {

    componentDidMount() {
        // login in the past, but redux user does not have _id. (This is similar to refreshing the page. All the data in redux is empty)
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if (userid && !_id) {
            //  send ajax request to get user
            this.props.getUser()
        }
    }

    render() {
        //  check if user is login in
        const userid = Cookies.get('userid')
        if (!userid) {
            return <Redirect to='/login' />
        }
        //  read user from redux if it has _id
        let { user, unReadCount, navList} = this.props
        if (!user._id) {
            return null
        } else {
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }

        const newNavList = navList.filter(elem => {
            const status = user.type === 'employer' ? '/applicant' : '/employer';
           return elem.path !== status
        })
        const path = this.props.location.pathname
        const allNavList = [...newNavList, ...subnavList]
        const currentNav = allNavList.find(nav => nav.path === path)
        const isChat = path.indexOf('/chat') >= 0
        // return not found page if currentNav is not exist
        if (!currentNav && !isChat) {
            return <Route component={NotFound} />
        } 

        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {  
                        newNavList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} />)
                    }
                    {
                        subnavList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} />)                       
                    }
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={newNavList} unReadCount={unReadCount} /> : null}
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, unReadCount: state.chat.unReadCount, navList, subnavList }), 
    { getUser },
)(Main)
