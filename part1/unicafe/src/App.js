import {useState} from 'react';

const StatisticLine = ({ text, value }) => <tr><td>{text} {value}</td></tr>

const Statistics = ({ good, neutral, bad }) =>{

  const total = good + neutral + bad;

  
  
  return(
    <div>
      {
      total === 0 ?
        <p>No Feedback Given.</p>
      :
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={((good-bad)/total).toFixed(2)} />
            <StatisticLine text="Positive" value={(100 * good/total).toFixed(2)  + "  %"} />
          </tbody>
        </table>
      </>
      }
      
    </div>
  )
}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  const stats = {good,neutral,bad}

  return (
    <div className="App">
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(g => g + 1)}>Good</button>
      <button onClick={() => setNeutral(n => n + 1)}>Neutral</button>
      <button onClick={() => setBad(b => b + 1)}>Bad</button>
      <Statistics  {...stats}/>
    </div>
  );
}

export default App;
