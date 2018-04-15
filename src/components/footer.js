import React    from 'react';
import styled   from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const DefaultContainer = styled.div`
max-width: 960px;
margin: 0 auto;
padding: 0 24px;
@media (min-width: 700px) {
    padding: 0;
}
`;

const Buffer = styled.div`
padding: 50px 0 150px;
@media (min-width: 700px) {
    padding: 32px 0 24px;
    float: right;
}
`;

const List = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

const AlignRight = styled.div`
@media (min-width: 700px) {
    text-align: right;
    >div {
        text-align: left;
        display: inline-block;
    }
}
`;

const FooterText = styled.small`
opacity: 0.3;
display: block;
margin-top: 24px;
font-size: 12px;
`;

const ListItem = styled.li`
margin-bottom: 8px;
`;

var iconStyle = {
    marginRight: '3px'
};

class Footer extends React.Component {

    render() {
            
        return (
            <DefaultContainer>
                <Buffer>
                    <AlignRight>
                        <div>
                            <h3>Connect Via</h3>
                            <List>
                                <ListItem><i class="far fa-envelope" aria-hidden="true"></i> <a href="mailto:hello@emilydelacruz.com" target="_blank">hello@emilydelacruz.com</a></ListItem>
                                <ListItem><i class="fab fa-twitter" aria-hidden="true"></i> <a href="https://twitter.com/emdecr" target="_blank">twitter</a></ListItem>
                                <ListItem><i class="fab fa-github" aria-hidden="true"></i> <a href="https://github.com/emdecr" target="_blank">github</a></ListItem>
                                <ListItem><i class="fab fa-medium" aria-hidden="true" style={iconStyle}></i> <a href="https://medium.com/@emdecr" target="_blank">medium</a></ListItem>
                            </List>
                        </div>
                    </AlignRight>
                    <FooterText> {ReactHtmlParser('This site is powered by <a href="https://reactjs.org/" target="_blank">React</a> &amp; a <a href="https://developer.wordpress.org/rest-api/" target="_blank">WordPress REST API</a>, and hosted on <a href="https://www.linode.com/" target="_blank">Linode</a>.')} </FooterText>
                </Buffer>
            </DefaultContainer>
        );
    }
}

export default Footer;