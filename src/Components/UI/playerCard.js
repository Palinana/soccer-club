import React from 'react';

const PlayerCard = (props) => {
    return (
        <div className="player-card__wrapper">
            <div 
                className="player-card__thmb"
                style={{background: `#f2f9ff url(${props.bck})`}}
            >
            </div>
            <div className="player-card__info">
                <div className="player-card__number">{props.number}</div>
                <div className="player-card__name">
                    <span>{props.name}</span>
                    <span>{props.lastname}</span>
                </div>

            </div>
        </div>
    )
}

export default PlayerCard;
