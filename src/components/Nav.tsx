import React from 'react';
import { Navbar } from 'react-bootstrap';
import AddBookButton from './AddBookButton';
import Searchbar from './Searchbar';
import {navStyle} from 'styleComponent';



const Nav = () => {
    return(
        <Navbar style={navStyle} className=' justify-content-between'>
            <Searchbar />
            <AddBookButton />
        </Navbar>
    );
};

export default Nav;