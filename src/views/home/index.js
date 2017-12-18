import React        from 'react';
// import DataStore    from './../../stores/DataStore.js';

class Home extends React.Component {

    render() {
    	// let allData = DataStore.getAll();
        console.log('New site coming soon...'); 
        // console.log(allData);
        return (
            <div className="main-container">
                <p>011101010110111001100100011001010111001000100000011000110110111101101110011100110111010001110010011101010110001101110100011010010110111101101110001011100010000001100010011100100110001000101110</p>
                <p>under construction. brb.</p>
                <p><a href="https://twitter.com/emdecr" target="_blank">twitter</a > | <a href="https://github.com/emdecr" target="_blank">github</a></p>
            </div>
        );
    }
}

export default Home;