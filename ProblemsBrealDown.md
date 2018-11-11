
                           
#THE APP FRAMEWORK     
                           
1. break down the app to components
1. build a static version of the app.
1. determine what should be statful.
1. determine in which component where each peace of state should live.
1. hard-code intitial states.
1. add inversive data flow.
1. add communication with the server.

##Problem			

**what has to be done :**
    * need to update the state timer that has been updated.
__what I have :__ 
    * I recieved the id of the updated timer 
    * I recived the updated title and project from the timer
__process__
    * The state updated is done in this.setState()
    * i have the problem with the format {timers: updated_timers} but this will override the existing state completely
    ...

###TASK: UPDATE TIMER (backend)|
-------------------------------|

1. the logic for getting the updated data (title and/or project) along side with the timer ID is already done
1. need to create a client function that uses Fetch API to "put" the updated data to the server
1. the server side logic for updating the timer is already coded.
**TODO: understand express server requests** 
- [x] DONE.

###TASK: DELETE TIMER (backend)|	
-------------------------------|	

1. the logic for getting the timer ID to be deleted is already done.
2. need to create a client function that calls Fetch API method to "delete" the cicked timer.
3. the server side logic for deleting the timer is already coded.
