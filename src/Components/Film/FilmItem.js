import React, {Component} from 'react';
import Axios from 'axios';

class FilmItem extends Component{
    constructor(props){
        super(props);
        this.cancelToken = Axios.CancelToken.source();
        this.state = {StarWars:false, message: "Loading StarWars..."}
    }
    render(){
        if(this.state.StarWars){
        var movies = this.state.StarWars.map((value) => {
            return(
                <div>
                    <h1 >{value.title}</h1>
                    <p>{value.opening_crawl}</p>
                </div>
            )
        })
        console.log(movies);
        return(
            <div>
                {movies}
            </div>
        )
         }else {
            return(
                <h3>{this.state.message}</h3>
            )
        }
    }
    componentDidMount(){
        Axios.get(" http://swapi.co/api/films/" )
        .then((result)=>{
            console.log(result);
            this.setState({
                StarWars: result.data.results,
                message: ""
            })
        }).catch((err)=>{
            if(Axios.isCancel(err)){
                console.log("Request canceled", err.message);
            } else {
                this.setState({
                    message: `StarWars with ID "${this.props.id}" not found`
                })
            }
        })
    }
    componentWillUnmount(){
        this.cancelToken.cancel("Operation canceled")
    }
}

export default FilmItem;