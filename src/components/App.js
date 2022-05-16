import React from "react";
import Die from "./Die"
import { nanoid } from 'nanoid'

function App() {

    const [dice, setDice] = React.useState(addNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {

        const allEqual = dice.every((die,i,arr) => die.value === arr[0].value)
        const allHeld = dice.every(die => die.isHeld)
        if (allEqual && allHeld) setTenzies(true)

    }, [dice])

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

        if (!tenzies) {

            setDice(prevState => prevState.map(die => (
                !die.isHeld
                    ? createDie()
                    : die
            )))

        } else {

            setTenzies(false)
            setDice(addNewDice())

        }
    }

    function holdDie(id) {
        setDice(prevState => prevState.map(die => (
            die.id === id
                ? {...die, isHeld: !die.isHeld}
                : die
        )))
    }

    const allDice = dice.map(die => (
        <Die key={die.id}
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
                {tenzies ? "New Game" : "Roll"}
            </button>

        </main>

    )
}

export default App