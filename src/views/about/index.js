import React    	from 'react';
// import DataStore    from './../../stores/DataStore.js';
import PinShelf 	from './components/shelf/index.js';
import Track 	    from '../../components/latestTrack.js';
import Github 	    from '../../components/github.js';
// import Tweet 		from './../../components/twitter.js';

class About extends React.Component {

    render() {
            
        return (
            <div>
                <h1>About</h1>
                <PinShelf/>
                <Track/>
                <Github/>
            </div>
        );
    }
}

export default About;