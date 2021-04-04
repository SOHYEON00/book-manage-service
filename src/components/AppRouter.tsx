import React from 'react';
import { Route, RouteComponentProps, BrowserRouter, Switch } from 'react-router-dom';
import Auth from './Auth';
import Nav from './Nav';
import BookList from './BookList';

interface Props {
    isLogin: boolean,
    userObj: object
};

const AppRouter = (props:Props) => {
    const {isLogin, userObj} = props;

    return (
        <BrowserRouter>
            <Switch>
                {isLogin ? 
                    <Route exact path='/'>
                        <Nav />
                        <BookList />
                    </Route>
                    :
                    <Route exact path='/'>
                        <Auth />
                    </Route>
                }
            </Switch>
        </BrowserRouter>
    );
}

export default AppRouter;