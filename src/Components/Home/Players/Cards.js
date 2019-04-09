import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Messi from '../../../Resources/images/players/Messi.png';
import Suarez from '../../../Resources/images/players/Suarez.png';
import PlayerCard from '../../UI/playerCard';

class Cards extends Component {

    state = {
        cards: [
            {
                bottom: 90,
                left: 300
            },
            {
                bottom: 60,
                left: 200
            },
            {
                bottom: 30,
                left: 100
            },
            {
                bottom: 0,
                left: 0
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
                            number="10"
                            name="Lionel"
                            lastname="Messi"
                            bck={Messi}
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