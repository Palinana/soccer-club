import React, { Component } from 'react';
import {  easePolyOut } from 'd3-ease';
import { NodeGroup } from 'react-move';

class MatchesList extends Component {

    state = {
        matchesList: []
    }

    static getDerivedStateFromProps(props, state) { //props can fail to load
        return state = {
            matchesList: props.matches
        }
    }

    showMatches = () => (
        this.state.matchesList ?
            <NodeGroup
                data={this.state.matchesList}
                keyAccessor={(d) => d.id}

                start={() => ({
                    opacity: 0,
                    x: -200
                })}
                enter={(d, idx) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: idx*50, ease: easePolyOut }
                })}
                update={(d, idx) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: idx*50, ease: easePolyOut }
                })}
                leave={(d, idx) => ({
                    opacity: [0],
                    x: [-200],
                    timing: { duration: 500, delay: idx*50, ease: easePolyOut }
                })}
            >
                {( nodes ) => (
                    <div className="match-box">
                        { nodes.map(({key, data, state: {x, opacity}}) => (
                            <div 
                                key={key} 
                                className="match-box__big"
                                style={{
                                    opacity,
                                    transform: `translate(${x}px)`
                                }}
                            >
                                <div className="block__wrapper">
                                    <div className="block">
                                        <div className="block__icon"
                                            style={{
                                                background: `url(/images/icons/${data.localThmb}.png)`
                                            }}
                                        ></div>
                                        <div className="block__team">{data.local}</div>
                                        <div className="block__result">{data.resultLocal}</div>
                                    </div>

                                    <div className="block">
                                        <div className="block__icon"
                                            style={{
                                                background: `url(/images/icons/${data.awayThmb}.png)`
                                            }}
                                        ></div>
                                        <div className="block__team">{data.away}</div>
                                        <div className="block__result">{data.resultAway}</div>
                                    </div>
                                </div>

                                <div className="block__wrapper nfo">
                                    <div className="block"><strong>Date:</strong>{data.date}</div>
                                    <div className="block"><strong>Stadium:</strong>{data.stadium}</div>
                                    <div className="block"><strong>Referee:</strong>{data.referee}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </NodeGroup>
        : null
    )
    
    render() {
        return (
            <div>
                {this.showMatches()}
            </div>
        )
    }
}

export default MatchesList;