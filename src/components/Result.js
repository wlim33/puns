import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js'

export default class Result extends Component {
    render() {
        const {search, pun, currentSearch} = this.props
        return (
            <Clipboard
                component="a"
                data-clipboard-text={pun}
                style={search !== currentSearch ? {opacity: "0.5"} : {}}
                className={"list-group-item list-group-item-action"}
                data-toggle="popover"
                data-trigger="click"
                data-content="copied to the clipboard!">
                {pun}
            </Clipboard>
        )
    }
}
