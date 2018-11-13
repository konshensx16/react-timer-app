
                           
# THE APP FRAMEWORK     
                           
1. break down the app to components
1. build a static version of the app.
1. determine what should be statful.
1. determine in which component where each peace of state should live.
1. hard-code intitial states.
1. add inversive data flow.
1. add communication with the server.

## Problem			

**what has to be done :**
    * need to update the state timer that has been updated.
__what I have :__ 

    * I recieved the id of the updated timer 
    * I recived the updated title and project from the timer
  
__process__

    * The state updated is done in this.setState()
    * i have the problem with the format {timers: updated_timers} but this will override the existing state completely
    ...

TASK: UPDATE TIMER (backend)    |
--------------------------------|

1. the logic for getting the updated data (title and/or project) along side with the timer ID is already done
2. need to create a client function that uses Fetch API to "put" the updated data to the server
3. the server side logic for updating the timer is already coded.
   
**TODO: understand express server requests** 
- [x] DONE.

TASK: DELETE TIMER (backend)    |	
--------------------------------|	

1. the logic for getting the timer ID to be deleted is already done.
2. need to create a client function that calls Fetch API method to "delete" the cicked timer.
3. the server side logic for deleting the timer is already coded.
4. I have to return the id as  an object 

```javasccript

deleteTimer({
  id:timerId
  });

```
- [x] DONE.

TASK: START/STOP TIMER (backend) |
---------------------------------|
1. in this one I'll delete the already coded logic and start from scratch (backend).
   1. read the already existed data in teh data.json file using node fileSystem
   2. foreach the timers to find the timer's Id that i want to start it 
   3. found the timer : updated the runningSince prop to now (Date.now()) 
   4. update the data in data.json using file system
2. ...
   1. read the stored data from data.json using file system
   2. foreaching each timer and update the matched id timer 
   3. update the elapsed prop : elapsed = elapsed + (now - timer.runningSince) and update runningSince = null to stop the timer
   4. write the timers data to the file   

__NOTE :__ that we are keeping the update state localy mechanism to enhace the UX , if we wated the update to come from teh server it will make a poor UX , and this is called "Optimistic Updating" .