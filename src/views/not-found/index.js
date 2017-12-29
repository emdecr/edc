import React    from 'react';
import styled   from 'styled-components';

const DefaultContainer = styled.div`
max-width: 960px;
margin: 0 auto;
padding: 0 24px;
@media (min-width: 700px) {
    padding: 0;
}
`;

const Buffer = styled.div`
padding: 50px 0;
@media (min-width: 700px) {
    padding: 100px 0 50px;
}
`;

class NotFound extends React.Component {

    render() {
            
        return (
            <DefaultContainer>
                <Buffer>
                    <h1>404 - Not Found</h1>
                </Buffer>
            </DefaultContainer>
        );
    }
}

export default NotFound;