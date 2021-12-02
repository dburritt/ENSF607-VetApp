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
	
	public void updateAnimal(Animal animal) throws SQLException {
		String query = "UPDATE ANIMAL SET type=? , weight =? , breed=? , color=? WHERE animalId = ?";
		PreparedStatement pStat = conn.prepareStatement(query);
		pStat.setString(1, animal.getType());
		pStat.setDouble(2,  animal.getWeight());
		pStat.setString(3,  animal.getBreed());
		pStat.setString(4,  animal.getColor());
		pStat.setString(5, animal.getId());
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
	                .type(rs.getString("type"))
	                .weight(rs.getDouble("weight"))
	                .breed(rs.getString("breed"))
	                .color(rs.getString("color"))
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
	                .type(rs.getString("type"))
	                .weight(rs.getDouble("weight"))
	                .breed(rs.getString("breed"))
	                .color(rs.getString("color"))
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
		pStat.setDate(4, java.sql.Date.valueOf(comment.getCommentDate()));
		pStat.setString(5,  comment.getCommentText());
		int rowCount = pStat.executeUpdate();
		System.out.println("row Count = " + rowCount);
		pStat.close();
		
		// for testing on windows curl -X POST localhost:8001/api/admin/comment -d "{\"userId\": \"1\", \"animalId\": \"53195\", \"commentDate\": \"2021-11-29\", \"commentText\": \"this is a test comment\"}"
		
	}
	
	public static void main(String[] args0) {
		MySQLJDBC myApp = new MySQLJDBC();
		myApp.initializeConnection();
		//myApp.close();
	}
	

}
