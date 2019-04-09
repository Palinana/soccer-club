import React from 'react';

const matchesBlock = ({match}) => {
    return (
        <div className="match-block">
            <div className="match-data">
                {match.final ? match.date : `Match not played yet: ${match.date}`}
            </div>

            <div className="match-wrapper">
                <div className="match-top">
                    <div className="match-top__left">
                        <div className="match-icon" style={{
                            background: `url(/images/icons/${match.localThmb}.png)`
                        }}
                        ></div>
                        <div className="match-team__name">{match.local}</div>
                    </div>
                    <div className="match-top__right">
                        {match.final ? match.resultLocal : '-'}
                    </div>
                </div>

                <div className="match-bottom">
                    <div className="match-top__left">
                        <div className="match-icon" style={{
                            background: `url(/images/icons/${match.awayThmb}.png)`
                        }}
                        ></div>
                        <div className="match-team__name">{match.away}</div>
                    </div>
                    <div className="match-top__right">
                        {match.final ? match.resultAway : '-'}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default matchesBlock;