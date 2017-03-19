import React    from 'react';
import DataStore    from './../stores/DataStore.js';

class About extends React.Component {

    render() {
    	let allMovies = DataStore.getAllMovies();
        console.log(allMovies); 
        
        return (
            <div>
                <h1>This is the About page</h1>
                {allMovies.map((movie) => {
                    return <h2 key={movie.id} to={`/${movie.slug}`} style={{marginRight: '10px'}}>{movie.title.rendered}</h2>
                })}
            </div>
        );
    }
}

export default About;