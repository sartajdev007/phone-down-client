import React from 'react';
import Advertisement from './Advertisement';
import Banner from './Banner';
import Categories from './Categories';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Categories></Categories>
        </div>
    );
};

export default Home;