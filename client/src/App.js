import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateVideogame from './components/CreateVideogame'
import Detail from './components/Detail'
import Error404 from './components/Error404'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/create' component={CreateVideogame} />
          <Route exact path='/videogame/:id' component={Detail} />
          <Route path='*' component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;