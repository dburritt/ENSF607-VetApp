# Final-Project
607 final project


NOTE: ID NUMBERS ARE RANDOM AND WILL NOT MATCH THE EXAMPLES  
All listed calls tested using console command  

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
# VET000-46 GET Animal Status

Path: localhost:8001/api/animals/status?id= " "   
Verb: GET  
Request: get animal status for animal matching ID  
Response: Animal weight - json  

EXAMPLE: 

```
curl -X GET localhost:8001/api/animals/status?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b"
```

Response

```
{"animalStatus":{"animalId":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","status":"GOOD"}}  
```
# VET000-46 update animal status

Path: localhost:8001/api/animals/status?id= " "  -d { }  
Verb: PUT  
Request: update animal weight for animal matching ID in json format - {"status": String}  
Response: updated animal status - json  

EXAMPLE: 

```
curl -X PUT localhost:8001/api/animals/weight?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b" -d '{"weight":{"2000-08-12":100, "2000-09-10": 105}}'
```

Response

```
{"animalStatus":{"animalId":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","status":"Bad"}}
```

# VET000-46 add animal status

Path: Path: localhost:8001/api/animals/weight?id= " "  
Verb: POST  
Request: add new animal weight in json format for animal matching id json format- {"status": String} 
Response: ID of animal  

EXAMPLE: 

```
curl -X POST localhost:8001/api/animals/status?id="da0c9f06-b71f-427b-947e-cbb99614b183" -d '{"status":"good"}'
```

Response

```
"da0c9f06-b71f-427b-947e-cbb99614b183"
```
# VET000-43 GET Animal health record

Path: localhost:8001/api/animals/healthrecord?id= " "   
Verb: GET  
Request: get animal health record for animal matching ID  
Response: Animal health record - json  {"animalId": String ,"date": Date,"type": String ,"record": String}  

EXAMPLE: 

```
curl -X GET localhost:8001/api/animals/healthrecord?id="d7494b63-9736-4242-a486-f61e4465c9b2"
```

Response

```
{"animalId":"d7494b63-9736-4242-a486-f61e4465c9b2","date":55415412,"type":"temp","record":"37 degrees"}
```
# VET000-43 update animal health record

Path: localhost:8001/api/animals/healthrecord?id= " "  -d { }  
Verb: PUT  
Request: update health record for animal matching ID in json format - {"date": Date,"type": String ,"record": String}  
Response: updated animal health record - json  {"animalId": String ,"date": Date,"type": String ,"record": String}  

EXAMPLE: 

```
curl -X PUT localhost:8001/api/animals/healthrecord?id="481bce09-d7be-4f90-ac43-e798764ba2eb" -d '{"date":"2020-02-01","type":"BP","record":"120"}'
```

Response

```
{"animalId":"481bce09-d7be-4f90-ac43-e798764ba2eb","date":1580515200000,"type":"BP","record":"120"}
```

# VET000-43 add animal health record

Path: Path: localhost:8001/api/animals/healthrecord?id= " "  
Verb: POST  
Request: add new animal helth recrod in json format for animal matching id json format-  {"date": Date,"type": String ,"record": String}  
Response: ID of animal  

EXAMPLE: 

```
curl -X POST localhost:8001/api/animals/healthrecord?id="c32afa18-b3b5-41c6-ae62-c1adc3f86e9f" -d '{"date":"2020-02-01","type":"BP","record":"120"}'
```

Response

```
"c32afa18-b3b5-41c6-ae62-c1adc3f86e9f"  
```

# VET000-52 GET Animal Reminders

Path: localhost:8001/api/animals/reminders  
Verb: GET  
Request: get all animal reminders  
Response: Animal reminders - json  
 
EXAMPLE: 

```
curl -X GET localhost:8001/api/animals/reminders
```

Response

```

{"animalReminders":[{"reminderId":"3208d93a-68d3-475f-befa-7e066c6078c8","reminder":"Feed dog","dateEntered":"November 19","dateDue":"November 25"}]}

```
# VET000-52 update animal reminder

Path: localhost:8001/api/animals/reminders?reminderId= " "  
Verb: PUT  
Request: update animal reminder matching reminderID in json format - {"reminder": String, "dateEntered": String, "dateDue": String}  
Response: updated animal reminder - json  
 
EXAMPLE: 

```
curl -X PUT localhost:8001/api/animals/reminders?reminderId="3208d93a-68d3-475f-befa-7e066c6078c8" -d '{"reminder": "Feed cat", "dateEntered": "Nov 19, 2021", "dateDue": "Nov 22, 2021"}'
```

Response

```
{"reminderId":"3208d93a-68d3-475f-befa-7e066c6078c8","reminder":"Feed cat","dateEntered":"Nov 19, 2021","dateDue":"Nov 22, 2021"}
```

# VET000-52 add animal reminder

Path: Path: localhost:8001/api/animals/reminder " "  
Verb: POST  
Request: add new animal reminder in json format with matching reminderId - {"reminder": String, "dateEntered": String, "dateDue": String}  
Response: ID of reminder  
 
EXAMPLE: 

```
curl -X POST localhost:8001/api/animals/reminders -d '{"reminder": "Treat horse", "dateEntered": "Nov 18, 2021", "dateDue": "Nov 19, 2021"}'
```

Response

```
{"reminderId":"2404fb99-6c44-4f5f-8bb9-5758f5a0c22f"}
```

# Administration

# VET000-62 create user

Path: localhost:8001/api/users/register -d { }  
Verb: POST  
Request: add new user login and password in json format for user matching id - {"login": String, "password": String}  
Response: ID of new user

EXAMPLE:

```
curl -X POST localhost:8001/api/users/register -d '{"login": "test", "password": "test"}'
```

Response

```
"da0c9f06-b71f-427b-947e-cbb99614b183"
```

# VET000-66 view all users

Path: localhost:8001/api/users/register  
Verb: GET  
Request: get all users registered in database  
Response: list of all users in database  

EXAMPLE:

```
curl -X GET localhost:8001/users/register
```

Response

```
{"users":[{"id":"7d2676be-82e0-4c5a-9cc7-6f8a82fc8943","login":"test1","password":"test1"},{"id":"7d2676be-82e0-4c5a-9cc7-6f8a82fc8943","login":"test2","password":"test2"}]}

```

# VET000-66 get one user 
Path: localhost:8001/api/users/register?id= " "  
Verb: GET  
Response: User matching id - json  
 
EXAMPLE: 

```
curl -X GET localhost:8001/api/user/register?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b"

```

Response

```
{"users":[{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","login":"test","password":"test"}]}  
```

# VET000-62 update user  

Path: localhost:8001/api/users/register?id= " " -d { }  
Verb: PUT  
Request: update user based on user id parameter, new user information in json format {"login": String, "password": String}   
Response: updated user in database - json

EXAMPLE: 

```
curl -X PUT localhost:8001/api/users/register?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b" -d '{"login":"test2","password":"test2"}'  

```

Response

```
{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","login":"test2","password":"test2"}

```

# VET000-62 delete user

Path: localhost:8001/api/users/register?id= " " -d { }  
Verb: DELETE  
Request: removes user from database  
Response: user is removed from database  

EXAMPLE: 

```
curl -X DELETE localhost:8001/api/users/register?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b"  

```

Response

```
"User successfully deleted"

```

# VET000-62 create administrator

Path: localhost:8001/api/admin/register -d { }  
Verb: POST  
Request: add new administrator login and password in json format for user matching id - {"login": String, "password": String}  
Response: ID of new administrator  

EXAMPLE:

```
curl -X POST localhost:8001/api/admin/register -d '{"login": "test", "password": "test"}'
```

Response

```
"da0c9f06-b71f-427b-947e-cbb99614b183"
```

# VET000-66 view all administrators

Path: localhost:8001/api/admin/register  
Verb: GET  
Request: get all administrators registered in database  
Response: list of all administrators in database  

EXAMPLE:

```
curl -X GET localhost:8001/admin/register
```

Response

```
{"admin":[{"id":"7d2676be-82e0-4c5a-9cc7-6f8a82fc8943","login":"test1","password":"test1"},{"id":"7d2676be-82e0-4c5a-9cc7-6f8a82fc8943","login":"test2","password":"test2"}]}

```

# VET000-62 update administrator

Path: localhost:8001/api/admin/register?id= " " -d { }  
Verb: PUT  
Request: update administrator based on user id parameter, new administrator information in json format {"login": String, "password": String}   
Response: updated administrator in database - json  

EXAMPLE: 

```
curl -X PUT localhost:8001/api/admin/register?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b" -d '{"login":"test2","password":"test2"}'  

```

Response

```
{"id":"8cc87d4a-4b68-4853-b506-6376e5dc2a7b","login":"test2","password":"test2"}

```

# VET000-62 delete administrator

Path: localhost:8001/api/admin/register?id= " " -d { }  
Verb: DELETE  
Request: removes administrator from database  
Response: administrator is removed from database  

EXAMPLE: 

```
curl -X DELETE localhost:8001/api/admin/register?id="8cc87d4a-4b68-4853-b506-6376e5dc2a7b"  

```

Response

```
"Administrator successfully deleted"

```

# VET000-63 create email listing

Path: localhost:8001/api/admin/email -d { }  
Verb: POST  
Request: add new email in json format - {"email": String, "name": String}  
Response: email added - json  

EXAMPLE:

```
curl -X POST localhost:8001/api/admin/email -d '{"email": "test@test.com", "name": "greg slowski"}'
```

Response

```
{"email":"test@test.com"}
```

# VET000-63 update email listing
Path: localhost:8001/api/admin/email?email= " " -d { }  
Verb: PUT  
Request: update email in json format for matching email - {"name": String}  
Response: updated email - json  

EXAMPLE:

```
curl -X PUT localhost:8001/api/admin/email?email="test@test.com" -d '{"name": "greg"}'
```

Response

```
{"email":"test@test.com", "name":"greg"}
```

# VET000-63 get email listings
Path: localhost:8001/api/admin/email 
Verb: GET  
Request: get all listed emails  
Response: Listed emails - json  
 
EXAMPLE: 

```
curl -X GET localhost:8001/api/admin/email
```

Response (after having add another email)

```
{"emails":[{"email":"updatedtest@test.com","name":"Thomas"},{"email":"test@test.com","name":"greg"}]}
```

# VET000-63 delete email
Path: localhost:8001/api/admin/email?email=" "  
Verb: DELETE  
Request: delete specified email from database  
Response: Confirmation string  
 
EXAMPLE: 

```
curl -X DELETE localhost:8001/api/admin/email?email="test@test.com"
```

Response

```
"Email successfully deleted"
```

# VET000-65 create a comment

Path: localhost:8001/api/admin/comment -d { }  
Verb: POST  
Request: add new comment in json format - {"commenter": String, "text": String}  
Response: email added - json  

EXAMPLE:

```
curl -X POST localhost:8001/api/admin/comment -d '{"commenter": "Greg Slowski", "text": "this is a test comment"}'
```

Response

```
{"id":"18ffeb63-cfbf-4623-a137-1ca35fccbb37"}
```

# VET000-63 edit comment
Path: localhost:8001/api/admin/comment?commentId= " " -d { }  
Verb: PUT  
Request: update comment in json format for matching commentId - {"commenter": String, "text": String}  
Response: updated commentId - json  

EXAMPLE:

```
curl -X PUT localhost:8001/api/admin/comment?id="18ffeb63-cfbf-4623-a137-1ca35fccbb37" -d '{"commenter": "greg", "text": "this is an updated test comment"}'
```

Response

```
{"id":"18ffeb63-cfbf-4623-a137-1ca35fccbb37","commenter":"greg","text":"this is an updated test comment"}
```

# VET000-63 get comments
Path: localhost:8001/api/admin/comment 
Verb: GET  
Request: get all comments  
Response: Listed comments - json  
 
EXAMPLE: 

```
curl -X GET localhost:8001/api/admin/comment
```

Response

```
{"comments":[{"id":"18ffeb63-cfbf-4623-a137-1ca35fccbb37","commenter":"greg","text":"this is an updated test comment"}]}
```

# VET000-63 delete comment  
Path: localhost:8001/api/admin/comment?id=" "  
Verb: DELETE  
Request: delete specified comment  
Response: confirmation string
 
EXAMPLE: 

```
curl -X DELETE localhost:8001/api/admin/comment?id="18ffeb63-cfbf-4623-a137-1ca35fccbb37"
```

Response

```
"Comment successfully deleted"
```
