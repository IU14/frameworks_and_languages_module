curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d {"user_id": "user1234","keywords": ["hammer", "nails","tools"], "description": "A hammer and nails set", "image": "https://placekitten.com/200/300", "lat": 51.2798438,"lon": 1.0830275}
curl -v -X GET     http://localhost:8000/items
curl -v -X GET     http://localhost:8000/item/{itemid}
curl -v -X DELETE  http://localhost:8000/item/{itemid}
curl -v -X OPTIONS http://localhost:8000/




{"user_id": "user1234","keywords": ["hammer", "nails","tools"], "description": "A hammer and nails set", "image": "https://placekitten.com/200/300", "lat": 51.2798438,"lon": 1.0830275}


curl -v -X POST    http://localhost:8000/item -H "Content-Type: application/json" -d {"user_id": "5548","keywords": ["wrench", "hotglue"], "description": "A wrench an gluegun" , "image": "https://www.hobbycraft.co.uk/dw/image/v2/BHCG_PRD/on/demandware.static/-/Sites-hobbycraft-uk-master/default/dw6566d34c/images/large/638969_1000_1_-black-mini-hot-melt-glue-gun.jpg?sw=680&q=85", "lat": 51.45845, "lon": 548741.2}

