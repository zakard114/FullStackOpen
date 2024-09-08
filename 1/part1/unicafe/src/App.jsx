import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)


const GiveFeedback = ({ goodClickHandler, neutralClickHandler, badClickHandler }) => {
    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={goodClickHandler} text="good"/>
            <Button handleClick={neutralClickHandler} text="neutral"/>
            <Button handleClick={badClickHandler} text="bad"/>
        </div>
    )

}


const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
    )


const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    // Displays a message when there is no feedback;
    // To avoid ZeroDivisionError in future calculations
    if (all === 0){
        return <p>No feedback given</p>
    }

    // Calculate statistics only when there is feedback
    const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all
    const positive = (good / all) * 100

    return (
        <div>
            <h2>statistics</h2>   
            <table>
                <tbody>
                    <StatisticLine text='good' value={good} />
                    <StatisticLine text='neutral' value={neutral} />
                    <StatisticLine text='bad' value={bad} />
                    <StatisticLine text='all' value={all} />
                    <StatisticLine text='average' value={average.toFixed(1)} />
                    <StatisticLine text='positive' value={positive.toFixed(1) + ' %'} />
                </tbody>
            </table>
        </div>
        )
    }


const App = () => {
  // State variables for feedback counts
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => {
    const updateGood = good + 1
    setGood(updateGood)
  }

  const neutralClickHandler = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const badClickHandler = () => {
    const updateBad = bad + 1
    setBad(updateBad)
  }

  return (
    <div>
        <GiveFeedback 
            goodClickHandler={goodClickHandler}
            neutralClickHandler={neutralClickHandler}
            badClickHandler={badClickHandler}
        />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App