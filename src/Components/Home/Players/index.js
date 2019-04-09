import React, { Component } from 'react';
import Stripes from '../../../Resources/stripes.png';
import { Tag } from '../../UI/misc';
import Reveal from 'react-reveal/Reveal';
import Card from './Cards';

class Players extends Component {

    state = {
        show: false
    }

    render() {
        return (
            <Reveal
                fraction={0.7}
                onReveal={()=>{
                    this.setState({ show: true})
                }}
            >
                <div className="home-players"
                    style={{
                        background: `#963450 url(${Stripes})`
                    }}
                >
                    <div className="container">
                        <div className="home-players__wrapper">
                            <div className="home-card__wrapper">
                                <Card show={this.state.show}/>
                            </div>

                            <div className="home-text__wrapper">
                                <div>
                                    <Tag 
                                        bck="#0E1A33"
                                        size="100px"
                                        color="#ffffff"
                                        add={{
                                            display: 'inline-block',
                                            marginBottom: '20px', 
                                        }}
                                    >
                                        Meet
                                    </Tag>
                                </div>

                                <div>
                                    <Tag 
                                        bck="#0E1A33"
                                        size="100px"
                                        color="#ffffff"
                                        add={{
                                            display: 'inline-block',
                                            marginBottom: '20px' 
                                        }}
                                    >
                                        The
                                    </Tag>
                                </div>

                                <div>
                                    <Tag 
                                        bck="#0E1A33"
                                        size="100px"
                                        color="#ffffff"
                                        add={{
                                            display: 'inline-block',
                                            marginBottom: '20px' 
                                        }}
                                    >
                                        Players
                                    </Tag>
                                </div>

                                <div>
                                    <Tag
                                        bck="#ffffff"
                                        size="27px"
                                        color="#0E1A33"
                                        link={true}
                                        linkTo="/team"
                                        add={{
                                            display: 'inline-block',
                                            marginBottom: '27px',
                                            border: '1px solid #0E1A33' 
                                        }}
                                    >Meet them here</Tag>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Reveal>
        )
    }
}

export default Players;
