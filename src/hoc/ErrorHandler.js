import React, { Component } from 'react';
import './ErrorHandler.css';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <>
                    <WrappedComponent {...this.props} />
                    <div className="error" show={this.state.error}>
                        {this.state.error ? "An error occurred. Please try again." : null}
                    </div>
                </>
            );
        }
    }
}

export default errorHandler;