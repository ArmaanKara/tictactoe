import React from "react";
import './ResetButton.css'

const ResetButton = () => {

    const onClickHandler = () => {
        return window.location.reload(false)
    }

    return(
        <button className="reset" onClick={() => onClickHandler()}>Reset</button>
    )
}

export default ResetButton