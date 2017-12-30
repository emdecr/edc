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
    padding: 32px 0 50px;
    float: right;
}
`;

const List = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

const ListItem = styled.li`
margin-bottom: 8px;
`;

class Footer extends React.Component {

    render() {
            
        return (
            <DefaultContainer>
                <Buffer>
                    <h3>Connect Via</h3>
                    <List>
                        <ListItem><i class="fa fa-envelope-o" aria-hidden="true"></i> <a href="mailto:hello@emilydelacruz.com" target="_blank">hello@emilydelacruz.com</a></ListItem>
                        <ListItem><i class="fa fa-twitter" aria-hidden="true"></i> <a href="https://twitter.com/emdecr" target="_blank">twitter</a></ListItem>
                        <ListItem><i class="fa fa-github" aria-hidden="true"></i> <a href="https://github.com/emdecr" target="_blank">github</a></ListItem>
                    </List>
                </Buffer>
            </DefaultContainer>
        );
    }
}

export default Footer;