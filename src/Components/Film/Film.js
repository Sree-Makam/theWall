import React, {Component} from 'react';
import FilmItem from './FilmItem.js';

class Film extends Component{
    render(){
        return(
            <div>
                <h1>List of all StarWars Films</h1>
                
                <FilmItem />
            </div>
        )
    }
}

export default Film;