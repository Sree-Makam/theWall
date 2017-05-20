import React,{Component} from 'react';
import Axios from 'axios';

class PostItem extends Component{
    deletePost = (post_id) => {
        this.props.deletePost(this.props.post._id, this.props.logged_id);
    }
    render(){
        // console.log(this.props.post._author._id)
         //console.log(this.props.post._id)
        return(

            <div >
                <h3>Author: {this.props.post._author.username}</h3>
                <h4>Created: {this.props.post.createdAt}</h4>
                <p>{this.props.post.post}</p>
                {this.props.logged_id === this.props.post._author._id&&
                <input type="button" name="deletepost" value="Delete Post" onClick={this.deletePost}/>                    
                } <hr/>                  
            </div>
        )
    }
}

export default PostItem;