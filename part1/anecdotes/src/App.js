import anecdotes from './data/anecdotes';
import { useState } from 'react';
import './App.css';

function App() {

  const [selected, setSelected] = useState(0)
  const [votes,setVotes]= useState(() => anecdotes.reduce((v,_a,i) => ({...v, [i] : 0}) ,{}));

  const vote = () => { setVotes({...votes , [selected] : votes[selected] + 1}) };

  const anecdoteDesc = (i) => <>
      <p>{anecdotes[i]}</p>
      <p>It has {votes[i]} votes</p>
  </>

  const mostVoted = Object.keys(votes).reduce( (mv,a) => votes[a] > votes[mv] ? a : mv,0);

  return (
    <div className="App">
      <h1>Anecdote of the Day</h1>
        {anecdoteDesc(selected)}
      <div>
        <button onClick={vote}>Vote</button>
        <button  onClick={() =>{ setSelected(s => (s + 1) % anecdotes.length)}}>Next Anecdote</button>
      </div>
      <h2>Anecdote with Most Vote</h2>
      {anecdoteDesc(mostVoted)}
    </div>
  );
}

export default App;
