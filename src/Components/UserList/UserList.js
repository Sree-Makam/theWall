import React,{Component} from 'react';
import Axios from 'axios';
import "./UserList.css";

class UserList extends Component{
    constructor(props){
        super(props);
        this.state = {ListofUsers: []}
    }
    render(){
        
        let List = this.state.ListofUsers.map((value,index) =>{
            return(                
                    <tr key={index}>
                        <td>{value.username}</td>
                        <td>{new Date(value.createdAt).toLocaleString()}</td>
                    </tr>                 
            )
        })
        // console.log(List);
        return(
            <div>
                <h1>User Table</h1>
                <table style={{width:"100%"}} className="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <th>User Names</th>
                            <th>Created At</th>
                        </tr>
                    </tbody>
                   {List}                                
                </table>
            </div>
        )
    }
    
    componentDidMount(){
        Axios.get(" http://54.245.42.196/users")
        .then((result) =>{
            console.log(result);
            this.setState({
                ListofUsers: result.data
            })
        }).catch((err) =>{
            console.log(err);
        })
    }
}

export default UserList;