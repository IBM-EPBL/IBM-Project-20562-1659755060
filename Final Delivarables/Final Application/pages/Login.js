import React, { useState } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import Feed from './Feed';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      dob: '',
      error: ''
    }
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  onSubmit = (e) => {
    console.log("success")
    let { history } = this.props
    let ele;
    e.preventDefault()
    let olddata = localStorage.getItem('formdata')
    //console.log(olddata)
    let oldArr = JSON.parse(olddata)
    //console.log(oldArr[])
    
    oldArr.map(arr => {
      if (this.state.email.length > 0 && this.state.password.length > 0) {
        //console.log("a")
        if (arr.email == this.state.email && (arr.password == this.state.password)) {
          console.log(arr)
          let user = this.state.email;
          sessionStorage.setItem("@user", true)
          history.push({ pathname: "/Feed", user: this.state.email });
          window.location.reload()
        } else {
          this.setState({ error: 'Please check your inputs' })
        }
      }
    }
    )
  }

  render() {




    return (
      <>
        <div className="w-full flex items-center justify-between">

          <div className="pt-40 pl-20">
            <div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
              <form onSubmit={this.onSubmit}>
                <p className="error">
                  {this.state.error}
                </p>

                <div className="flex items-center justify-center">
                  <h2 className="text-2xl font-bold tracking-wide">
                    Welcome back
                  </h2>
                </div>
                <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
                  Log In
                </h2>
                <input
                  onChange={this.onChangeEmail}
                  value={this.state.email}
                  type="text"
                  className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                  placeholder="Email id"
                  required
                />
                <input
                  onChange={this.onChangePassword}
                  type="password"
                  value={this.state.password}
                  className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                  placeholder="Password"
                  required
                />
                <div className="flex items-center justify-between">
                  <Link
                    to="/signup"
                    className="text-gray-600"
                  >
                    New User? Signup
                  </Link>
                  
                  <button type="submit" className="bg-gray-800 text-gray-200  px-2 py-1 rounded" onClick={this.props.onLogin}>
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className="mr-20 mt-40 p-12"
            style={{
              background:
                "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
            }}
          >
            <h1 className="text-4xl font-bold text-white tracking-wide">
              Welcome to SNR
            </h1>
            <h1 className="text-5xl py-2 font-bold text-white tracking-wide">

            </h1>
            <p className="text-white py-2">
              Provide you with the cars you want. <br /> Save Time. Save Fuel. Save Money. Say yes to SNR.
            </p>
            <span className="text-white">
              Create New Account?
              <Link
                to="/signup"
                className="text-white text-lg ml-2 font-bold hover:text-red-500"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </>
    )
  }
}

export default Login;