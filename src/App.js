import { useState } from 'react';
import './styles.css'
import Main from './pages/Main';
import Dev from './pages/Dev';


function App() {
  const [devMode, setDevMode] = useState(false)

  return (
    <div className="App">
      <button onClick={()=>{setDevMode(!devMode)}}>DEV MODE</button>
        {
          !devMode ? <Main/> : <Dev/>
        }
      
    </div>
  );
}

export default App;
