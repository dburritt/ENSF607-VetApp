package data;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import domain.user.Admin;
import domain.user.NewAdmin;
import domain.user.NewUser;
import domain.user.User;
import domain.user.AdminRepository;
import errors.UserNotFoundException;

public class AdminDB implements AdminRepository {
	
	private static final Map<String,Admin> ADMIN_STORE = new ConcurrentHashMap();

    
    @Override
    public String create(NewAdmin newAdmin) {
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
    public List<Admin> getAdmin(){
        return new ArrayList<>( ADMIN_STORE.values());
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
