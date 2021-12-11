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

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.sql.*;
import domain.animal.*;
import domain.user.Image;
import domain.user.User;
import domain.admin.*;

public class MySQLJDBC implements IDBCredentials {

	// Attributes
	private Connection conn;// Object of type connection from the JDBC class that deals with connecting to
	// the database
	private Statement stmt; // object of type statement from JDBC class that enables the creation "Query
	// statements"
	private ResultSet rs;// object of type ResultSet from the JDBC class that stores the result of the
	// query

	public void initializeConnection() {
		try {
			// Register JDBC driver
			Driver driver = new com.mysql.cj.jdbc.Driver();
			DriverManager.registerDriver(driver);
			// Open a connection
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
		pStat.setString(3, animal.getSpecies());
		pStat.setString(4, animal.getSubspecies());
		pStat.setString(5, animal.getBreed());
		pStat.setString(6, animal.getColor());
		pStat.setString(7, animal.getSex());
		pStat.setString(8, animal.getFeatures());
		pStat.setDate(9, animal.getBithdate());
		pStat.setString(10, animal.getRfid());
		pStat.setString(11, animal.getMicrochip());
		pStat.setString(12, animal.getTattooNum());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();
	}
	/*
	 * public void insertAnimal(Animal animal) throws SQLException { String query =
	 * "INSERT INTO ANIMAL (animalId, type, weight, breed, color) VALUES(?,?,?,?,?)"
	 * ; PreparedStatement pStat = conn.prepareStatement(query); pStat.setString(1,
	 * animal.getId()); pStat.setString(2, animal.getType()); pStat.setDouble(3,
	 * animal.getWeight()); pStat.setString(4, animal.getBreed());
	 * pStat.setString(5, animal.getColor()); int rowCount = pStat.executeUpdate();
	 * System.out.println("row Count = " + rowCount); pStat.close(); }
	 */

	public void updateAnimal(Animal animal) throws SQLException {
		String query = "UPDATE ANIMAL SET Name=?, Species=?, Subspecies=?, Breed=?, Sex=?,Colour=?,Features=?, Birthdate=?, RFID=?, Microchip=?, TattooNum=? WHERE animalId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animal.getName());
		pStat.setString(2, animal.getSpecies());
		pStat.setString(3, animal.getSubspecies());
		pStat.setString(4, animal.getBreed());
		pStat.setString(5, animal.getSex());
		pStat.setString(6, animal.getColor());
		pStat.setString(7, animal.getFeatures());
		pStat.setDate(8, animal.getBithdate());
		pStat.setString(9, animal.getRfid());
		pStat.setString(10, animal.getMicrochip());
		pStat.setString(11, animal.getTattooNum());
		pStat.setString(12, animal.getId());

		int rowCount = pStat.executeUpdate();

		System.out.println("row Count = " + rowCount);
		pStat.close();
	}

	public List<Animal> getAnimal(String id) throws SQLException {
		List<Animal> r = null;

		String query = "SELECT * FROM ANIMAL WHERE animalId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, id);
		rs = pStat.executeQuery();
		List<Animal> animals = new ArrayList<Animal>();
		while (rs.next()) {
			Animal a = Animal.builder().id(rs.getString("animalId")).name(rs.getString("name"))
					.species(rs.getString("species")).subspecies(rs.getString("subspecies"))
					.breed(rs.getString("breed")).sex(rs.getString("sex")).color(rs.getString("colour"))
					.features(rs.getString("features")).bithdate(rs.getDate("birthdate"))
					.rfid(rs.getString("RFID")).microchip(rs.getString("microchip"))
					.tattooNum(rs.getString("tattooNum")).build();
			animals.add(a);
			r = animals;
		}
		pStat.close();

		return r;
	}
	public List<Animal> getAnimalsByUserId(String id) throws SQLException  {
		List<Animal> r = null;

		String query = "SELECT * FROM ANIMAL, ASSIGNED_ANIMALS as A  WHERE A.UserId = ? AND ANIMAL.AnimalId = A.AnimalID";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, id);
		rs = pStat.executeQuery();
		List<Animal> animals = new ArrayList<Animal>();
		while (rs.next()) {
			Animal a = Animal.builder().id(rs.getString("animalId")).name(rs.getString("name"))
					.species(rs.getString("species")).subspecies(rs.getString("subspecies"))
					.breed(rs.getString("breed")).sex(rs.getString("sex")).color(rs.getString("colour"))
					.features(rs.getString("features")).bithdate(rs.getDate("birthdate"))
					.rfid(rs.getString("RFID")).microchip(rs.getString("microchip"))
					.tattooNum(rs.getString("tattooNum")).build();
			animals.add(a);
			r = animals;
		}
		pStat.close();

		return r;
	}


	public List<Animal> getAllAnimals() throws SQLException {
		List<Animal> r = null;

		String query = "SELECT * FROM ANIMAL";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Animal> animals = new ArrayList<Animal>();
		while (rs.next()) {
			Animal a = Animal.builder().id(rs.getString("animalId")).name(rs.getString("name"))
					.species(rs.getString("species")).subspecies(rs.getString("subspecies"))
					.breed(rs.getString("breed")).sex(rs.getString("sex")).color(rs.getString("colour"))
					.features(rs.getString("features")).bithdate(rs.getDate("birthdate"))
					.rfid(rs.getString("RFID")).microchip(rs.getString("microchip"))
					.tattooNum(rs.getString("tattooNum")).build();
			animals.add(a);
			r = animals;
		}
		pStat.close();

		return r;
	}

	public List<Animal> getAvailableAnimals() throws SQLException {
		List<Animal> r = null;

		String query = "SELECT * FROM ANIMAL WHERE animalId NOT IN (SELECT animalId FROM ANIMAL_REQUEST WHERE state IN (\"requested\",\"Accept_by_Admin\", \"Ready\"))";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Animal> animals = new ArrayList<Animal>();
		while (rs.next()) {
			Animal a = Animal.builder().id(rs.getString("animalId")).name(rs.getString("name"))
					.species(rs.getString("species")).subspecies(rs.getString("subspecies"))
					.breed(rs.getString("breed")).sex(rs.getString("sex")).color(rs.getString("colour"))
					.features(rs.getString("features")).bithdate(rs.getDate("birthdate"))
					.rfid(rs.getString("birthdate")).microchip(rs.getString("microchip"))
					.tattooNum(rs.getString("tattooNum")).build();
			animals.add(a);
			r = animals;
		}
		pStat.close();

		return r;
	}

	public List<Animal> getAnimalSubspecies() throws SQLException {
		List<Animal> r = null;
		String query = "SELECT DISTINCT Species, Subspecies FROM ANIMAL";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Animal> animals = new ArrayList<Animal>();
		while (rs.next()) {
			Animal a = Animal.builder().species(rs.getString("species")).subspecies(rs.getString("subspecies")).build();
			animals.add(a);
			r = animals;
		}
		pStat.close();

		return r;
	}
	public List<Animal> getAnimalsSearch(String search) throws SQLException {
		List<Animal> r = null;

		String query = "SELECT DISTINCT * FROM ANIMAL WHERE AnimalId LIKE CONCAT('%',?,'%')"
				+ " OR name LIKE CONCAT('%',?,'%') OR species LIKE CONCAT('%',?,'%')"
				+ " OR subspecies LIKE CONCAT('%',?,'%')"
				+ " OR breed LIKE CONCAT('%',?,'%')"
				+ " OR Colour LIKE CONCAT('%',?,'%')"
				+ " OR Features LIKE CONCAT('%',?,'%')"
				+ " OR BirthDate LIKE CONCAT('%',?,'%')"
				+ " OR RFID LIKE CONCAT('%',?,'%')"
				+ " OR Microchip LIKE CONCAT('%',?,'%')"
				+ " OR TattooNum LIKE CONCAT('%',?,'%')"
				+ "ORDER BY\r\n"
				+ "  CASE\r\n"
				+ "    WHEN animalid LIKE ? OR name LIKE ? THEN 1"
				+ "    WHEN animalid LIKE CONCAT(?,'%') OR name LIKE CONCAT(?,'%') THEN 2"
				+ "    WHEN animalid LIKE CONCAT('%',?,'%') OR name LIKE CONCAT('%',?,'%') THEN 4"
				+ "    ELSE 3"
				+ "  END";
		PreparedStatement pStat = conn.prepareStatement(query);
		for(int i = 1; i<18; i++) {pStat.setString(i, search);}
		rs = pStat.executeQuery();
		List<Animal> animals = new ArrayList<Animal>();
		while (rs.next()) {
			Animal a = Animal.builder().id(rs.getString("animalId")).name(rs.getString("name"))
					.species(rs.getString("species")).subspecies(rs.getString("subspecies"))
					.breed(rs.getString("breed")).sex(rs.getString("sex")).color(rs.getString("colour"))
					.features(rs.getString("features")).bithdate(rs.getDate("birthdate"))
					.rfid(rs.getString("birthdate")).microchip(rs.getString("microchip"))
					.tattooNum(rs.getString("tattooNum")).build();
			animals.add(a);
			r = animals;
		}
		pStat.close();

		return r;
	}

	public List<Animal> getAnimalsBySubspecies(String subspecies) throws SQLException {
		List<Animal> r = null;
		String query = "SELECT * FROM ANIMAL WHERE Subspecies = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, subspecies);
		rs = pStat.executeQuery();
		List<Animal> animals = new ArrayList<Animal>();

		while (rs.next()) {
			Animal a = Animal.builder().id(rs.getString("animalId")).name(rs.getString("name"))
					.species(rs.getString("species")).subspecies(rs.getString("subspecies"))
					.breed(rs.getString("breed")).sex(rs.getString("sex")).color(rs.getString("colour"))
					.features(rs.getString("features")).bithdate(rs.getDate("birthdate"))
					.rfid(rs.getString("birthdate")).microchip(rs.getString("microchip"))
					.tattooNum(rs.getString("tattooNum")).build();
			animals.add(a);
			r = animals;
		}
		pStat.close();

		return r;
	}

	public void insertComment(Comment comment) throws SQLException {
		String query = "INSERT INTO COMMENTS (CommentId, UserId, AnimalId, CommentDate, CommentText) VALUES(?,?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, comment.getCommentId());
		pStat.setString(2, comment.getUserId());
		pStat.setString(3, comment.getAnimalId());
		pStat.setTimestamp(4, comment.getCommentDate());
		pStat.setString(5, comment.getCommentText());
		int rowCount = pStat.executeUpdate();
		pStat.close();

		// for testing on windows curl -X POST localhost:8001/api/admin/comment -d
		// "{\"userId\": \"1\", \"animalId\": \"53195\", \"commentDate\":
		// \"2021-11-29\", \"commentText\": \"this is a test comment\"}"

	}

	public List<Comment> getAllComments() throws SQLException {
		List<Comment> r =null;

		String query = "SELECT * FROM COMMENTS ORDER BY CommentDate DESC";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Comment> comments = new ArrayList<Comment>();
		while(rs.next()) {

			String userId;

			if(rs.getString("UserId") != null) {
				userId = rs.getString("UserId");
			} else{
				userId = "Deleted";
			}

			Comment c = Comment.builder()
					.commentId(rs.getString("CommentId"))
					.userId(userId)
					.animalId(rs.getString("AnimalId"))
					.commentDate(rs.getTimestamp("CommentDate"))
					.commentText(rs.getString("CommentText"))
					.build();
			comments.add(c);
		}
		r = comments;
		pStat.close();

		return r;
	}
	
	public List<Comment> getStudentComments(String animalId) throws SQLException {
		List<Comment> r =null;

		String query = "SELECT C.CommentId, C.UserId, C.AnimalId, C.CommentDate, C.CommentText, U.FName, U.LName FROM COMMENTS AS C, USER AS U "
				+ "WHERE C.AnimalId = " + animalId + " AND U.UserId = C.UserId AND U.AccountType = \"Student\" ORDER BY C.CommentDate DESC";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Comment> studentComments = new ArrayList<Comment>();
		while(rs.next()) {

			String userId;

			if(rs.getString("UserId") != null) {
				userId = rs.getString("UserId");
			} else{
				userId = "Deleted";
			}

			Comment c = Comment.builder()
					.commentId(rs.getString("CommentId"))
					.userId(userId)
					.animalId(rs.getString("AnimalId"))
					.commentDate(rs.getTimestamp("CommentDate"))
					.commentText(rs.getString("CommentText"))
					.build();
			studentComments.add(c);
		}
		r = studentComments;
		pStat.close();

		return r;
	}
	
	public List<Comment> getStaffComments(String animalId) throws SQLException {
		List<Comment> r =null;

		String query = "SELECT C.CommentId, C.UserId, C.AnimalId, C.CommentDate, C.CommentText, U.FName, U.LName FROM COMMENTS AS C, USER AS U "
				+ "WHERE C.AnimalId = " + animalId + " AND U.UserId = C.UserId AND U.AccountType <> \"Student\" ORDER BY C.CommentDate DESC";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Comment> studentComments = new ArrayList<Comment>();
		while(rs.next()) {

			String userId;

			if(rs.getString("UserId") != null) {
				userId = rs.getString("UserId");
			} else{
				userId = "Deleted";
			}

			Comment c = Comment.builder()
					.commentId(rs.getString("CommentId"))
					.userId(userId)
					.animalId(rs.getString("AnimalId"))
					.commentDate(rs.getTimestamp("CommentDate"))
					.commentText(rs.getString("CommentText"))
					.build();
			studentComments.add(c);
		}
		r = studentComments;
		pStat.close();

		return r;
	}

	public void deleteComment(String commentId) throws SQLException {

		String query = "DELETE FROM COMMENTS WHERE CommentId=\"" + commentId + "\";";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.executeUpdate();
		pStat.close();

	}

	public void insertAnimalRequest(AnimalRequest animalRequest) throws SQLException {
		String query = "INSERT INTO ANIMAL_REQUEST (AnimalRequestId, AnimalId, UserId, State) VALUES(?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animalRequest.getRequestId());
		pStat.setString(2, animalRequest.getAnimalId());
		pStat.setString(3, animalRequest.getUserId());
		pStat.setString(4, animalRequest.getCurrentState());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();

	}

	public List<AnimalRequest> getAnimalRequest(String requestId) throws SQLException {
		List<AnimalRequest> r = null;
		String query = "SELECT * FROM ANIMAL_REQUEST WHERE AnimalrequestId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, requestId);
		rs = pStat.executeQuery();
		List<AnimalRequest> animalRequests = new ArrayList<AnimalRequest>();
		while (rs.next()) {
			AnimalRequest ar = AnimalRequest.builder().requestId(rs.getString("animalRequestId"))
					.animalId(rs.getString("animalId")).userId(rs.getString("userID"))
					.currentState(rs.getString("state")).build();
			animalRequests.add(ar);
			r = animalRequests;
		}
		pStat.close();

		return r;
	}

	public List<AnimalRequest> getAnimalRequestsUser(String userId) throws SQLException {
		List<AnimalRequest> r = null;

		String query = "SELECT * FROM ANIMAL_REQUEST WHERE userId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, userId);
		rs = pStat.executeQuery();
		List<AnimalRequest> animalRequests = new ArrayList<AnimalRequest>();
		while (rs.next()) {
			AnimalRequest ar = AnimalRequest.builder().requestId(rs.getString("animalRequestId"))
					.animalId(rs.getString("animalId")).userId(rs.getString("userID"))
					.currentState(rs.getString("state")).build();
			animalRequests.add(ar);
			r = animalRequests;
		}
		pStat.close();

		return r;
	}

	public List<AnimalRequest> getAllAnimalRequests() throws SQLException {
		List<AnimalRequest> r = null;

		String query = "SELECT * FROM ANIMAL_REQUEST";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<AnimalRequest> animalRequests = new ArrayList<AnimalRequest>();
		while (rs.next()) {
			AnimalRequest ar = AnimalRequest.builder().requestId(rs.getString("animalRequestId"))
					.animalId(rs.getString("animalId")).userId(rs.getString("userID"))
					.currentState(rs.getString("state")).build();
			animalRequests.add(ar);
			r = animalRequests;
		}
		pStat.close();

		return r;
	}

	public void updateAnimalRequest(AnimalRequest newAnimalRequest) throws SQLException {
		String query = "UPDATE ANIMAL_REQUEST SET state=? WHERE animalRequestId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, newAnimalRequest.getCurrentState());
		pStat.setString(2, newAnimalRequest.getRequestId());
		int rowCount = pStat.executeUpdate();

		System.out.println("row Count = " + rowCount);
		pStat.close();

	}

	public void insertUser(User user) throws SQLException {
		String query = "INSERT INTO USER (UserId, Username, `Password`, AccountType, ActivationDate, FName, LName, Email) VALUES(?,?,?,?,?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, user.getId());
		pStat.setString(2, user.getUsername());
		pStat.setString(3, user.getPassword());
		pStat.setString(4, user.getAccountType());
		pStat.setDate(5, user.getActivationDate());
		pStat.setString(6, user.getFName());
		pStat.setString(7, user.getLName());
		pStat.setString(8, user.getEmail());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();

	}

	public void deleteUser(String userId) throws SQLException {

		String query = "DELETE FROM USER WHERE UserId='" + userId + "';";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.executeUpdate();
		pStat.close();

	}

	public List<User> getAllUsers() throws SQLException {
		List<User> r = null;

		String query = "SELECT * FROM USER";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<User> users = new ArrayList<User>();
		while (rs.next()) {
			User u = User.builder().id(rs.getString("UserId")).username(rs.getString("username"))
					.password(rs.getString("password")).accountType(rs.getString("AccountType"))
					.activationDate(rs.getDate("ActivationDate")).fName(rs.getString("Fname"))
					.lName(rs.getString("LName")).email(rs.getString("email")).build();
			users.add(u);
			r = users;
		}
		pStat.close();

		return r;
	}

	public List<User> getUser(String id) throws SQLException {
		List<User> r = null;
		String query = "SELECT * FROM User WHERE userId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, id);
		rs = pStat.executeQuery();
		List<User> users = new ArrayList<User>();
		while (rs.next()) {
			User u = User.builder().id(rs.getString("UserId")).username(rs.getString("username"))
					.password(rs.getString("password")).accountType(rs.getString("AccountType"))
					.activationDate(rs.getDate("ActivationDate")).fName(rs.getString("Fname"))
					.lName(rs.getString("LName")).email(rs.getString("email")).build();
			users.add(u);
			r = users;
		}
		
		pStat.close();

		return r;
	}

	public void updateUser(User user) throws SQLException {
		// TODO Auto-generated method stub

	}

	public User getUserUsername(String username) throws SQLException {
		User r = null;

		String query = "SELECT * FROM User WHERE Username = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, username);
		rs = pStat.executeQuery();
		if (rs.next()) {
			User u = User.builder().id(rs.getString("UserId")).username(rs.getString("username"))
					.password(rs.getString("password")).accountType(rs.getString("AccountType"))
					.activationDate(rs.getDate("ActivationDate")).fName(rs.getString("Fname"))
					.lName(rs.getString("LName")).email(rs.getString("email")).build();
			r = u;
		}
		pStat.close();

		return r;
	}

	

	public List<AnimalHealthRecord> getAnimalHealthRecord(String id) throws SQLException {
		List<AnimalHealthRecord> r = null;
		String query = "SELECT * FROM HEALTH_RECORD WHERE AnimalId = ? ORDER BY Date DESC";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, id);
		rs = pStat.executeQuery();
		List<AnimalHealthRecord> records = new ArrayList<AnimalHealthRecord>();

		while (rs.next()) {
			AnimalHealthRecord hr = AnimalHealthRecord.builder()
					.animalId(id)
					.date(rs.getTimestamp("Date"))
					.type(rs.getString("Type"))
					.record(rs.getString("Record"))
					.notes(rs.getString("Notes"))
					.build();
			records.add(hr);
			r = records;
		}
		pStat.close();

		return r;
	}

	public List<AnimalWeight> getAnimalWeight(String id) throws SQLException {
		List<AnimalWeight> r = null;
		String query = "SELECT * FROM WEIGHT WHERE AnimalId = ? ORDER BY Date DESC";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, id);
		rs = pStat.executeQuery();
		List<AnimalWeight> records = new ArrayList<AnimalWeight>();

		while (rs.next()) {
			AnimalWeight w = AnimalWeight.builder()
					.animalId(id)
					.date(rs.getTimestamp("Date"))
					.weight(rs.getDouble("Weight"))
					.notes(rs.getString("Notes"))
					.build();
			records.add(w);
			r = records;
		}
		pStat.close();

		return r;
	}
	
	public void insertImage(Image image) throws SQLException, FileNotFoundException {
		String query = "INSERT INTO IMAGE (ImageId, ImageData, CreationDate, UserId, AnimalId) VALUES(?,?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		
		File imageFile = new File(image.getImageLocation());
		FileInputStream input = new FileInputStream(imageFile);
		
		pStat.setString(1, image.getImageId());
		pStat.setBinaryStream(2, input);
		pStat.setTimestamp(3, image.getCreationDate());
		pStat.setString(4, image.getUserId());
		pStat.setString(5, image.getAnimalId());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();

	}
	
	public List<Image> getAllImages() throws SQLException {
		List<Image> r =null;

		String query = "SELECT * FROM IMAGE ORDER BY CreationDate DESC";
		PreparedStatement pStat = conn.prepareStatement(query);
		rs = pStat.executeQuery(query);
		List<Image> images = new ArrayList<Image>();
		while(rs.next()) {

			String imageId;

			if(rs.getString("ImageId") != null) {
				imageId = rs.getString("ImageId");
			} else{
				imageId = "Deleted";
			}

			Image c = Image.builder()
					.userId(rs.getString("UserId"))
					.imageId(imageId)
					.animalId(rs.getString("AnimalId"))
					.creationDate(rs.getTimestamp("CreationDate"))
					.imageData(rs.getBlob("ImageData"))
					.build();
			images.add(c);
		}
		r = images;
		pStat.close();

		return r;
	}
	
	public static void main(String[] args0) {
		MySQLJDBC myApp = new MySQLJDBC();
		myApp.initializeConnection();

		AnimalRequest ar = AnimalRequest.builder().requestId("195").animalId("53195").userId("1").currentState("state")
				.build();
		// myApp.insert()
		try {
			System.out.println(myApp.getAnimalHealthRecord("53195"));
			// System.out.println(myApp.getAnimalRequestsUser("2"));
			// System.out.println(myApp.getAllUsers());

			// .out.println(myApp.getAnimalsBySubspecies("Dog"));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// myApp.close();
	}

	public void insertAnimalWeight(AnimalWeight animalWeight) throws SQLException{
		String query = "INSERT INTO WEIGHT (AnimalId, Date, Weight, notes) VALUES(?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animalWeight.getAnimalId());
		pStat.setTimestamp(2, animalWeight.getDate());
		pStat.setDouble(3, animalWeight.getWeight());
		pStat.setString(4, animalWeight.getNotes());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();
		
	}

	public void insertAnimalHealthRecord(AnimalHealthRecord animalHealthRecord) throws SQLException {
		String query = "INSERT INTO HEALTH_RECORD (AnimalId, Date, Type,Record, notes) VALUES(?,?,?,?,?)";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animalHealthRecord.getAnimalId());
		pStat.setTimestamp(2, animalHealthRecord.getDate());
		pStat.setString(3, animalHealthRecord.getType());
		pStat.setString(4, animalHealthRecord.getRecord());
		pStat.setString(5, animalHealthRecord.getNotes());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();
	}

	

	
}
