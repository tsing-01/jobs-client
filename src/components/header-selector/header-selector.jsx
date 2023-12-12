//  selct the header icon

import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        icon: this.props.icon
    }

    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: 'avatar' + (i + 1),
                icon: require(`../../assets/images/avatar${i + 1}.png`)
            })
        }
    }

    handleClick = ({ text, icon }) => {
        // update current component state
        this.setState({ icon })
        // call function to update parent component state
        this.props.setHeader(text)
    }



    render() {
        // header icon
        const { icon } = this.state
        const listHeader = !icon ? "selct avatar" : (
            <div>selected avatar: <img alt='icon' src={icon} /></div>
        )


        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.headerList}
                    square={false}
                    columnNum={6}
                    onClick={this.handleClick}
                />
            </List>

        )
    }
}