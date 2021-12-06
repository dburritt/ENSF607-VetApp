package data;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.sql.Date;

import com.mysql.cj.protocol.StandardSocketFactory;

import java.sql.*;
import domain.animal.*;
import domain.user.User;
import domain.admin.*;

public class MySQLJDBC implements IDBCredentials {

	// Attributes
	private Connection conn;//Object of type connection from the JDBC class that deals with connecting to 
	//the database 
	private Statement stmt; //object of type statement from JDBC class that enables the creation "Query 
	//statements"
	private ResultSet rs;//object of type ResultSet from the JDBC class that stores the result of the query

	public void initializeConnection() {
		try {
            //Register JDBC driver
			Driver driver = new com.mysql.cj.jdbc.Driver();
			DriverManager.registerDriver(driver);
            //Open a connection
			conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);
		} catch (SQLException e) {
			System.out.println("Problem");
			e.printStackTrace();
		}

	}

	public void close() {
		try {
			stmt.close();
			rs.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insertAnimal(Animal animal) throws SQLException {
		String query = "INSERT INTO ANIMAL (AnimalId, Name, Species, Subspecies,Breed, Sex, Colour ,Features, Birthdate, RFID, Microchip, TattooNum) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animal.getId());
		pStat.setString(2, animal.getName());
		pStat.setString(3,  animal.getSpecies());
		pStat.setString(4, animal.getSubspecies());
		pStat.setString(5,  animal.getBreed());
		pStat.setString(6,  animal.getColor());
		pStat.setString(7,  animal.getSex());
		pStat.setString(8, animal.getFeatures());
		pStat.setDate(9,  animal.getBithdate());
		pStat.setString(10,  animal.getRfid());
		pStat.setString(11,  animal.getMicrochip());
		pStat.setString(12,  animal.getTattooNum());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();
	}
	/*
	public void insertAnimal(Animal animal) throws SQLException {
		String query = "INSERT INTO ANIMAL (animalId, type, weight, breed, color) VALUES(?,?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animal.getId());
		pStat.setString(2, animal.getType());
		pStat.setDouble(3,  animal.getWeight());
		pStat.setString(4,  animal.getBreed());
		pStat.setString(5,  animal.getColor());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();
	}
	*/
	
	public void updateAnimal(Animal animal) throws SQLException {
		String query = "UPDATE ANIMAL SET Name=?, Species=?, Subspecies=?, Breed=?, Sex=?,Colour=?,Features=?, Birthdate=?, RFID=?, Microchip=?, TattooNum=? WHERE animalId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animal.getName());
		pStat.setString(2,  animal.getSpecies());
		pStat.setString(3, animal.getSubspecies());
		pStat.setString(4,  animal.getBreed());
		pStat.setString(5,  animal.getSex());
		pStat.setString(6,  animal.getColor());
		pStat.setString(7, animal.getFeatures());
		pStat.setDate(8,  animal.getBithdate());
		pStat.setString(9,  animal.getRfid());
		pStat.setString(10,  animal.getMicrochip());
		pStat.setString(11,  animal.getTattooNum());
		pStat.setString(12, animal.getId());

		int rowCount = pStat.executeUpdate();
		
		System.out.println("row Count = " + rowCount);
		pStat.close();
	}
	
	public List<Animal> getAnimal(String id) throws SQLException {
		List<Animal> r =null;

		String query = "SELECT * FROM ANIMAL WHERE animalId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, id);
		rs = pStat.executeQuery();
		List<Animal> animals = new ArrayList<Animal>();
		while(rs.next()) {
			Animal a = Animal.builder()
	                .id(rs.getString("animalId"))
	                .name(rs.getString("name"))
	                .species(rs.getString("species"))
	                .subspecies(rs.getString("subspecies"))
	                .breed(rs.getString("breed"))
	                .sex(rs.getString("sex"))
	                .color(rs.getString("colour"))
	                .features(rs.getString("features"))
	                .bithdate(rs.getDate("birthdate"))
	                .rfid(rs.getString("birthdate"))
	                .microchip(rs.getString("microchip"))
	                .tattooNum(rs.getString("tattooNum"))
	                .build();
			animals.add(a);
			r = animals;
		}
		pStat.close();
		
		return r;
	}
	public List<Animal> getAllAnimals() throws SQLException {
		List<Animal> r =null;

		String query = "SELECT * FROM ANIMAL";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Animal> animals = new ArrayList<Animal>();
		while(rs.next()) {
			Animal a = Animal.builder()
	                .id(rs.getString("animalId"))
	                .name(rs.getString("name"))
	                .species(rs.getString("species"))
	                .subspecies(rs.getString("subspecies"))
	                .breed(rs.getString("breed"))
	                .sex(rs.getString("sex"))
	                .color(rs.getString("colour"))
	                .features(rs.getString("features"))
	                .bithdate(rs.getDate("birthdate"))
	                .rfid(rs.getString("birthdate"))
	                .microchip(rs.getString("microchip"))
	                .tattooNum(rs.getString("tattooNum"))
	                .build();
			animals.add(a);
			r = animals;
		}
		pStat.close();
		
		return r;
	}
	public List<Animal> getAvailableAnimals() throws SQLException {
		List<Animal> r =null;

		String query = "SELECT * FROM ANIMAL WHERE animalId NOT IN (SELECT animalId FROM ANIMAL_REQUEST WHERE state IN (\"requested\",\"Accept_by_Admin\", \"Ready\"))";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Animal> animals = new ArrayList<Animal>();
		while(rs.next()) {
			Animal a = Animal.builder()
	                .id(rs.getString("animalId"))
	                .name(rs.getString("name"))
	                .species(rs.getString("species"))
	                .subspecies(rs.getString("subspecies"))
	                .breed(rs.getString("breed"))
	                .sex(rs.getString("sex"))
	                .color(rs.getString("colour"))
	                .features(rs.getString("features"))
	                .bithdate(rs.getDate("birthdate"))
	                .rfid(rs.getString("birthdate"))
	                .microchip(rs.getString("microchip"))
	                .tattooNum(rs.getString("tattooNum"))
	                .build();
			animals.add(a);
			r = animals;
		}
		pStat.close();
		
		return r;
	}
	public List<Animal> getAnimalSubspecies() throws SQLException {
		List<Animal> r =null;
		String query = "SELECT DISTINCT Species, Subspecies FROM ANIMAL";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Animal> animals = new ArrayList<Animal>();
		while(rs.next()) {
			Animal a = Animal.builder()
	                .species(rs.getString("species"))
	                .subspecies(rs.getString("subspecies"))
	                .build();
			animals.add(a);
			r = animals;
		}
		pStat.close();
		
		return r;
	}

	public List<Animal> getAnimalsBySubspecies(String subspecies) throws SQLException {
		List<Animal> r =null;
		String query = "SELECT * FROM ANIMAL WHERE Subspecies = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, subspecies);
		rs = pStat.executeQuery();
		List<Animal> animals = new ArrayList<Animal>();
		
		
		while(rs.next()) {
			Animal a = Animal.builder()
	                .id(rs.getString("animalId"))
	                .name(rs.getString("name"))
	                .species(rs.getString("species"))
	                .subspecies(rs.getString("subspecies"))
	                .breed(rs.getString("breed"))
	                .sex(rs.getString("sex"))
	                .color(rs.getString("colour"))
	                .features(rs.getString("features"))
	                .bithdate(rs.getDate("birthdate"))
	                .rfid(rs.getString("birthdate"))
	                .microchip(rs.getString("microchip"))
	                .tattooNum(rs.getString("tattooNum"))
	                .build();
			animals.add(a);
			r = animals;
		}
		pStat.close();
		
		return r;
	}
	public void insertComment(Comment comment) throws SQLException {
		String query = "INSERT INTO COMMENT (CommentId, UserId, AnimalId, CommentDate, CommentText) VALUES(?,?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, comment.getCommentId());
		pStat.setString(2, comment.getUserId());
		pStat.setString(3,  comment.getAnimalId());
		pStat.setDate(4, comment.getCommentDate());
		pStat.setString(5,  comment.getCommentText());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();
		
		// for testing on windows curl -X POST localhost:8001/api/admin/comment -d "{\"userId\": \"1\", \"animalId\": \"53195\", \"commentDate\": \"2021-11-29\", \"commentText\": \"this is a test comment\"}"
		
	}
	
	public List<Comment> getAllComments() throws SQLException {
		List<Comment> r =null;

		String query = "SELECT * FROM COMMENTS";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Comment> comments = new ArrayList<Comment>();
		while(rs.next()) {
			Comment c = Comment.builder()
					.commentId(rs.getString("CommentId"))
					.userId(rs.getString("UserId"))
					.animalId(rs.getString("AnimalId"))
	                .commentDate(rs.getDate("CommentDate"))
	                .commentText(rs.getString("CommentText"))
	                .build();
			comments.add(c);
		}
		r = comments;
		pStat.close();
		
		return r;
	}
	
	public void deleteComment(String commentId) throws SQLException {

		String query = "DELETE FROM COMMENTS WHERE CommentId=" + commentId + ";";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.executeUpdate();
		pStat.close();
		
	}
	
	public void insertAnimalRequest(AnimalRequest animalRequest)throws SQLException  {
		String query = "INSERT INTO ANIMAL_REQUEST (AnimalRequestId, AnimalId, UserId, State) VALUES(?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animalRequest.getRequestId());
		pStat.setString(2, animalRequest.getAnimalId());
		pStat.setString(3,  animalRequest.getUserId());
		pStat.setString(4,  animalRequest.getCurrentState());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();
		
	}
	
	public List<AnimalRequest> getAnimalRequest(String requestId) throws SQLException {
		List<AnimalRequest> r =null;
		String query = "SELECT * FROM ANIMAL_REQUEST WHERE AnimalrequestId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, requestId);
		rs = pStat.executeQuery();
		List<AnimalRequest> animalRequests = new ArrayList<AnimalRequest>();
		while(rs.next()) {
			AnimalRequest ar = AnimalRequest.builder()
	                .requestId(rs.getString("animalRequestId"))
	                .animalId(rs.getString("animalId"))
	                .userId(rs.getString("userID"))
	                .currentState(rs.getString("state"))
	                .build();
			animalRequests.add(ar);
			r = animalRequests;
		}
		pStat.close();
		
		return r;
	}
	
	public List<AnimalRequest> getAnimalRequestsUser(String userId)throws SQLException {
		List<AnimalRequest> r =null;

		String query = "SELECT * FROM ANIMAL_REQUEST WHERE userId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, userId);
		rs = pStat.executeQuery();
		List<AnimalRequest> animalRequests = new ArrayList<AnimalRequest>();
		while(rs.next()) {
			AnimalRequest ar = AnimalRequest.builder()
	                .requestId(rs.getString("animalRequestId"))
	                .animalId(rs.getString("animalId"))
	                .userId(rs.getString("userID"))
	                .currentState(rs.getString("state"))
	                .build();
			animalRequests.add(ar);
			r = animalRequests;
		}
		pStat.close();
		
		return r;
	}

	public List<AnimalRequest> getAllAnimalRequests() throws SQLException {
		List<AnimalRequest> r =null;

		String query = "SELECT * FROM ANIMAL_REQUEST";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<AnimalRequest> animalRequests = new ArrayList<AnimalRequest>();
		while(rs.next()) {
			AnimalRequest ar = AnimalRequest.builder()
	                .requestId(rs.getString("animalRequestId"))
	                .animalId(rs.getString("animalId"))
	                .userId(rs.getString("userID"))
	                .currentState(rs.getString("state"))
	                .build();
			animalRequests.add(ar);
			r = animalRequests;
		}
		pStat.close();
		
		return r;
	}
	
	public void updateAnimalRequest(AnimalRequest newAnimalRequest) throws SQLException {
		String query = "UPDATE ANIMAL_REQUEST SET state=? WHERE animalRequestId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1,  newAnimalRequest.getCurrentState());
		pStat.setString(2,  newAnimalRequest.getRequestId());
		int rowCount = pStat.executeUpdate();
		
		System.out.println("row Count = " + rowCount);
		pStat.close();
		
	}

	public void insertUser(User user) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	public List<User> getAllUsers() throws SQLException {
		List<User> r =null;

		String query = "SELECT * FROM USER";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<User> users = new ArrayList<User>();
		while(rs.next()) {
			User u = User.builder()
	                .id(rs.getString("UserId"))
	                .username(rs.getString("username"))
	                .password(rs.getString("password"))
	                .accountType(rs.getString("AccountType"))
	                .activationDate(rs.getDate("ActivationDate"))
	                .fName(rs.getString("Fname"))
	                .lName(rs.getString("LName"))
	                .email(rs.getString("email"))
	                .build();
			users.add(u);
			r = users;
		}
		pStat.close();
		
		return r;
	}

	
	public List<User> getUser(String id)throws SQLException {
		List<User> r =null;

		String query = "SELECT * FROM User WHERE userId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, id);
		rs = pStat.executeQuery();
		List<User> users = new ArrayList<User>();
		while(rs.next()) {
			User u = User.builder()
	                .id(rs.getString("UserId"))
	                .username(rs.getString("username"))
	                .password(rs.getString("password"))
	                .accountType(rs.getString("AccountType"))
	                .activationDate(rs.getDate("ActivationDate"))
	                .fName(rs.getString("Fname"))
	                .lName(rs.getString("LName"))
	                .email(rs.getString("email"))
	                .build();
			users.add(u);
			r = users;
		}
		pStat.close();
		
		return r;
	}
	
	public void updateUser(User user) throws SQLException{
		// TODO Auto-generated method stub
		
	}

	
	public User getUserUsername(String username) throws SQLException{
		User r =null;

		String query = "SELECT * FROM User WHERE Username = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, username);
		rs = pStat.executeQuery();
		if(rs.next()) {
			User u = User.builder()
				.id(rs.getString("UserId"))
		        .username(rs.getString("username"))
		        .password(rs.getString("password"))
		        .accountType(rs.getString("AccountType"))
		        .activationDate(rs.getDate("ActivationDate"))
		        .fName(rs.getString("Fname"))
		        .lName(rs.getString("LName"))
		        .email(rs.getString("email"))
		        .build();
			r = u;
		}
		pStat.close();
		
		return r;
	}

	
	public static void main(String[] args0) {
		MySQLJDBC myApp = new MySQLJDBC();
		myApp.initializeConnection();
		
		AnimalRequest ar = AnimalRequest.builder()
                .requestId("195")
                .animalId("53195")
                .userId("1")
                .currentState("state")
                .build();
		//myApp.insert()
		try {
			System.out.println(myApp.getAvailableAnimals());
			//System.out.println(myApp.getAnimalRequestsUser("2"));
			//System.out.println(myApp.getAllUsers());
		
			//.out.println(myApp.getAnimalsBySubspecies("Dog"));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//myApp.close();
	}
	


}
