import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './Navbar';
import Desserts from './pages/Desserts.jsx';
import Dishes from './pages/Dishes.jsx';
import Dish from './pages/Dish.jsx';
import ReactGa from 'react-ga';
import { useEffect } from 'react';

function usePageViews() {
    let location = useLocation();
    useEffect(()=> {
      if (!window.GA_INITIALIZED) {
        ReactGa.initialize('UA-166027980-1');
        window.GA_INITIALIZED = true;
      }
      ReactGa.set({ page: location.pathname});
      ReactGa.pageview(location.pathname + location.search);
    }, [location])
}

function App() {
  usePageViews();
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
