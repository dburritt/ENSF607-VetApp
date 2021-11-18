package data;

import java.util.*;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import domain.user.Admin;
import domain.user.NewAdmin;
import domain.user.NewUser;
import domain.user.User;
import domain.user.UserRepository;
import errors.UserNotFoundException;

public class UserDB implements UserRepository {
	
	private static final Map<String,Admin> ADMIN_STORE = new ConcurrentHashMap();
	private static final Map<String,User> USERS_STORE = new ConcurrentHashMap();

    @Override
    public String create(NewUser newUser) {
        String id = UUID.randomUUID().toString();
        User user = User.builder()
            .id(id)
            .login(newUser.getLogin())
            .password(newUser.getPassword())
            .build();
        USERS_STORE.put(id, user);

        return id;
    }
    
    @Override
    public String createAdmin(NewAdmin newAdmin) {
        String id = UUID.randomUUID().toString();
        Admin admin = Admin.builder()
            .id(id)
            .login(newAdmin.getLogin())
            .password(newAdmin.getPassword())
            .build();
        ADMIN_STORE.put(id, admin);

        return id;
    }
    
    @Override
    public List<User> getUsers(){
        return new ArrayList<>( USERS_STORE.values());
    }
    
    @Override
    public List<Admin> getAdmin(){
        return new ArrayList<>( ADMIN_STORE.values());
    }
    
    @Override
    public  void deleteUser(String id) throws UserNotFoundException {
         User user= Optional.of(USERS_STORE.get(id)).orElseThrow(()->  new UserNotFoundException(404, "User not found."));
         USERS_STORE.remove(user.getId(),user);
    }
    
    @Override
    public  User updateUser(User user){
        Optional.of(USERS_STORE.get(user.getId())).orElseThrow(()->  new UserNotFoundException(404, "User not found."));
        USERS_STORE.replace(user.getId(), user);
        return user;
    }
    
    @Override
    public  void deleteAdmin(String id) throws UserNotFoundException {
         Admin admin= Optional.of(ADMIN_STORE.get(id)).orElseThrow(()->  new UserNotFoundException(404, "Administrator not found."));
         ADMIN_STORE.remove(admin.getId(), admin);
    }
    
    @Override
    public Admin updateAdmin(Admin admin){
        Optional.of(ADMIN_STORE.get(admin.getId())).orElseThrow(()->  new UserNotFoundException(404, "Administrator not found."));
        ADMIN_STORE.replace(admin.getId(), admin);
        return admin;
    }
}
