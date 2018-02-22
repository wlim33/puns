import React, { Component } from 'react'
import PropTypes from 'prop-types'
 import Result from './Result'
export default class Rhymes extends Component {
  render() {
      return (<div className="list-group list-group-flush">
          {this.props.rhymes.map(entry => entry.isSuccess &&
                  <Result key={entry.id} search={entry.search} pun={entry.pun} currentSearch={this.props.currentSearch} />
          )}</div>)
  }
}
 
Rhymes.propTypes = {
  items: PropTypes.array
}
