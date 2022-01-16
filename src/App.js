import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './Navbar';
import Desserts from './pages/Desserts.jsx';
import Dishes from './pages/Dishes.jsx';
import Dish from './pages/Dish.jsx';
import ReactGa from 'react-ga';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    ReactGa.initialize('UA-166027980-1')

    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <main className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}  />
        <Route exact path="/desserts" component={Desserts} />
        <Route exact path="/dishes" component={Dishes} />
        <Route exact path="/dish/*" component={Dish} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
