# Final-Project
607 final project


Path , Verb, Request, Response
# Animal

# VET000-57 list all animals  

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
# VET000-57 GET one animal 
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

# VET000-57 update animals  

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

# VET000-57 add animals  

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

# VET000-57 GET animal details

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
# VET000-57 update animal details

Path: localhost:8001/api/animals/details?id= " " 
Verb: PUT  
Request: update animal details for animal matching ID in json format - {"tattoo": String ,"RFID": String ,"DOB": Date}
Response: updated animal details - json  
 
EXAMPLE: 

```
curl -X PUT localhost:8001/api/animals/details?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b" -d '{"tattoo":"123","RFID":"1231223","DOB":"2020-08-12"}'
```

Response

```
{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","tattoo":"123","rfid":"1231223","dob":"2020-08-12"}
```

# VET000-57 add animal details

Path: Path: localhost:8001/api/animals/details?id= " "  -d { }  
Verb: POST  
Request: add new animal details in json format for animal matching id  {"tattoo": String ,"RFID": String ,"DOB": Date}  
Response: ID of animal  
 
EXAMPLE: 

```
curl -X POST localhost:8001/api/animals/details?id="da0c9f06-b71f-427b-947e-cbb99614b183" -d '{"tattoo":"321","RFID":"99999","DOB":"2000-08-12"}'
```

Response

```
"da0c9f06-b71f-427b-947e-cbb99614b183"

```

# VET000-42 GET Animal Weight

Path: localhost:8001/api/animals/weight?id= " "   
Verb: GET  
Request: get animal weight history for animal matching ID
Response: Animal weight - json  
 
EXAMPLE: 

```
curl -X GET localhost:8001/api/animals/weight?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b"
```

Response

```
{"animalWeight":{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","weight":{"1970-01-01T15:23:35.412+0000":123.1,"1970-01-01T15:24:05.412+0000":120.0,"1970-01-01T15:24:15.412+0000":125.1,"1970-01-01T15:24:19.00+0000":1211}}}

```
# VET000-42 update animal weight

Path: localhost:8001/api/animals/weight?id= " "  
Verb: PUT  
Request: update animal weight for animal matching ID in json format - {"weight":{ DATE : Double, DATE: Double, ...}}  
Response: updated animal weight - json  
 
EXAMPLE: 

```
curl -X PUT localhost:8001/api/animals/weight?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b" -d '{"weight":{"2000-08-12":100, "2000-09-10": 105}}'
```

Response

```
{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","weight":{"2000-08-12T00:00:00.000+0000":100.0,"2000-09-10T00:00:00.000+0000":105.0}}
```

# VET000-42 add animal weight

Path: Path: localhost:8001/api/animals/weight?id= " "  
Verb: POST  
Request: add new animal weight in json format for animal matching id - {"weight":{ DATE : Double, DATE: Double, ...}}  
Response: ID of animal  
 
EXAMPLE: 

```
curl -X POST localhost:8001/api/animals/weight?id="da0c9f06-b71f-427b-947e-cbb99614b183" -d '{"weight":{"2005-08-12":100, "2005-09-10": 105}}'
```

Response

```
"da0c9f06-b71f-427b-947e-cbb99614b183"
```