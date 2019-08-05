import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../UI/misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

class AdminMatches extends Component {

    state = {
        isLoading: true,
        matches: []
    }

    componentDidMount() { //once component has rendered, set data
        firebaseMatches.once('value')
            .then((snapshot) => {
                const matches = firebaseLooper(snapshot);

                this.setState({
                    isLoading: false,
                    matches: reverseArray(matches)
                });
            });
    }

    render() {
        return (
            <Sidebar>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Match</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    this.state.matches ? 
                                        this.state.matches.map((match, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{match.date}</TableCell>
                                                <TableCell className="matches-cell">
                                                    <Link to={`/admin_matches/edit_match/${match.id}`}>
                                                        {match.away} <strong>-</strong> {match.local} <span className="matches-edit"> Edit</span>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="matches-tag__yellow">{match.resultAway}</span> <strong>-</strong> <span className="matches-tag__yellow">{match.resultLocal}</span>
                                                </TableCell>
                                                <TableCell>
                                                    { match.final === 'Yes' ?
                                                        <span className="matches-tag__red">Final</span>
                                                        : <span className="matches-tag__green">Not played yet</span>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                
                    <div className="admin-progress">
                        { this.state.isLoading ?  
                            <CircularProgress style={{ color:'#00285e' }}/>
                            : null
                        }
                    </div>
                </div>
            </Sidebar>
        )
    }
}

export default AdminMatches;