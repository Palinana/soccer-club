import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import FeaturedPlayer from '../../../Resources/images/Messi.png';

class Text extends Component {

    animateNumber = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                rotate: 0
            }}
            enter={{ 
                opacity: [1],
                rotate: [360],
                timing: { duration: 1000, ease: easePolyOut }
            }}
        >
            {({ opacity, rotate }) => {
                return (
                    <div className="featured-number"
                        style={{
                            opacity,
                            transform: `translate(260px, 70px) rotateY(${rotate}deg)`
                        }}
                    >
                    3
                    </div>
                )
            }}
        </Animate>
    )

    animateFirst = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                x: 503,
                y: 360
            }}
            enter={{ 
                opacity: [1],
                x: [273],
                y: [360],
                timing: { duration: 500, ease: easePolyOut }
            }}
        >
            {({ opacity, x, y }) => {
                return (
                    <div className="featured-first"
                        style={{
                            opacity,
                            transform: `translate(${x}px, ${y}px)`
                        }}
                    >
                    League
                    </div>
                )
            }}
        </Animate>
    )
    
    animateSecond = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                x: 503,
                y: 500
            }}
            enter={{ 
                opacity: [1],
                x: [273],
                y: [500],
                timing: { delay: 300, duration: 500, ease: easePolyOut }
            }}
        >
            {({ opacity, x, y }) => {
                return (
                    <div className="featured-second"
                        style={{
                            opacity,
                            transform: `translate(${x}px, ${y}px)`
                        }}
                    >
                    Champrionships
                    </div>
                )
            }}
        </Animate>
    )

    animatePlayer = () => (
        <Animate
            show={true}
            start={{
                opacity: 0
            }}
            enter={{ 
                opacity: [1],
                timing: { delay: 800, duration: 500, ease: easePolyOut }
            }}
        >
            {({ opacity, x, y }) => {
                return (
                    <div className="featured-player"
                        style={{
                            opacity,
                            background: `url(${FeaturedPlayer})`,
                            transform: `translate(575px, 30px)`
                        }}
                    >
                    </div>
                )
            }}
        </Animate>
    )

    render() {
        return (
            <div>
                <div className="featured-text">
                    {this.animatePlayer()}
                    {this.animateNumber()}
                    {this.animateFirst()}
                    {this.animateSecond()}
                </div>
                <div className="featured-text-small">
                    <ul>
                        <li>3</li>
                        <li>League</li>
                        <li>Champrionships</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Text;
