function  millisecondsToString(inMillSec){
  let secs = Math.floor((inMillSec / 1000) % 60);
  let mins = Math.floor((inMillSec / 1000 / 60) % 60);
  let hours = Math.floor((inMillSec / 1000 / 60 / 60));
  // let ms = inMillSec;
  // ms = ms % 1000 % 60 % 60;
  // ms = Math.floor(ms);
  return [
    pad(hours.toString(),2),
    pad(mins.toString(),2),
    pad(secs.toString(),2)
  ].join(':');
}
function pad(numberString, size){
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}` ;
  return padded;
}
export {millisecondsToString};
/**
 * @description takes the elapsed milliseconds and running since and returns the acurate timer state
 * @param {ms} elapsedMs 
 * @param {ms} runningSince 
 */
function elapsedTimer(elapsedMs, runningSince) {
  const now = Date.now();
  if(runningSince){
    elapsedMs+= now - runningSince;
  }

  return millisecondsToString(elapsedMs);

}
function createNewTimer(newTimer) {
  
  if(newTimer.title  && newTimer.project ){
    newTimer.elapsed = 0;
    newTimer.runningSince = null;
    
    return newTimer
  }
}
/**
 * @description takes a timer id and title and project and return the timer in list updated
 * @param {Timer} updatedTimer
 * @param {TimersList} timersList
 * @returns {TimerList} 
 */
function updateTimer(timersList, updatedTimer){
  let timersArray = timersList;
  timersArray.forEach(timer => {
    if(timer.id === updatedTimer.id){
      timer.title = updatedTimer.title;
      timer.project = updatedTimer.project
    }
  })
  return timersArray;
}


export {createNewTimer, updateTimer, elapsedTimer}
