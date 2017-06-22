// import React from 'react';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        query: '',
                        artist: null,
                        profilepic: null,
                        listeners: null,
                        playcount: null,
                        description: null,
                        tracks: []
                }
                
        }
        
        search() {
                console.log(this.state.query);
                var baseURL = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.state.query}&api_key=fc8abd6509fb7b91ba5628898494b3e6&format=json`;

                // var finalURL = `${baseURL}q=${this.state.query}&type=artist&limit=1`;
                console.log(baseURL);
                fetch(baseURL, {
                        method: 'GET'
                }).then(response => response.json())
                        .then(json => {
                                console.log(json);
                                //const searchArtist = json.artist.tags;
                                const artist = json.artist['name'];
                                this.setState({ artist });
                                const profilepic = json.artist.image[2]['#text'];
                                this.setState({ profilepic });
                                console.log('propoic:', profilepic);
                                var listeners = json.artist.stats['listeners'];
                                listeners += ' (LISTENERS)';
                                this.setState({ listeners });
                                var playcount = json.artist.stats['playcount'];
                                playcount += ' (plays total)';
                                this.setState({ playcount });
                                // console.log(searchArtist.tags['tag']);
                                var albumURL = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=fc8abd6509fb7b91ba5628898494b3e6&format=json`;
                                console.log(albumURL);
                                fetch(albumURL, {
                                        method: 'GET'
                                }).then(response => response.json())
                                        .then(json => {
                                                console.log(json);
                                                const tracks = json.topalbums['album'];
                                        this.setState({tracks});
                                                console.log(this.state.tracks);
                                        });


                        });


        }
        render() {
                return (
                        <div className="text-fluid col-md-12">

                                <div className="row">
                                        <div className="col-md-4 col-md-offset-3">

                                                <div className="form-group has-feedback">

                                                        <input type="text" className="form-control" name="search" id="search" placeholder="search" className="form-control text-center" placeholder="Enter Any Artist to search" required onChange={event => this.setState({ query: event.target.value })} onKeyPress={event => { if (event.key === 'Enter') this.search() } } />

                                                </div>

                                        </div>
                                </div>
                                <div className="text-center Profile row">
                                        <div className="col-md-3 ">
                                        </div>
                                        <div className="col-md-8 ">
                                                <div className="col-md-2 lead Artistpic">
                                                        <img className="img-responsive" src={this.state.profilepic} alt='' />
                                                </div>
                                                <div className="col-md-6 Artistname">
                                                        <h3 className="lead">{this.state.artist}</h3>
                                                        <span className="label label-info">{this.state.listeners}</span>
                                                        <span className="label label-primary">{this.state.playcount}</span>


                                                </div>
                                        </div>
                                </div>

                                <div className="row Gallery col-md-12">
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-8">
                                
                                
                                        <ul>
                                                {
                                                        this.state.tracks.map(function (track, index) {
                                                        return <li className = 'well' key={index}> <img className="img-responsive imagealbum" src={track.image[0]['#text']} alt='' /><a href={track.url}>{track.name} </a></li>;
                                                })}
                                        </ul>
                                </div>
                                <div className="col-md-2">
                                </div>
                                </div>
                        </div>)
        };
};

export default App;