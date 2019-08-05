import React from 'react';
import Layout from './Components/Layout/Layout';
import { Switch, Route } from 'react-router-dom'; 

import PrivateRoutes from './Components/AuthRoutes/PrivateRoutes';
import PublicRoute from './Components/AuthRoutes/PublicRoutes';

import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Team from './Components/Team';
import Matches from './Components/Matches';
import NotFound from './Components/UI/notFound';

import Dashboard from './Components/Admin/Dashboard';
import AdminMatches from './Components/Admin/matches';
import AddEditMatches from './Components/Admin/matches/AddEditMatches';
import AdminPlayers from './Components/Admin/players';
import AddEditPlayers from './Components/Admin/players/AddEditPlayers';

const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
                <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches}/>
                <PrivateRoutes {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatches}/>
                <PrivateRoutes {...props} path="/admin_matches/edit_match" exact component={AddEditMatches}/>
                <PrivateRoutes {...props} path="/admin_players" exact component={AdminPlayers}/>
                <PrivateRoutes {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers}/>
                <PrivateRoutes {...props} path="/admin_players/add_players" exact component={AddEditPlayers}/>

                <PublicRoute {...props} restricted={true} path="/sign-in" exact component={SignIn}/>
                <PublicRoute {...props} restricted={false} path="/team" exact component={Team}/>
                <PublicRoute {...props} restricted={false} path="/matches" exact component={Matches}/>
                <PublicRoute {...props} restricted={false} path="/" exact component={Home}/>
                <PublicRoute {...props} restricted={false} exact component={NotFound}/>

            </Switch>
        </Layout>
    )
}

export default Routes;
