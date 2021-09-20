import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './Navbar';
import Desserts from './pages/Desserts.jsx';
import Dishes from './pages/Dishes';

function App() {
  return (
    <main className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}  />
        <Route exact path="/desserts" component={Desserts} />
        <Route exact path="/dishes" component={Dishes} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
