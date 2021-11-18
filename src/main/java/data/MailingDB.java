package data;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import domain.admin.Email;
import domain.admin.EmailRepository;
import domain.animal.Animal;
import errors.UserNotFoundException;

public class MailingDB implements EmailRepository{

	private static final Map<String,Animal> ANIMAL_STORE = new ConcurrentHashMap();
	
	@Override
	public String create(Email email) {
		return null;
	}

	@Override
	public List<Email> getUsers() {
		return null;
	}

	@Override
	public void deleteEmail(String email) throws UserNotFoundException {
		
	}

	@Override
	public Email updateUser(Email user) throws UserNotFoundException {
		return null;
	}

}
