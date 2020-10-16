import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { GoogleLogout, useGoogleLogout } from 'react-google-login';
import { connect } from 'react-redux'
import '../../App.css';
class index extends Component {
    componentClicked = () => {
        console.log('click')
    }
    componentWillMount() {
        let val = sessionStorage.getItem('User')
        if (val != null) {
            this.props.setUser(JSON.parse(val))
        }
    }
    responseFacebook = (response) => {
        console.log(response);
        let val = {
            accessToken: response.accessToken,
            name: response.name,
            email: response.email,
            signedRequest: response.signedRequest,
            isLoggedIn: true
        }
        sessionStorage.setItem('User', JSON.parse(val))
        this.props.setUser(val)
    }
    responseGoogle = (response) => {
        console.log('login', response);
        let val = {
            accessToken: response.accessToken,
            name: response.nt.Ad,
            email: response.nt.Wt,
            tokenId: response.tokenId,
            isLoggedIn: true
        }

        sessionStorage.setItem('User', JSON.stringify(val))
        this.props.setUser(val)
    }

    logout = (response) => {
        console.log(response)
    }
    render() {
        if (this.props.user == '' || this.props.user.isLoggedIn == false) {
            return (
                <div className='profile-container' >
                    <div className='profile-box'>
                            <h5 className='proifile-title'>ĐĂNG NHẬP</h5>
                        <div className='facebook-login'>
                            <FacebookLogin
                                appId="337126377357742"
                                fields="name,email,picture"
                                // autoLoad={true}
                                onClick={this.componentClicked}
                                callback={this.responseFacebook} />
                        </div>
                        <div className='google-login'>
                            <GoogleLogin
                                clientId="399046116075-c47dmb0tqdgucro475fnabfpm2o2fnfi.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </div>

            )
        }
        else {
            if (this.props.user.tokenId != undefined) {
                return (
                    <div>
                        <p>Hi {this.props.user.name}</p>
                        <GoogleLogout
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={(response) => {
                                let valLogout = {
                                    isLoggedIn: false
                                }
                                this.props.setUser(valLogout)
                            }
                            }
                        >
                        </GoogleLogout>
                    </div>

                )
            }
            else {
                return (
                    <div>
                        <p>Hi {this.props.user.name}</p>
                    </div>
                )
            }
        }

    }
}
const mapStateToProps = (state) => ({
    user: state.user,
});
const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        setUser: (data) => {
            dispatch({ type: 'SET_USER', payload: data })
        },
        getUser: (data) => {
            dispatch({ type: 'GET_USER', payload: data })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);