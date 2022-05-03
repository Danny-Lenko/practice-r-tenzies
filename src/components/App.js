import React from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(createAllDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const allEqual = dice.every(
            (die, i, arr) => arr[0].value === die.value
        )

        if (allHeld && allEqual) setTenzies(true)
    }, [dice])

    function createAllDice() {
        const arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(createDie())
        }
        return arr
    }

    function createDie() {
        return({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        })
    }

    function holdDice(id) {
        setDice(prevState => prevState.map(die => (
            die.id === id
                ? {...die, isHeld: !die.isHeld}
                : die
        )))
    }

    function rollDice() {

        if (!tenzies) {

            setDice(prevState => prevState.map(die => (
                die.isHeld
                    ? die
                    : createDie()
            )))

        } else {

            setDice(createAllDice)
            setTenzies(false)

        }
    }

    const allDice = dice.map(die => (
        <Die key={die.id}
            value={die.value}
            id={die.id}
            holdDice={holdDice}
            isHeld={die.isHeld}
        />
    ))

    return(

        <main>

            {tenzies && <Confetti />}

            <h1 className="title">
                Tenzies
            </h1>

            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>

            <div className="dice-container">
                {allDice}
            </div>

            <button className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? 'New Game' : 'Roll'}
            </button>

        </main>

    )
}