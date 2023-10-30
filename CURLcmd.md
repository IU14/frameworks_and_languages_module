curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d {"user_id": "user1234","keywords": ["hammer", "nails","tools"], "description": "A hammer and nails set", "image": "https://placekitten.com/200/300", "lat": 51.2798438,"lon": 1.0830275}
curl -v -X GET     http://localhost:8000/items
curl -v -X GET     http://localhost:8000/item/{itemid}
curl -v -X DELETE  http://localhost:8000/item/{itemid}
curl -v -X OPTIONS http://localhost:8000/




curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234","keywords": ["hammer","nails","tools"],"description": "A hammer and nails set", "image": "https://placekitten.com/200/300","lat": 51.2798438, "lon": 1.0830275}'


curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user8578","keywords": ["wrench"],"description": "A Wrench", "image": "https://placekitten.com/200/300","lat": 51.2798438, "lon": 1.0830275}'

curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234","keywords": ["glue","plug"],"description": "A glue gun with spare plug", "image": "https://placekitten.com/200/300","lat": 51.2798438, "lon": 1.0830275}'

curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "a"}'

curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234","keywords": ["glue","plug"],"description": "A glue gun with spare plug", "image": "https://placekitten.com/200/300","lat": 51.2798438, "lon": 1.0830275}'