Client
======

This client uses vuejs framework to run the FreeCycle website. It is hosted on local port 8001.

### To Run

After running the server, in a new terminal open the client directory "cd client", using the command "python3 -m http.server 8001" or just enter "run" to run the client and then make sure the visibility is public.   
Open up the webpage, and at the end of the url remove the / replace it with ?api= and paste the server url, hit enter. This will refresh the page joining it to the server. 


### To Use

Enter item information in the form that is present, pressing the create item button will create the item and add it to the list, showing it in the list on the page.

In order to delete an item from the list, press the delete button. 

### To Test

To run the client tests, first stop the client running using the command "ctrl + c".  
Return to the main directory using the command " cd .. " if needed, and then run the command "run test_client" in the terminal to run the client tests. 
