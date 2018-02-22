import React, { Component } from 'react';
import { connect } from 'react-redux';

class PhraseInput extends Component {
        render() {
            const { isFetching, isSuccess } = this.props;

            let input;
            return (<form onSubmit={ e => {
                            e.preventDefault()
                            if (!input.value.trim()) {
                                return;
                            }
                            this.props.getPun(input.value.trim());

                        }
                    }  >

                    <div className="form-group my-5">
                    <div className="input-group">

                            <input
                                className="form-control"
                                ref={node => { input = node }}
                                defaultValue="Paradise by the Dashboard Light"
                            />

                            <div className="input-group-append">
                                <button type="submit" className="btn btn-outline-primary">
                                    Generate
                                </button>
                            </div>

                        </div>
                        {(isSuccess !== undefined) && <small className="form-text text-muted">{isFetching ? "generating puns..." : (isSuccess === false ? "no puns found!" : " ")} </small>}
                    </div>
                </form>)
        }
}

export default connect()(PhraseInput);
