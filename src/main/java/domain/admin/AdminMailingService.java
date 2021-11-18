package domain.admin;

import java.util.List;
import java.util.Objects;

import errors.UserNotFoundException;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AdminMailingService {

    private final EmailRepository emailRepository;

    public String create(Email email) {
        return emailRepository.create(email);
    }

    public List<Email> getEmails(){return  emailRepository.getEmails();}

    public void deleteEmail(String email) throws UserNotFoundException{
        Objects.requireNonNull(email,"Email is required");
        emailRepository.deleteEmail(email);
    }
    public Email updateEmail(Email email) throws UserNotFoundException{
        Objects.requireNonNull(email.getEmail(),"Email is required for update");
        Objects.requireNonNull(email.getName(),"User's name is required for update");
        return  emailRepository.updateEmail(email);

    }
	
}
