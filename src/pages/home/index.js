import React        from 'react';
import DataStore    from './../../stores/DataStore.js';

class Home extends React.Component {

    render() {
    	let allData = DataStore.getAll();
        console.log('Whoops!');
        console.log('New site coming soon...'); 
        console.log('Headless CMS setup.'); 
        console.log('I\'m excited.');
        console.log('Here\'s an object with some placeholder data...');
        console.log(allData);
        return (
            <div>
                <h1 className="headingthing">
                	Tripped over a random wire.
                </h1>
                <p>Back in a bit...</p>
                <a href="https://emilydelacruz.com/archive/v1/" title="Archived Site" target="_blank"><i className="fa fa-archive" aria-hidden="true"></i></a>
                <a href="https://github.com/emdecr" title="Github" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
                <a href="https://twitter.com/emdecr" title="Twitter" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="http://hypenotic.com/author/emdecr/" title="Hypenotic Articles" target="_blank"><i className="fa fa-pencil" aria-hidden="true"></i></a>
            </div>
        );
    }
}

export default Home;