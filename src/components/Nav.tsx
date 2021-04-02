import React from 'react';
import { Navbar } from 'react-bootstrap';
import AddBookButton from './AddBookButton';
import Searchbar from './Searchbar';

const navStyle = {
    padding: 0,
    marginTop: '3rem',
    marginBottom: '1rem'
};


const Nav = () => {
    return(
        <Navbar style={navStyle} className=' justify-content-between'>
            <Searchbar />
            <AddBookButton />
        </Navbar>
    );
};

export default Nav;