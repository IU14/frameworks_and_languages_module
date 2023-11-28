Server
======

This server uses express.js framework to launch & host the FreeCycle website. It is hosted on local port 8000.

### To Run

Once in the server directory "cd server", use the command "node server.js" to run the server, and then make sure the visibility is public.   
Make sure to copy the URL that is created and save it to your clipboard.  

### To Use

Using cURl commands;  POST, GET & DELETE to see that the functionality is there.  
For example: curl -v -X GET     http://localhost:8000/items - will return the list of items.  
And curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234","keywords": ["hammer","nails","tools"],"description": "A hammer and nails set", "image": "https://placekitten.com/200/300","lat": 51.2798438, "lon": 1.0830275}' - will create a new item.  

### To Test

To run the server tests, first stop the server using the command "ctrl + c".  
Return to the main directory using the command " cd .. " if needed, and then run the command "run test_server" in the terminal to run the server tests. 

