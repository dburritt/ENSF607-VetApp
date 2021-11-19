package domain.user;

import lombok.AllArgsConstructor;

import errors.UserNotFoundException;

import java.util.List;
import java.util.Objects;


@AllArgsConstructor
public class AdminService {
	
	private final AdminRepository adminRepository;

    public String create(NewAdmin admin) {
        return adminRepository.create(admin);
    }

    public List<Admin> getAdmin(){return  adminRepository.getAdmin();}
    public List<Admin> getAdmin(String id) throws UserNotFoundException {return  adminRepository.getAdmin(id);}

    public void deleteAdmin(String id) throws UserNotFoundException{
        Objects.requireNonNull(id,"User id is required");
        adminRepository.deleteAdmin(id);
    }
    public Admin updateAdmin(Admin admin) throws UserNotFoundException{
        Objects.requireNonNull(admin.getId(),"Admin id is required for update");
        Objects.requireNonNull(admin.getLogin(),"Admin login is required for update");
        Objects.requireNonNull(admin.getPassword(),"Admin password is required for update");
        return  adminRepository.updateAdmin(admin);

    }

}
