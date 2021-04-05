import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Auth from './Auth';
import Nav from './Nav';
import BookList from './BookList';
import { userObjType } from 'modules/actions/user_action';

interface Props {
    userObj: userObjType
};

const AppRouter = (props:Props) => {
    const {userObj} = props;

    return (
        <BrowserRouter>
            <Switch>
                {userObj.isLoggin ? 
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