package data;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import domain.admin.Email;
import domain.admin.EmailRepository;
import errors.UserNotFoundException;

public class MailingDB implements EmailRepository{

	private static final Map<String,Email> EMAILS_STORE = new ConcurrentHashMap();
	
	@Override
	public String create(Email newEmail) {
        Email email = Email.builder()
            .email(newEmail.getEmail())
            .name(newEmail.getName())
            .build();
        EMAILS_STORE.put(newEmail.getEmail(), email);

        return newEmail.getEmail();
	}

	@Override
	public List<Email> getEmails() {
		return new ArrayList<>( EMAILS_STORE.values());
	}

	@Override
	public void deleteEmail(String email) throws UserNotFoundException {
        Email deleteEmail = Optional.of(EMAILS_STORE.get(email)).orElseThrow(()->  new UserNotFoundException(404, "Email not found."));
        EMAILS_STORE.remove(deleteEmail.getEmail(),deleteEmail);
	}

	@Override
	public Email updateEmail(Email email) throws UserNotFoundException {
		Optional.of(EMAILS_STORE.get(email.getEmail())).orElseThrow(()->  new UserNotFoundException(404, "Email not found."));
		EMAILS_STORE.replace(email.getEmail(), email);
        return  email;
	}

}
