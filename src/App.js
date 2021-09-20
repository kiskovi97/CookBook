import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import Work from './pages/Work';
import References from './pages/References';
import Navbar from './Navbar';

function App() {
  return (
    <main className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}  />
        <Route exact path="/about" component={About} />
        <Route exact path="/work" component={Work} />
        <Route exact path="/references" component={References} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
