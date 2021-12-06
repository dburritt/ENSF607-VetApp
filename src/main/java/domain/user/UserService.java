package domain.user;

import lombok.AllArgsConstructor;

import errors.UserNotFoundException;

import java.util.List;
import java.util.Objects;
import api.user.RegistrationRequest;


@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public String createUser(NewUser user) {
        return userRepository.create(user);
    }

    public List<User> getUsers(){return  userRepository.getUsers();}
    
    public List<User> getUsers(String id) throws UserNotFoundException {return  userRepository.getUsers(id);}

    public void deleteUser(String id) throws UserNotFoundException{
        Objects.requireNonNull(id,"User id is required");
        userRepository.deleteUser(id);
    }
    public User updateUser(User user) throws UserNotFoundException{
        Objects.requireNonNull(user.getId(),"User id is required for update");
        Objects.requireNonNull(user.getUsername(),"Username is required for update");
        Objects.requireNonNull(user.getPassword(),"User password is required for update");
        return  userRepository.updateUser(user);

    }

	public List<User> verifyUser(RegistrationRequest registerRequest) {
		return  userRepository.verifyUser(registerRequest);

	}
}
