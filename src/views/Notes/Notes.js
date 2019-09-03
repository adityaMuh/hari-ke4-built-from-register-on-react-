import React from 'react';
import NoteList from './NoteList';
import { NOTES_URL } from 'views/constants';
import NoteFrom from './NoteFrom';
import {Link} from 'react-router-dom';


class Notes extends React.Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            loggedin: false
        }
        
        this.updateList = this.updateList.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }
    deleteNote(id) {
        if (window.confirm("Anda yakin akan menghapus catatan ini")){
            let token = localStorage.getItem('token@catatan') || null

            fetch(
                NOTES_URL + "/" + id,
                {
                    method:'DELETE',
                    headers:{
                        'x-access-token':token
                    }
                }
            )
            .then((response) => {
                if (!response.ok){
                    throw Error(response.statusText)
                }
                return response
            })
            .then((response)=> response.json())
            .then((data)=>{
                this.updateList()
            })
            .catch((err)=>{
                throw Error(err)
            })
        }
    }
    
    doLogout(){
        localStorage.removeItem('login@catatan')
        localStorage.removeItem('token@catatan')
        this.setState({loggedin: false})
    }
    
    componentDidMount() {
        this.updateList();
        if (localStorage.getItem('login@catatan')){
            this.setState({loggedin: true})
        } else {
            this.setState({loggedin: false})
        }
    }
    
    updateList() {
        fetch(
            NOTES_URL,
            { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ articles: data.data.notes });
            })
            .catch((err) => {
                throw Error(err);
            })
        }

        render() {
            return (
                <div className="notes">
                <h1 className="title">Catatan</h1>
                {this.state.loggedin ?
                    <div>
                    <p>
                    Anda Sudah login
                    <button onClick={this.doLogout}>logout</button>
                    </p>
                    <NoteFrom update={this.updateList}/>
                    </div>
                    :
                    <p>
                    Anda Belum login
                    <Link to="/login">Login</Link>
                    atau <Link to="/register">register</Link>
                    </p>
                }
                <hr/>

                < NoteList  notes={this.state.articles}
                            isAuthenticated={this.state.loggedin}
                            onDelete={this.deleteNote}/>
                </div>
                )
            }
        }
        
        
        export default Notes;
        