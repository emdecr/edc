import React    from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import styled from 'styled-components';

const List = styled.ul`
list-style-type: none;
`;

class Github extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            githubEvents: []
        };
    }

    componentWillMount() {
        axios.get('https://api.github.com/users/emdecr/events')
        .then((result)=> {
          let latest = result.data.slice(0, 5)
          console.log(result.data)
          this.setState({
            githubEvents: latest
          });               
        })
    }

    render() {
            
        return (
            <div>
                <h2>Github</h2>
                <List>
                {this.state.githubEvents.map((event) =>
                    {
                        let newType = event.type.replace(/([A-Z])/g, ' $1').trim()
                        let type = newType.replace(" Event", "")
                        if (event.type == 'PushEvent'){
                            let branchArray = event.payload.ref.split("/")
                            let branch = branchArray[2]
                            return <li key={event.id}><small><Moment fromNow date={event.created_at} /> – {type}</small><p>B: {branch}, CM: <a href={event.payload.commits[0].url} target="_blank>">{event.payload.commits[0].message}</a></p></li>
                        }else if (event.type == 'WatchEvent'){
                            return <li key={event.id}><small><Moment fromNow date={event.created_at} /> – {type}</small><p><a href={event.repo.url} target="_blank>">{event.repo.name}</a></p></li>
                        }else{
                            return <li key={event.id}><Moment fromNow date={event.created_at} /> | {type} </li>
                        }
                    }
                )}
                </List>
            </div>
        );
    }
}

export default Github;