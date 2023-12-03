//entry js 
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,Route,Switch} from 'react-router-dom'//引入路由
import Register from './pages/register/register'
import Login from './pages/login/login'
import Main from './pages/main/main'

// import redux
import {Provider} from 'react-redux'
import store from './redux/store'

// import overall css
import './assets/css/index.less'
// import './test/socketio_test'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route> 
            </Switch>
        </HashRouter>
    </Provider>
    
),document.getElementById("root"));