import React from 'react'

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }

    return(

        <div className="die-face"
            onClick={() => props.holdDice(props.id)}
            style={styles}
        >
            <div className="die-num">
                {props.value}
            </div>
        </div>

    )
}