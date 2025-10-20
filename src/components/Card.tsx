import type { cardType } from "../App"


const Card = (props: cardType) => {
  return (
    <div className="card">
      <span>{props.enemyIcon}</span>
      
      <h1>Level {props.level}</h1>
      <p>Reward: {props.revard}</p>
      <p>Penalty: {props.penalty}</p>
    </div>
  )
}

export default Card