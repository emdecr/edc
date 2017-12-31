import React    from 'react';
import styled   from 'styled-components';

class Loader extends React.Component {

    render() {
            
        return (
            <div>
                <div className="loading-spinner"></div>
            </div>
        );
    }
}

export default Loader;