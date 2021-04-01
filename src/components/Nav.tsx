import React from 'react';
import AddBookButton from './AddBookButton';
import Searchbar from './Searchbar';

const Nav = () => {
    return(
        <header>
            <Searchbar />
            <AddBookButton />
        </header>
    );
};

export default Nav;