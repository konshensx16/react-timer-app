
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
  function newTimerClient(timer) {
    // console.log(timer);
    
    return fetch('/api/timers',{
      method: 'POST',
      body: JSON.stringify(timer),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(checkStatus)
  }
  function updateTimerClient(timer){
    return fetch('/api/timers',{
      method: 'PUT',
      body: JSON.stringify(timer),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
  }
  function deleteTimerClient(timerId){
    console.log(timerId);
    
    return fetch('/api/timers',{
      method: 'DELETE',
      body: JSON.stringify(timerId),
      headers:{
        'Accept':'Application/json',
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
  }
  function startTimerClient(timer){
    return fetch('/api/timers/start',
    {
      method: 'POST',
      body: JSON.stringify(timer),
        headers:{
          'Accept': 'Application/json',
          'Content-Type': 'Application/json'
        }
    }
    ).then(checkStatus);
  }
  function stopTimerClient(timer){
    return fetch('/api/timers/stop',{
      method: 'POST',
      body: JSON.stringify(timer),
      headers:{
        'Accept': 'Application/json',
        'Content-Type': 'Application/json'  
      }
    }).then(checkStatus);
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
        newTimerClient,
        updateTimerClient,
        deleteTimerClient,
        startTimerClient,
        stopTimerClient
      };