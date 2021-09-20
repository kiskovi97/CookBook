import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import References from './pages/References';
import Navbar from './Navbar';

function App() {
  return (
    <main className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}  />
        <Route exact path="/desserts" component={References} />
        <Route exact path="/dishes" component={References} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
