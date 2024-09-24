import { useSelector } from "react-redux"
import React from 'react'


const WaypointContainer =() => {
    const waypoints = useSelector((state)=> state.genSettings.waypoints)
    return (
        <div style={styles.waypoints}>
        <h3>Waypoint List:</h3>
            <ul>
            {waypoints.length === 0 ? 
            (<li>No Waypoints Yet</li>) : (
                waypoints.map((waypoint, index) => (
                <li key={index}>{waypoint}</li>
                ))
            )}
            </ul>
        </div>
    )
}


const styles= {
    waypoints: {
        border: '1px solid black',
        display: 'flex',
        position: 'absolute',
        right: '20',
        height: '530px',
        width: '300px',
        flexDirection: 'column',
        padding: '10px',
        borderRadius: '5px',
      }
}

export default WaypointContainer