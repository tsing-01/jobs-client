// 404 
import React from 'react'
import Button from 'antd-mobile/lib/button';

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Sorry, Page had lost</h2>
                    <Button
                        type="primary"
                        onClick={() => this.props.history.replace('/')}
                    >
                        return home page
                    </Button>
                </div>
            </div>
        )
    }
}
export default NotFound