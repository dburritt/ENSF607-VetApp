package domain.user;

import errors.UserNotFoundException;

import java.util.List;

public interface UserRepository {
	String create(NewUser user);
	String createAdmin(NewAdmin admin);
    List<User> getUsers();
    List<Admin> getAdmin();
    void deleteUser(String id) throws UserNotFoundException;
    User updateUser(User user) throws UserNotFoundException;
    void deleteAdmin(String id) throws UserNotFoundException;
    Admin updateAdmin(Admin admin) throws UserNotFoundException;
}
