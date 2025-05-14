import './App.css';
import { Route, Routes, useLocation } from 'react-router';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './Navbar';
import Desserts from './pages/Desserts.jsx';
import Dishes from './pages/Dishes.jsx';
import DBDishes from './pages/DBDishes.jsx';
import Testing from './pages/Testing.jsx';
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
      <Routes>
        <Route exact path="/" element={<Home/>}  />
        <Route exact path="/desserts" element={<Desserts/>} />
        <Route exact path="/dishes" element={<Dishes/>} />
        <Route exact path="/dbdishes" element={<DBDishes/>} />
        <Route exact path="/dish/*" element={<Dish/>} />
        <Route exact path="/test" element={<Testing/>} />
        <Route component={Error} />
      </Routes>
    </main>
  );
}

export default App;
