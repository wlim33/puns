import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
getRhymes,
} from '../actions';
import Rhymes from '../components/Rhymes'
import PhraseInput from '../components/PhraseInput'

class AsyncApp extends Component {
    render() {
        const { getPun,
            isFetching,
            pastSearches,
            isSuccess,
            lastSearch} = this.props
        return (
            <div className="container">
                <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">Pun Generator</h1>
    <p className="lead">This is a pun generator. This site utilizes the <a href="https://www.datamuse.com/api/">Datamuse API</a>.
    The source code can be found here:
    Click on an entry to copy to the clipboard!
</p>
</div>
</div>

                <div className="row justify-content-center">
                    <div className="col col-sm-12 col-md-8 col-lg-6">
                        <PhraseInput isFetching={isFetching} lastSearch={lastSearch} isSuccess={isSuccess} getPun={getPun}/>

                        <div className="row">
                            <div className="col">
                                <Rhymes rhymes={pastSearches} currentSearch={lastSearch}/>

                            </div>

                        </div>




            </div>
        </div>
    </div>
        )
    }
}

AsyncApp.propTypes = {
  isFetching: PropTypes.bool.isRequired,

}

function mapStateToProps(state) {
  return {
    lastSearch: state.rhymeGenerate.original,
    punned: state.rhymeGenerate.punned,
    isFetching: state.rhymeGenerate.isFetching,
    isSuccess: state.rhymeGenerate.isSuccess,
    pastSearches: state.history.pastSearches
  }
}

function mapDispatchToProps(dispatch) {
    return {
        getPun: (phrase) => dispatch(getRhymes(phrase))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp)
