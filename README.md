# ENSF 607 Final Project - Veterinary Medicine Animal Management App  
## Created by: Thomas Scott, Drew Burritt, Gregory Slowski  

### Demonstration Video:
Download video at:  
https://github.com/Software-Engineering-Courses-Moshirpour/final-project-uofeng607-000/tree/main/Demo

View on Youtube at:  
https://youtu.be/2vBsS3F8-rg

### Instructions to set up the database:   
1. Run ./Database/Create_tables.sql/ within mySQL  
2. Be connected to a local server (for example "ENSF607")  
3. Click "Administration" tab, in the middle of the left sidebar  
4. Click Users and Privileges  
5. Click Add account  
6. Make login name "user", make password "12345"  
7. Check "DBA" on administrative roles tab (third tab)  
8. Add all schema privileges on the fourth tab  
9. Press apply  

### Instructions to run the backend:  
- Requires Java version > 16  
- Run application.java from IDE or directly run BackendAPI.jar  
`java -jar ./BackendAPI.jar`
- Ensure port 8001 is available for API server connection.  

### Instructions to run the frontend  
- React  
    -   in ./frontend  
    -   run:  

`npm install`  

-   run:  

`npm start`   

Login information:  
Admin credentials ------------------------  Username: Admin_1       Password: pe  
Health Technician credentials ------------  Username: Technician    Password: pa  
Instructor credentials -------------------  Username: tscott        Password: thomas123  
Student credentials ----------------------  Username: btables       Password: 12345  


### Additional notes  

- On Windows All pictures first need to be added to 'C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\' in order to add them to the database.   
    - Ensure hidden folders are visible for access.  
    - On other OS use the query 'select @@GLOBAL.secure_file_priv;' to locate your file path.  
