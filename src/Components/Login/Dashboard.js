import React, {Component} from 'react';
import Axios from 'axios';
import PostItem from "./PostItem.js";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {posts:[], text:""}        
    }
    
    //callback function 
    addPost = (e) =>{
        // console.log(e.target.value)
        this.setState({
            text : e.target.value
        })
    }

    deletePost = (post_id, logged_id) => {
        Axios({
            method:"post",
            url:("http://54.245.42.196/posts/" + post_id  + "/destroy" ),
            data:{user_id: logged_id},
            headers:{Authorization: localStorage.getItem("jw-token")}
        }).then((response)=>{
            console.log(response)
            this.getPosts();
        }).catch((err)=>{
            console.log(err.messgae)
        })        
    }


    newPost = () =>{ 
        Axios({
            method:'post',
            url:"http://54.245.42.196/posts/create",
            data: {post: this.state.text, user_id: this.props.match.params.userId},
            headers: {Authorization: localStorage.getItem("jw-token")}
        }).then((result)=>{
            console.log(result.data)
            this.setState({
                text:''
            })
            this.getPosts();
        }).catch((err)=>{
            console.log("Unsuccessful", err.message)
        })  
    }


    getPosts = () => {
        //logic
        Axios.get(("http://54.245.42.196/posts/" + this.props.match.params.userId), { headers: {
            Authorization: localStorage.getItem("jw-token")}
        }).then((result) => {
            console.log("successful", result.data.posts);
            this.setState({
                posts: result.data.posts
            })                    
        }).catch((err)=> {
            console.log(err.message);
            console.log("unsuccessful");
        })
    }

    authenticate = () =>{
        // console.log("authenticate running")
        Axios.get(("http://54.245.42.196/users/"+ this.props.match.params.userId + "/authenticate"), {headers: {
            Authorization: localStorage.getItem("jw-token")}
        }).then((result) => {
            // console.log(result)
            // console.log(result.data.user.username)
            localStorage.setItem("authenticateduser",result.data.user._id)
            localStorage.setItem("username", result.data.user.username);
        }).catch((err) => {
            console.log(err.message)
        })
    }

    logOut = () =>{
        localStorage.setItem("jw-token", "");
        this.props.history.push("/login");
    }

    componentDidMount() {
        this.getPosts();
    }

    render(){
        this.authenticate();
        if (localStorage.getItem("authenticateduser") === this.props.match.params.userId){
            let posts = this.state.posts.map((value,index)=>{
                //console.log(value._id);
                let logged_id = this.props.match.params.userId;
                return(
                    <div key={index}>
                        <PostItem post={value} logged_id={logged_id} deletePost={this.deletePost} />
                    </div>
                )                    
            })
            return(
                <div>
                    <button onClick={this.logOut} style={{float: "right", marginRight:"15px"}} className="btn btn-primary">Logout</button>
                    <h1>Welcome, {localStorage.getItem("username")}</h1>
                    <h1>The Wall</h1>
                    <h4>New Post</h4>
                    <textarea rows="5" cols="100"  value={this.state.text} onChange={this.addPost}></textarea><br/>
                    <input type='button' name='addText' value='Create New Post' onClick={this.newPost}/>
                    {posts}
                    
                </div>
            )
        } else {
            return(
                <div>
                    {this.logOut()}    
                </div>
            )
        }

    }
    
}

export default Dashboard;