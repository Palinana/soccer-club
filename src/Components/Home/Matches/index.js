import React from 'react';
import Blocks from './Blocks';
import { Tag } from '../../UI/misc';

const Matches = () => {
    return (
        <div className="home-matches__wrapper">
            <div className="container">
                <Tag 
                    bck="#781034"
                    size="50px"
                    color="#ffffff"
                >
                    Matches
                </Tag>
                <Blocks />
                <Tag
                    bck="#ffffff"
                    size="22px"
                    color="#781034"
                    link={true}
                    linkTo="/team"
                >
                    See more matches
                </Tag>
            </div>
        </div>
    )
}

export default Matches;
