import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

// withRouter()
class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render() {
        let { navList, unReadCount } = this.props
        // filter  the nav with hide=true (boss and genius can only show one)
        // navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname   // only the path changed, the component will be re-rendered
        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item
                            key={nav.path}
                            badge={nav.path === '/message' ? unReadCount : 0}
                            title={nav.text}
                            icon={{ uri: require(`./images/${nav.icon}.png`) }}
                            selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }}
                            selected={path === nav.path}
                            onPress={() => this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        )
    }
}
// export withRouter(NavFooter)
// history  location  math
export default withRouter(NavFooter)