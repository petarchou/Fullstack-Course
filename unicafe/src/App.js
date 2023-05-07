import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const voteGood = () => (setGood(good + 1))
  const voteNeutral = () => setNeutral(neutral + 1);
  const voteBad = () => setBad(bad + 1);

  const buttons = [
    {
      value: "Good",
      handleClick: voteGood,
    },
    {
      value: "Neutral",
      handleClick: voteNeutral,
    },
    {
      value: "Bad",
      handleClick: voteBad,
    }
  ];

  const votes = [
    {
      type: "Good",
      amount: good,
    },
    {
      type: "Neutral",
      amount: neutral,
    },
    {
      type: "Bad",
      amount: bad,
    },
  ]

  return (
    <div>
      <Feedback buttons={buttons} />
      <Statistics votes={votes}/>
    </div>
  )
}


const Feedback = ({ buttons }) => {

  return (
    <div>
      <h1>Give Feedback</h1>
      {buttons.map(button => {
        return (
          <FeedbackBtn key={button.value} value={button.value} handleClick={button.handleClick} />
        )
      })}
    </div>
  )
}

const FeedbackBtn = ({ value, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {value}
    </button>
  )
}

const Statistics = ({votes}) => {

  return (
    <div>
      <h1>Statistics</h1>
      {
        votes.map(vote => {
          return (
            <VoteAmounts key={vote.type} type={vote.type} amount={vote.amount}/>
          )
        })
      }
      <StatsAggregate votes={votes}/>
    </div>
  )

}

const StatsAggregate = ({votes}) => {
  
  const {totalVotes, positivityScore, positiveVotes} = calculateVotes(votes);

  const average = positivityScore/totalVotes || 0;
  const positivePercent = (positiveVotes/totalVotes * 100) || 0;

  return (
    <div>
      average {average}
      <br/>
      positive {positivePercent} %
    </div>
  )
}

const VoteAmounts = ({type, amount}) => (
  <div>
    {type} {amount}
  </div>
)

const calculateVotes = (votes) => {
  let totalVotes = 0, positivityScore = 0, positiveVotes = 0;
  votes.forEach(vote => {
    if(vote.type.localeCompare('Good') === 0) {
      positiveVotes+= vote.amount;
      positivityScore += vote.amount;
    }
    else if(vote.type.localeCompare('Bad') === 0) {
      positivityScore -= vote.amount;
    }
    totalVotes += vote.amount;
  });

  return {
    totalVotes,
    positiveVotes,
    positivityScore
  }
}

export default App