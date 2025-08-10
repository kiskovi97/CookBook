import './App.css';
import { Route, Routes, useLocation } from 'react-router';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './Navbar';
import Dishes from './pages/Dishes.jsx';
import DBDish from './pages/DBDish.jsx';
import Testing from './pages/Testing.jsx';
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
      <Routes>
        <Route exact path="/" element={<Navbar search/>}  />
        <Route exact path="/desserts" element={<Navbar/>} />
        <Route exact path="/dishes" element={<Navbar/>} />
        <Route exact path="/all" element={<Navbar/>} />
        <Route exact path="/dbdish/*" element={<Navbar/>} />
        <Route exact path="/test" element={<Navbar/>} />
        <Route element={<Navbar/>} />
      </Routes>
      <Routes>
        <Route exact path="/" element={<Home/>}  />
        <Route exact path="/desserts" element={<Dishes tag="dessert"/>} />
        <Route exact path="/dishes" element={<Dishes tag="main"/>} />
        <Route exact path="/all" element={<Dishes tag=""/>} />
        <Route exact path="/dbdish/*" element={<DBDish/>} />
        <Route exact path="/test" element={<Testing/>} />
        <Route element={<Error/>} />
      </Routes>
    </main>
  );
}

export default App;
