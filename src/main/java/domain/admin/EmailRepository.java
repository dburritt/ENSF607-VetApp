package domain.admin;

import errors.UserNotFoundException;

import java.util.List;

public interface EmailRepository {
	String create(Email email);
    List<Email> getEmails();
    void deleteEmail(String email) throws UserNotFoundException;
    Email updateEmail(Email user) throws UserNotFoundException;;
}
