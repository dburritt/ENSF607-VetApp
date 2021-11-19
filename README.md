# Final-Project
607 final project


Path , Verb, Request, Response
# Animal

#VET000-57 list all animals  

Path: localhost:8001/api/animals
Verb: GET
Response: list of all animals in database

EXAMPLE:

```
curl -X GET localhost:8001/api/animals
```

Response

```
{"animals":[{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","type":"dog","weight":123.0,"breed":"lab","color":"black"}]}

```
#VET000-57 GET one animal 
Path: localhost:8001/api/animals?id= " "
Verb: GET  
Response: Animal matching id - json
 
EXAMPLE: 

```
curl -X GET localhost:8001/api/animals?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b"

```

Response

```
{"animals":[{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","type":"cat","weight":10.0,"breed":"lab","color":"white"}]}  
```

#VET000-57 update animals  

Path: localhost:8001/api/animals?id= " " -d { }  
Verb: PUT  
Request: update animal based on animal id parameter, new animal information in json format {type": String ,"weight": Double, "breed": String, "color": String}   
Response: updated animal animal in database - json

EXAMPLE: 

```
curl -X PUT localhost:8001/api/animals?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b" -d '{"type":"cat","weight":10.0,"breed":"lab","color":"white"}'  

```

Response

```
{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","type":"cat","weight":10.0,"breed":"lab","color":"white"}

```

#VET000-57 add animals  

Path: localhost:8001/api/animals -d { }  
Verb: POST  
Request: add new animal information in json format {type": String ,"weight": Double, "breed": String, "color": String}  
Response:ID of new animal  
 
EXAMPLE: 

```
curl -X POST localhost:8001/api/animals -d '{"type":"cow","weight":1000.0,"breed":"dairy","color":"brown"}'

```

Response

```
"da0c9f06-b71f-427b-947e-cbb99614b183"

```

#VET000-57 GET animal details

Path: localhost:8001/api/animals/details?id= " " 
Verb: GET  
Request: get animal details for animal matching ID
Response: Animal details - json  
 
EXAMPLE: 

```
curl -X GET localhost:8001/api/animals/details?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b"
```

Response

```
{"animalDetails":[{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","tattoo":"234234","rfid":"1231223","dob":"2018-08-12"}]}

```
#VET000-57 update animal details

Path: localhost:8001/api/animals/details?id= " " 
Verb: PUT  
Request: update animal details for animal matching ID in json format - {"tattoo": String ,"RFID": String ,"DOB": Date}
Response: updated animal details - json  
 
EXAMPLE: 

```
$ curl -X PUT localhost:8001/api/animals/details?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b" -d '{"tattoo":"123","RFID":"1231223","DOB":"2020-08-12"}'
```

Response

```
{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","tattoo":"123","rfid":"1231223","dob":"2020-08-12"}
```

#VET000-57 add animal details

Path: Path: localhost:8001/api/animals/details?id= " "  -d { }  
Verb: POST  
Request: add new animal details in json format for animal matching id  {"tattoo": String ,"RFID": String ,"DOB": Date}  
Response: ID of animal  
 
EXAMPLE: 

```
$ curl -X POST localhost:8001/api/animals/details?id="da0c9f06-b71f-427b-947e-cbb99614b183" -d '{"tattoo":"321","RFID":"99999","DOB":"2000-08-12"}'
```

Response

```
"da0c9f06-b71f-427b-947e-cbb99614b183"

```