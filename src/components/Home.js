import React    from 'react';
import DataStore    from './../stores/DataStore.js';

class Home extends React.Component {

    render() {
    	let allData = DataStore.getAll();
        console.log('Whoops!'); 
        console.log(allData);

        return (
            <div>
                <h1 className="headingthing">
                	Tripped over a random wire.
                </h1>
                <p>Back in a bit...</p>
                <a href="https://github.com/emdecr" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
                <a href="https://twitter.com/emdecr" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="http://hypenotic.com/author/edelacruz/" target="_blank"><i className="fa fa-pencil" aria-hidden="true"></i></a>
            </div>
        );
    }
}

export default Home;