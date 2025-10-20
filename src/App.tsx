import { useEffect, useState } from "react"
import Card from "./components/Card"
import { loadData } from "./services/jsonReadSaervice"

export type cardType = {
  enemyName: string,
  enemyIcon: string,
  level: number,
  revard: string,
  penalty: string
}


const App = () => {

  const [enemies, setEnemies] = useState<cardType[]>([])

  const [currentEnemy, setCurrentEnemy] = useState<cardType>()
  
  const [healthBar, setHealthBar] = useState<string>("❤❤❤")
  const [dmgBar, setDmgBar] = useState<string>("")

  const [talon1, setTalon1] = useState<cardType>()
  const [talon2, setTalon2] = useState<cardType>()

  const getRndInteger = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


  useEffect(() => {
    loadData()
      .then(data => {
        setEnemies(data)
    })
  }, [])

  useEffect(() => {
    if (healthBar.length == 0)
        window.location.reload()
  }, [healthBar])


  const pullNewCard = () => {
    if(!currentEnemy && enemies)
    {
      setCurrentEnemy(enemies[Math.floor(Math.random() * enemies.length)])
    }
  }

  const rollDice = () => {
    const dmg = getRndInteger(1, 6)
    console.log(dmg)
    
    if (!currentEnemy)
      return

    if (dmg + dmgBar.length >= currentEnemy.level)
    {
      if (currentEnemy.revard == "🥇")
      {
        alert("Győztél!")
        window.location.reload()
      }

      if (healthBar.length < 5 && currentEnemy.revard.includes("❤"))
        setHealthBar(healthBar + "❤")
      if (dmgBar.length < 5 && currentEnemy.revard.includes("⚔"))
        setDmgBar(dmgBar + "⚔")
      
      setEnemies(prev => prev.filter(e => e !== currentEnemy))
      setCurrentEnemy(undefined)
    }      
    else
    {
      const penaltyArray = currentEnemy.penalty.split("")
      penaltyArray.forEach(element => {
        if (element == "❤")
          setHealthBar(healthBar.replace("❤", ""))
        if (element == "⚔")
          setDmgBar(dmgBar.replace("⚔", ""))
      });
    }
    
  }

  const flee = () => {
    if (!currentEnemy)
      return

    if (talon1 && talon2)
      return

    if (!talon1)
      setTalon1(currentEnemy)
      setEnemies(prev => prev.filter(e => e !== currentEnemy))
      setCurrentEnemy(undefined)

    if (talon1 && !talon2)
      setTalon2(currentEnemy)
      setEnemies(prev => prev.filter(e => e !== currentEnemy))
      setCurrentEnemy(undefined)
    
  }

  const fightTalon = (talonId: number) => {
    if (talonId === 1 && talon1) {
    setCurrentEnemy(talon1)

      if (talon2)
      {
        setTalon1(talon2)
        setTalon2(undefined)
      } 
      else
      {
        setTalon1(undefined)
      }
    }

    if (talonId === 2 && talon2) {
      setCurrentEnemy(talon2)
      setTalon2(undefined)
    }
  }

  return (
    <div className="container">

      <section className="talon">
        <h1>Talon: Max 2</h1>
        <div className="talonCardsContainer">
          <div className="talon1">
            {talon1 ? <Card {...talon1}></Card> : <div style={{width: "200px", height: "300px"}}></div>}
            {talon1 ? <button onClick={() => fightTalon(1)}>Fight ⚔️</button> : <></>}
          </div>
          <div className="talon2">
            {talon2 ? <Card {...talon2}></Card> : <div style={{width: "200px", height: "300px"}}></div>}
            {talon2 ? <button onClick={() => fightTalon(2)}>Fight ⚔️</button> : <></>}
          </div>
        </div>
      </section>

      <section className="centerSec">
        {currentEnemy ? <Card {...currentEnemy}></Card> : <div style={{width: "200px", height: "300px"}}></div>}

        <button onClick={rollDice} >Roll 🎲</button>
        <button onClick={flee}>Flee 🏃</button>
      </section>

      <section className="rightSec">
        <h2>Max 5 Hp</h2>
        <span>{healthBar}</span>

        <h2>Max 5 +Dmg</h2>
        <span>{dmgBar}</span>

        <img src="/stack.png"  onClick={pullNewCard}/>
      </section>
      
    </div>
  )
}

export default App