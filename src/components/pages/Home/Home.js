import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../shared/Loader';
import Advertisement from './Advertisement';
import Banner from './Banner';
import Categories from './Categories';
import Features from './Features';


const Home = () => {
    const { loading } = useContext(AuthContext)

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <Categories></Categories>
            <Features></Features>
        </div>
    );
};

export default Home;