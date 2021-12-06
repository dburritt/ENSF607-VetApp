package data;

import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import api.user.RegistrationRequest;
import domain.user.NewUser;
import domain.user.User;
import domain.user.UserRepository;
import errors.ResourceNotFoundException;
import errors.UserNotFoundException;

public class UserDB implements UserRepository {
	
	private static final Map<String,User> USERS_STORE = new ConcurrentHashMap();
    MySQLJDBC DB;
    public UserDB() {
    	 DB = new MySQLJDBC();
    	 DB.initializeConnection();
    }
    @Override
    public String create(NewUser newUser) {
        String id = UUID.randomUUID().toString();
        User user = User.builder()
	        .id(id)
	        .username(newUser.getUsername())
	        .password(newUser.getPassword())
	        .accountType(newUser.getAccountType())
	        .activationDate(newUser.getActivationDate())
	        .fName(newUser.getFName())
	        .lName(newUser.getLName())
	        .email(newUser.getEmail())
	        .build();
        //USERS_STORE.put(id, user);
        try {
			DB.insertUser(user);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new ResourceNotFoundException(404, "could not create user.");
		}
        return id;
    }
    
    @Override
    public List<User> getUsers(){
    	try {
			return DB.getAllUsers();
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
       // return new ArrayList<>( USERS_STORE.values());
    }
    
    @Override
    public List<User> getUsers(String id) throws UserNotFoundException{
    	//User user = Optional.ofNullable(USERS_STORE.get(id)).orElseThrow(()->  new ResourceNotFoundException(404, "user not found."));
		List<User> users = null;
		try {
			users = DB.getUser(id);
			if (users == null)
				throw new ResourceNotFoundException(404, "user not found.");
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "user not found.");
		}
		//users.add(user);
		return users;
    }
    
    @Override
    public  void deleteUser(String id) throws UserNotFoundException {
		try {
			DB.deleteUser(id);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new ResourceNotFoundException(404, "User not found.");
		}
    }
    
    @Override
    public  User updateUser(User user){
        //Optional.of(USERS_STORE.get(user.getId())).orElseThrow(()->  new UserNotFoundException(404, "User not found."));
        //USERS_STORE.replace(user.getId(), user);
    	try {
			DB.updateUser(user);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			throw new ResourceNotFoundException(404, "animal not found.");
		}
        return user;
    }
	@Override
	public List<User> verifyUser(RegistrationRequest registerRequest) {
		List<User> listU = null;
		try {
			User u = DB.getUserUsername(registerRequest.getUsername());
			if (u== null) 
				throw new ResourceNotFoundException(404, "user/password not found.");
			if (u.getUsername().equals(registerRequest.getUsername()) && u.getPassword().equals(registerRequest.getPassword())){
				listU = new ArrayList<User>();
				listU.add(u);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			throw new ResourceNotFoundException(404, "animal not found.");
		}
		return listU;
	}
}
