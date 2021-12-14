package domain.animal;

import java.time.LocalDateTime;
import java.util.List;

import errors.ResourceNotFoundException;

public interface AnimalRepository {
	 String createAnimal(NewAnimal animal);
	 List<Animal> getAnimals();
	 List<Animal> getAnimals(String id) throws ResourceNotFoundException;
	 List<Animal> getAnimalsByUserId(String userId) throws ResourceNotFoundException;
	 void deleteAnimal(String id) throws ResourceNotFoundException;
	 Animal updateAnimal(Animal animal) throws ResourceNotFoundException;
	 
	 String createAnimalDetails(AnimalDetails animalDetails);
	 List<AnimalDetails> getAnimalDetails(String id);
	 void deleteAnimalDetails(String id) throws ResourceNotFoundException;
	 AnimalDetails updateAnimalDetails(AnimalDetails animalDetails) throws ResourceNotFoundException;
	 
	 String createAnimalWeight(AnimalWeight animalWeight);
	 List<AnimalWeight> getAnimalWeight(String id);
	 AnimalWeight updateAnimalWeight(AnimalWeight animalWeight) throws ResourceNotFoundException;
	 void deleteAnimalWeight(String deleteAnimalId, String deleteTime) throws ResourceNotFoundException;


	 String createAnimalStatus(AnimalStatus animalStatus);
	 AnimalStatus getAnimalStatus(String id);
	 AnimalStatus updateAnimalStatus(AnimalStatus animalStatus);
	 
	 String createAnimalReminder(NewAnimalReminder animalReminder);
	 void deleteAnimalReminder(String id) throws ResourceNotFoundException;
	 AnimalReminder updateAnimalReminder(AnimalReminder animalReminder) throws ResourceNotFoundException;
	 List<AnimalReminder> getAnimalReminders(String animalId);
	 

	 String createAnimalHealthRecord(AnimalHealthRecord animalHealthRecord);
	 List<AnimalHealthRecord> getAnimalHealthRecord(String id);
	 void deleteAnimalHealthRecord(String id, String deleteTime) throws ResourceNotFoundException;
	 AnimalHealthRecord updateAnimalHealthRecord(AnimalHealthRecord animalHealthRecord);

	
	 String createAnimalRequest(NewAnimalRequest animalRequest);
	 List<AnimalRequest> getAnimalRequests();
	 List<AnimalRequest> getAnimalRequestsUser(String userId);
	 void deleteAnimalRequest(String id) throws ResourceNotFoundException;
	 AnimalRequest updateAnimalRequest(String userId, AnimalRequest animalRequest) throws ResourceNotFoundException;
	 List<Animal> getAvailableAnimals();
	 
	 
	 List<Animal> getAnimalSubspecies();
	 List<Animal> getAnimalBreed();
	 List<Animal> getAnimalsBySubspecies(String type);
	 List<Animal> getAnimalsSearch(String search);
}
