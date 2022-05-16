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

    const allDice = dice.map(die => (
        <Die id={die.id} value={die.value} />
    ))


    return(

        <main>

            <h1 className="title">Tenzies</h1>

            <div className="dice-container">

                {allDice}

            </div>

        </main>

    )
}

export default App