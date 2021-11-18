package domain.user;

import errors.UserNotFoundException;

import java.util.List;

public interface AdminRepository {
	String create(NewAdmin admin);
    List<Admin> getAdmin();
    void deleteAdmin(String id) throws UserNotFoundException;
    Admin updateAdmin(Admin admin) throws UserNotFoundException;
}
