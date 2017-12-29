import React    from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import styled from 'styled-components';

const List = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

const ItemLabel = styled.small`
opacity: 0.5;
`;

class Github extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         githubEvents: []
    //     };
    // }

    // componentWillMount() {
    //     axios.get('https://api.github.com/users/emdecr/events')
    //     .then((result)=> {
    //       let latest = result.data.slice(0, 5)
    //     //   console.log(result.data)
    //       this.setState({
    //         githubEvents: latest
    //       });               
    //     })
    // }

    render() {
            
        return (
            <div>
                <h2><a href="https://github.com/emdecr" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a> Github Event Feed</h2>
                <List>
                {this.props.github.map((event) =>
                    {
                        let newType = event.type.replace(/([A-Z])/g, ' $1').trim()
                        let type = newType.replace(" Event", "")
                        if (event.type == 'PushEvent'){
                            let branchArray = event.payload.ref.split("/")
                            let branch = branchArray[2]
                            return <li key={event.id}><ItemLabel><Moment fromNow date={event.created_at} /> - {type}</ItemLabel><p>B: {branch}, CM: <a href={'https://github.com/' + event.repo.name + '/commit/' + event.payload.commits[0].sha} target="_blank>">{event.payload.commits[0].message}</a></p></li>
                        }else if (event.type == 'WatchEvent'){
                            return <li key={event.id}><ItemLabel><Moment fromNow date={event.created_at} /> - {type}</ItemLabel><p><a href={'https://github.com/' + event.repo.name} target="_blank>">{event.repo.name}</a></p></li>
                        }else{
                            return <li key={event.id}><ItemLabel><Moment fromNow date={event.created_at} /> - {type}</ItemLabel><p><a href={'https://github.com/' + event.repo.name} target="_blank>">{event.repo.name}</a></p></li>
                        }
                    }
                )}
                </List>
            </div>
        );
    }
}

export default Github;