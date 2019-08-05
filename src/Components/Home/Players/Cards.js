import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Messi from '../../../Resources/images/players/Messi.png';
import Suarez from '../../../Resources/images/players/Suarez.png';
import Rakitić from '../../../Resources/images/players/Rakitic.png';
import Umtiti from '../../../Resources/images/players/Umtiti.png';
import PlayerCard from '../../UI/playerCard';

class Cards extends Component {

    state = {
        cards: [
            {
                bottom: 90,
                left: 150,
                image: Umtiti,
                name: 'Samuel',
                lastname: 'Umtiti',
                number: 23
            },
            {
                bottom: 60,
                left: 100,
                image: Rakitić,
                name: 'Ivan',
                lastname: 'Rakitić',
                number: 4
            },
            {
                bottom: 30,
                left: 50,
                image: Suarez,
                name: 'Luis',
                lastname: 'Suarez',
                number: 9
            },
            {
                bottom: 0,
                left: 0,
                image: Messi,
                name: 'Lionel',
                lastname: 'Messi',
                number: 10
            }
        ]
    }

    showAnimateCards = () => (
        this.state.cards.map((card, idx)=>(
            <Animate
                key={idx}
                show={this.props.show}

                start={{
                    left: 0,
                    bottom: 0
                }}
                enter={{
                    left: [card.left],
                    bottom: [card.bottom],
                    timing: { duration: 500, ease: easePolyOut }
                }}
            >
                {({ left, bottom })=> {
                    return (
                        <div
                            style={{
                                position: 'absolute',
                                left,
                                bottom
                            }}
                        >
                        <PlayerCard 
                            number={card.number}
                            name={card.name}
                            lastname={card.lastname}
                            bck={card.image}
                        />
                        </div>
                    )
                }}
            </Animate>
        ))
    )

    render() {
        return (
            <div>
                {this.showAnimateCards()}
            </div>
        )
    }
}
 
export default Cards;