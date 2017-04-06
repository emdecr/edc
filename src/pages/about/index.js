import React    	from 'react';
import DataStore    from './../../stores/DataStore.js';
import PinShelf 	from './components/shelf/index.js';

class About extends React.Component {

    render() {
            
        return (
            <div>
                <h1>This is the About page</h1>
                <PinShelf/>
            </div>
        );
    }
}

export default About;