
  function getTimers(success) {
    return fetch('api/timers',{
      headers:{
        Accept:'Application/json',
      },
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(success)
  }
  function newTimer(timer){
    // console.log(timer);
    
    return fetch('api/timers',{
      method: 'POST',
      body: JSON.stringify(timer),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(checkStatus)
  }
  function updateTimer(timer){
    return fetch('api/timers',{
      method: 'PUT',
      body: JSON.stringify(timer),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
  }
  function deleteTimer(timerId){
    console.log(timerId);
    
    return fetch('api/timers',{
      method: 'DELETE',
      body: JSON.stringify(timerId),
      headers:{
        'Accept':'Application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
  }
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }
export {
        getTimers,
        newTimer,
        updateTimer,
        deleteTimer
      };