import React, {Component} from 'react';
import Axios from 'axios';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {username: "", password: "", error:""}
    }
    
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = (e) => {
        e.preventDefault();    
        Axios({
            method: "post",
            url: "http://54.245.42.196/login",
            data: { username: this.state.username, password: this.state.password },
            headers: {Authorization: localStorage.getItem("jw-token")}
        }).then((result) => {
            console.log(result.data);
            // console.log(result.data.success);
            localStorage.setItem("jw-token", result.data.token);
            this.props.history.push(`/dashboard/${result.data.user_id}`);
        }).catch((err) => {
            console.log("Validation Errors,", err.response.data);
            this.setState({error: "Invalid Credentials"})
        })
    } 
    render(){
        return(
            <div className="post-lecture">
                <div className="container">
                    <h1>Sign In</h1>
                    <form onSubmit={this.login}>
                        <label>UserName</label>
                        <input type="text" className="form-control" name="username" 
                               onChange={this.handleChange} value={this.state.username} />
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" 
                               onChange={this.handleChange} value={this.state.password} />
                        <input type="submit" className="btn btn-primary" />                        
                    </form>
                    <h3>{this.state.error}</h3>
                </div>
            </div>
        )
    }



}

export default Login;