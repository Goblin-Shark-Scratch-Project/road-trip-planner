import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateDestination,
  updateOrigin,
  updateStep,
  updateWaypoints
} from '../features/genSettings/genSettingsSlice';

const Settings = () => {
  const origin = useSelector((state) => state.genSettings.origin);
  const destination = useSelector((state) => state.genSettings.destination);
  const step = useSelector((state) => state.genSettings.step);
  const dispatch = useDispatch();

  function chunkRoute () {
    async function getData() {
      const response = await fetch(
        `/corsproxy/directions?url=https://maps.googleapis.com/maps/api/directions/json&key=AIzaSyBgxv1mUqaMXN3hkGTaXLN1X3Lhc87pLN4&destination=New+York&origin=Los+Angeles`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
          },
        }
      )
      const data = await response.json();
      // console.dir(data);
      //    initialize waypoints array = []
      const waypoints = [];
      let totalDist = 0;
      const stepInMeters = step * 1609;
      //    iterate through legs array, set totalDist = 0
      //        iterate through each leg's steps array,
      for ( const step of data.routes[0].legs[0].steps){
      //              for each step, add its distance to the totalDist
        totalDist += step.distance.value;
        // if totalDist is greater than chunkLength:
        if (totalDist > stepInMeters){
           // add the startLocation (place id maybe?) from the step to our own waypoints array
          waypoints.push(`${step.start_location.lat},${step.start_location.lng}`);
          
          // reset the totalDist to 0
          totalDist = 0;
        }
      }
      console.dir(waypoints);
      dispatch(updateWaypoints(waypoints));
       //    include waypoints array into the embedded map src url
    }
    // check for step if its nothing, return early
    if (!step) return;
    // fetch request to routes api using origin and destination
    getData();
  }


  return (
    <div style={styles.settings}>
      <form style={styles.top}>
        <label htmlFor='from'>From:</label>
        <input
          id='from'
          type='text'
          value={origin}
          onChange={(e) => dispatch(updateOrigin(e.target.value))}
        ></input>

        <label htmlFor='to'>To:</label>
        <input
          id='to'
          type='text'
          value={destination}
          onChange={(e) => dispatch(updateDestination(e.target.value))}
        ></input>

        <label htmlFor='steps'>Step:</label>
        <input
          id='steps'
          type='number'
          value={step}
          onChange={(e) => dispatch(updateStep(e.target.value))}
        ></input>
      </form>

      <form style={styles.bottom}>
        {/* <label htmlFor='from'>Chunk Trip By:</label>
        <select name='milesTime'>
          <option>Select One</option>
          <option>Miles</option>
          <option>Duration</option>
        </select> */}
        <button onClick={(e) => {e.preventDefault();chunkRoute()}}>Find Stops</button>
      </form>
    </div>
  );
};

const styles = {
  settings: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  top: {
    display: 'flex',
    gap: '5px',
  },
  bottom: {
    display: 'flex',
    gap: '5px',
  },
};

export default Settings;
