import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import PlanetDetail from "./components/PlanetDetail"
import {BrowserRouter, Route, Routes} from 'react-router-dom' 
function App() {
  return (
    <div className="App py-3">
      <BrowserRouter >
          <NavBar/>
          <Routes>
            <Route path='/' exact  element={<HomePage/>}/>
            <Route path='/planet-Detail/:name' exact  element={<PlanetDetail/>}/>
          </Routes>
      </BrowserRouter >
    </div>
  );
}

export default App;
