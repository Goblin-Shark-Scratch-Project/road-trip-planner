import React, {useState, useEffect} from 'react';

const SavedTrips = () => {
    return(
        <div style={styles.savedBox}>
            <h3>Saved Trips:</h3>
            Trip to Texas!
            <br></br>
            ...
        </div>
    )
}


const styles = {
    savedBox: {
        border: '1px solid black',
        width: '300px',
        height: '530px',
        margin: 'auto 0',
        padding: '10px',
        borderRadius: '5px'
    }
}

export default SavedTrips;