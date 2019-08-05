import React, { Component } from 'react';
import { firebase, firebasePlayers } from '../../firebase';
import PlayerCard from '../UI/playerCard';
import Fade from 'react-reveal/Fade';
import Stripes from '../../Resources/stripes.png';
import { firebaseLooper } from '../UI/misc';
import { Promise } from 'core-js';

class Team extends Component {

    state = {
        loading: true,
        players: []
    }

    componentDidMount() {
        firebasePlayers.once('value')
            .then((snapshot) => {
                const players = firebaseLooper(snapshot);

                let promises = [];
                for(let key in players){
                    promises.push(
                        new Promise((resolve, reject) => {//make request to Server to download players and push to promises
                            firebase.storage().ref('players')
                                .child(players[key].image).getDownloadURL()
                                .then((url) =>{
                                    players[key].url = url;
                                    resolve();
                                })
                        }) 
                    )
                }

                Promise.all(promises) //wait for all to complete
                    .then(() => {
                        this.setState({
                            loading: false,
                            players
                        });
                    })
            })
    }

    showPlayersByCategory = (category) => (
        this.state.players ? 
            this.state.players.map((player, idx) => {
                return player.position === category ?
                    <Fade left delay={idx*20} key={idx}>
                        <div className="item">
                            <PlayerCard 
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                bck={player.url}
                            />
                        </div>
                    </Fade>
                    : null
             })
        : null
    )

    render() {
        return (
            <div className="team-container"
                style={{
                    background: `#963450 url(${Stripes}) repeat`
                }}
            >
                {
                    !this.state.loading ? 
                        <div >
                            <div className="team-category__wrapper">
                                <div className="team-category__title">Keepers</div>
                                <div className="team-cards">
                                    {this.showPlayersByCategory('Keeper')}
                                </div>
                            </div>

                            <div className="team-category__wrapper">
                                <div className="team-category__title">Forward</div>
                                <div className="team-cards">
                                    {this.showPlayersByCategory('Forward')}
                                </div>
                            </div>

                            <div className="team-category__wrapper">
                                <div className="team-category__title">Midfield</div>
                                <div className="team-cards">
                                    {this.showPlayersByCategory('Midfield')}
                                </div>
                            </div>

                            <div className="team-category__wrapper">
                                <div className="team-category__title">Defence</div>
                                <div className="team-cards">
                                    {this.showPlayersByCategory('Defence')}
                                </div>
                            </div>
                        </div>
                    : null
                }
            </div>
        )
    }
}

export default Team;
