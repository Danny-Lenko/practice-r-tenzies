import React from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'

function App() {

    const [dice, setDice] = React.useState(addNewDice())

    function createDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            isHeld: false
        }
    }

    function addNewDice() {
        const diceArr = []
        for (let i = 0; i < 10; i++) {
            diceArr.push(createDie())
        }
        return diceArr
    }

    function rollDice() {
        setDice(prevState => prevState.map(die => (
            !die.isHeld
                ? createDie()
                : die
        )))
    }

    function holdDie(id) {
        setDice(prevState => prevState.map(die => (
            die.id === id
                ? {...die, isHeld: !die.isHeld}
                : die
        )))
    }

    const allDice = dice.map(die => (
        <Die
            id={die.id}
            value={die.value}
            holdDie={() => holdDie(die.id)}
            isHeld={die.isHeld}
        />
    ))


    return(

        <main>

            <h1 className="title">Tenzies</h1>

            <div className="dice-container">

                {allDice}

            </div>

            <button
                className="roll-dice"
                onClick={rollDice}
            >
                Roll
            </button>

        </main>

    )
}

export default App