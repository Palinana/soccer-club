import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../UI/misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

class AdminPlayers extends Component {

    state = {
        isLoading: true,
        players: []
    }

    componentDidMount() {
        firebasePlayers.once('value')
            .then((snapshot) => {
                const players = firebaseLooper(snapshot);

                this.setState({
                    isLoading: false,
                    players: reverseArray(players)
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
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    this.state.players ? 
                                        this.state.players.map((player, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="matches-cell">
                                                    <Link to={`/admin_players/add_players/${player.id}`}>
                                                        {player.name} <span className="matches-edit"> Edit</span>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="matches-cell">
                                                    <Link to={`/admin_players/add_players/${player.id}`}>
                                                        {player.lastname} <span className="matches-edit"> Edit</span>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {player.number}
                                                </TableCell>
                                                <TableCell>
                                                    {player.position}
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

export default AdminPlayers;
