import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Authors from './components/authors';
import Tags from './components/tags';
import Home from './components/home';
import Error from './components/error';
import Navigation from './components/navigation';

class App extends Component {
  state = {
    authors: [],
    tags: []
  }
  
  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + '/authors')
    .then(res => res.json())
    .then((data) => {
      this.setState({ authors: data.authors })
    })
    .catch(console.log)
    
    fetch(process.env.REACT_APP_API_URL + '/tags')
    .then(res => res.json())
    .then((data) => {
      this.setState({ tags: data.tags })
    })
    .catch(console.log)
  }
  
  render () {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/authors" component={() => <Authors authors={this.state.authors}/>}/>
             <Route path="/tags" component={() => <Tags tags={this.state.tags}/>}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
      //<Authors authors={this.state.authors} />
    );
  }
}

export default App;
