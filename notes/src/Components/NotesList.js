import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import axios from 'axios';
import house from '../house.png'

class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        // attach the token as the Authorization header
        const requestOptions = {
          headers: {
            Authorization: token,
          },
        };
        let promise = axios.get(`http://localhost:8000/api/notes`, requestOptions);
        promise.then((response) => {
            console.log("CDM notes", response.data);
            this.setState({
                notes: response.data
            });
            })
            .catch((error) => {
                console.error(error);
            })
    }
    render(){
        {!localStorage.getItem("token") &&
        <div className="main-container"><Link className="link-style" to="/login">Please Sign in to access list of notes</Link></div>}
        return(
            <div>
            <img src={house} alt="house" className="house-pic"/>
            <ul className="collection-of-notes">
                {this.state.notes.map(note => {
                return(
                <li className="indiv-note" key={note._id}>
                    <h4><strong>{note.title}</strong></h4>
                    <p>{note.content}</p>
                </li>
                )}
                )}
            </ul>
            </div>
        )}
}
        


export default NotesList;