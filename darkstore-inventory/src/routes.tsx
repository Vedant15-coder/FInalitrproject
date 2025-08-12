import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import InventoryList from './components/inventory/InventoryList';
import InventoryForm from './components/inventory/InventoryForm';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/inventory" component={InventoryList} />
                <Route path="/inventory/new" component={InventoryForm} />
                <Route path="/inventory/edit/:id" component={InventoryForm} />
                <Route path="/" exact component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default Routes;