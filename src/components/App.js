import React from "react";
import ManageDice from "./ManageDice";

function App() {

    return(

        <ManageDice render={
            (params) => (

                <main>

                    <h1 className="title">Tenzies</h1>

                    <div className="dice-container">

                        {params.allDice}

                    </div>

                    <button
                        className="roll-dice"
                        onClick={params.rollDice}
                    >
                        {params.tenzies ? "New Game" : "Roll"}
                    </button>

                </main>

            )
        } />



    )
}

export default App