import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebaseMatches } from '../../firebase';
import { firebaseLooper, reverseArray } from '../UI/misc';

import LeagueTable from './LeagueTable';
import MatchesList from './MatchesList';

class Matches extends Component {

    state = {
        loading: true,
        matches: [],
        filterMatches: [],
        playedFilter: 'All',
        resultFilter: 'All'
    }


    componentDidMount() {
        firebaseMatches.once('value')
        .then((snapshot) => {
            const matches = firebaseLooper(snapshot);

            this.setState({
                loading: false,
                matches: reverseArray(matches),
                filterMatches: reverseArray(matches)
            });
        })
    }

    showPlayed = (played) => {
        const list = this.state.matches.filter((match) => {
            return match.final === played
        });
        this.setState({
            filterMatches: played === 'All' ? this.state.matches : list,
            playedFilter: played,
            resultFilter: 'All'
        });
    }

    showResult = (result) => {
        const list = this.state.matches.filter((match) => {
            return match.result === result
        });
        this.setState({
            filterMatches: result === 'All' ? this.state.matches : list,
            playedFilter: 'All',
            resultFilter: result
        });
    }

    render() {
        const state = this.state;

        return (
            <div className="matches-container">
                <div className="matches__wrapper">
                    <div className="matches__left">
                        <div className="matches-filters">
                            <div className="matches-filters__box">
                                <div className="tag">Show Match</div>
                                <div className="cont">
                                    <div className={`option ${state.playedFilter === 'All' ? 'active' : ''}`}
                                        onClick={() => this.showPlayed('All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${state.playedFilter === 'Yes' ? 'active' : ''}`}
                                        onClick={() => this.showPlayed('Yes')}
                                    >
                                        Played
                                    </div>
                                    <div className={`option ${state.playedFilter === 'No' ? 'active' : ''}`}
                                        onClick={() => this.showPlayed('No')}
                                    >
                                        Not played
                                    </div>
                                </div>
                            </div>

                            <div className="matches-filters__box">
                                <div className="tag">Result Game</div>
                                <div className="cont">
                                    <div className={`option ${state.resultFilter === 'All' ? 'active' : ''}`}
                                        onClick={() => this.showResult('All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${state.resultFilter === 'W' ? 'active' : ''}`}
                                        onClick={() => this.showResult('W')}
                                    >
                                        W
                                    </div>
                                    <div className={`option ${state.resultFilter === 'L' ? 'active' : ''}`}
                                        onClick={() => this.showResult('L')}
                                    >
                                        L
                                    </div>
                                    <div className={`option ${state.resultFilter === 'D' ? 'active' : ''}`}
                                        onClick={() => this.showResult('D')}
                                    >
                                        D
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MatchesList matches={state.filterMatches}/>
                    </div>

                    <div className="matches__right">
                        <LeagueTable />
                    </div>
                </div>
            </div>
        )
    }
}

export default Matches;