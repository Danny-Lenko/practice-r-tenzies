import React from "react";
import {nanoid} from "nanoid";
import Die from "./Die";

function ManageDice(props) {

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

        <div>
            {props.render({
                tenzies: tenzies,
                rollDice: rollDice,
                allDice: allDice,
            })}
        </div>

    )
}

export default ManageDice