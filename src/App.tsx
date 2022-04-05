import { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [normal, setNormal] = useState('');
  const [robber, setRobber] = useState('');

  const handleNormalChange = (event: any) => {
    setNormal(event.target.value);
  }

  const handleRobberChange = (event: any) => {
    setRobber(event.target.value);
  }

  useEffect(() => {
    setRobber(normal.replace(/([bcdfghjklmnpqrstvwxz])/gi, '$1o$1'));
  },[normal]);

  useEffect(() => {
    setNormal(robber.replace(/([bcdfghjklmnpqrstvwxz])o\1/gi, '$1'));
  },[robber]);

  const getJoke = async() => {
    try {
      const json = await fetch('https://v2.jokeapi.dev/joke/Any').then(response => response.json());
      setNormal(json.joke || json.setup + '\n\n' + json.delivery);
    } catch (error) {
      alert('Failed to get Joke :(');
      throw error;
    }
  }

  return (
    <div className="App">
      <div className="container my-4">
        <h1 className='text-center'>Robberlanguage translator</h1>
        <div className="row mt-4">
          <div className="col">
            <label htmlFor={"ta-normal"} className="form-label">Normal language text</label>
            <textarea id="ta-normal" className='form-control w-100' rows={10} placeholder="Type normal text here to translate to Robber language" value={normal} onChange={handleNormalChange}></textarea>
          </div>
          <div className="col">
            <label htmlFor={"ta-robber"} className="form-label">Robber language text</label>
            <textarea id="ta-robber" className='form-control w-100' rows={10} placeholder="Type robber text here to translate to Normal language" value={robber} onChange={handleRobberChange}></textarea>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <button className='btn btn-primary' onClick={getJoke}>Get joke and robber translation</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
