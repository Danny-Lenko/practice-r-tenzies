import React from "react";

function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }

    return(

        <div
            className="die-face"
            style={styles}
            onClick={props.holdDie}
        >

            <p className="die-num">
                {props.value}
            </p>

        </div>

    )
}

export default Die