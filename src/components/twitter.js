import React    from 'react';
import axios from 'axios';
// import DataStore    from './../../../../stores/DataStore.js';

class Tweet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount() {
        axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=emdecr&count=1',{ headers: { Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAK4RywAAAAAAH1G3CRnpJS9xEHFjr2iYEpf%2BkSg%3D8dUMUD4hbDDrb8R8RzMZ3SlkvR5O01e0K5fBEyr9uoN8zWp42m' } })
        .then((result)=> {
        //   const thisData = result;
          console.log(result.data.items)
          this.setState({
            items: result.data.items
          });               
        })
    }

    render() {
            
        return (
            <div>
                <h1>This is the Twitter Component</h1>
            </div>
        );
    }
}

export default Tweet;