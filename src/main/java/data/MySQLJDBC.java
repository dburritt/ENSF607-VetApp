package data;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;
import java.sql.*;
import domain.animal.*;

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
	

	public static void main(String[] args0) {
		MySQLJDBC myApp = new MySQLJDBC();
		myApp.initializeConnection();
		//myApp.close();
	}

	public void insertAnimal(Animal animal) throws SQLException {
		String query = "INSERT INTO ANIMAL (animalId, type, weight, breed, color) values(?,?,?,?,?)";
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

	

}
