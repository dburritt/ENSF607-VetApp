package domain.animal;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import domain.admin.Comment;
import errors.ResourceNotFoundException;

@AllArgsConstructor
public class AnimalService {
	private final AnimalRepository animalRepository;
	
	public String createAnimal(NewAnimal animal) {
        return animalRepository.createAnimal(animal);
    }

    public List<Animal> getAnimals(){return  animalRepository.getAnimals();}
    
    public List<Animal> getAnimals(String id) throws ResourceNotFoundException {return animalRepository.getAnimals(id);}
    public List<Animal> getAvailableAnimals() {return animalRepository.getAvailableAnimals();}
	public List<Animal> getAnimalSubspecies() {return animalRepository.getAnimalSubspecies();}
	public List<Animal> getAnimalBreed() {return animalRepository.getAnimalBreed();}
	public List<Animal> getAnimalsBySubspecies(String subspecies) {return animalRepository.getAnimalsBySubspecies(subspecies);}
	public List<Animal> getAnimalsByUserId(String userId) {return animalRepository.getAnimalsByUserId(userId); }
	public List<Animal> getAnimalsSearch(String search) {return animalRepository.getAnimalsSearch(search); }

    public Animal updateAnimal(Animal animal) throws ResourceNotFoundException{
        Objects.requireNonNull(animal.getId(),"animal id is required for update");
        return  animalRepository.updateAnimal(animal);

    }
    public String createAnimalDetails(AnimalDetails AnimalDetails) {
        return animalRepository.createAnimalDetails(AnimalDetails);
    }
	public List<AnimalDetails> getAnimalDetails(String id) throws ResourceNotFoundException {
		return animalRepository.getAnimalDetails(id);
	}
	public AnimalDetails updateAnimalDetails(AnimalDetails animalDetails) throws ResourceNotFoundException{
        Objects.requireNonNull(animalDetails.getId(),"animal id is required for update");
        return  animalRepository.updateAnimalDetails(animalDetails);
    }

	public List<AnimalWeight> getAnimalWeight(String id) throws ResourceNotFoundException {
		return animalRepository.getAnimalWeight(id);
	}
	
	public String createAnimalStatus(AnimalStatus animalStatus) {
        return animalRepository.createAnimalStatus(animalStatus);
    }
	public AnimalStatus updateAnimalStatus(AnimalStatus animalStatus) {
		 Objects.requireNonNull(animalStatus.getAnimalId(),"animal id is required for update");
	        return  animalRepository.updateAnimalStatus(animalStatus);
	}
	
	
	public AnimalStatus getAnimalStatus(String id) throws ResourceNotFoundException {
		return animalRepository.getAnimalStatus(id);
	}
	
	public AnimalHealthRecord updateAnimalHealthRecord(AnimalHealthRecord animalHealthRecord) {
		Objects.requireNonNull(animalHealthRecord.getAnimalId(),"animal id is required for update");
        return  animalRepository.updateAnimalHealthRecord(animalHealthRecord);
	}

	public String createAnimalHealthRecord(AnimalHealthRecord animalHealthRecord) {
		return animalRepository.createAnimalHealthRecord(animalHealthRecord);		
	}
	public void deleteAnimalHealthRecord(String deleteAnimalId, String deleteTime) {
		Objects.requireNonNull(deleteAnimalId,"animal id is required for update");
		Objects.requireNonNull(deleteTime,"animal id is required for update");
		animalRepository.deleteAnimalHealthRecord(deleteAnimalId,deleteTime);
		
	}
	public AnimalWeight updateAnimalWeight(AnimalWeight animalWeight) {
		Objects.requireNonNull(animalWeight.getAnimalId(),"animal id is required for update");
        return  animalRepository.updateAnimalWeight(animalWeight);
	}
	public void deleteWeight(String deleteAnimalId, String deleteTime) {
		Objects.requireNonNull(deleteAnimalId,"animal id is required for update");
		Objects.requireNonNull(deleteTime,"animal id is required for update");
		animalRepository.deleteAnimalWeight(deleteAnimalId,deleteTime);
	}
	public String createAnimalWeight(AnimalWeight animalWeight) {
		return animalRepository.createAnimalWeight(animalWeight);				
	}

	public List<AnimalHealthRecord> getAnimalHealthRecord(String id) {
		return animalRepository.getAnimalHealthRecord(id);
	}
	
    public String createAnimalReminder(NewAnimalReminder newAnimalReminder) {
        return animalRepository.createAnimalReminder(newAnimalReminder);
    }

    public List<AnimalReminder> getAnimalReminders(String animalId){return  animalRepository.getAnimalReminders(animalId);}

    public void deleteAnimalReminder(String id) throws ResourceNotFoundException{
        Objects.requireNonNull(id,"Reminder id is required");
        animalRepository.deleteAnimalReminder(id);
    }
    public AnimalReminder updateAnimalReminder(AnimalReminder animalReminder) throws ResourceNotFoundException{
    	Objects.requireNonNull(animalReminder.getReminderId(),"Reminder Id is required for update");
        Objects.requireNonNull(animalReminder.getText(),"Reminder text is required for update");
        Objects.requireNonNull(animalReminder.getDueDate(),"Date of entry is required for update");
        return  animalRepository.updateAnimalReminder(animalReminder);

    }
	public String createAnimalRequest(NewAnimalRequest animalRequest) {
		return animalRepository.createAnimalRequest(animalRequest);
	}

    public List<AnimalRequest> getAnimalRequests(){
    	return  animalRepository.getAnimalRequests();
    }
    public List<AnimalRequest> getAnimalRequestsUser(String userId){
    	return  animalRepository.getAnimalRequestsUser(userId);
    }
	
	public AnimalRequest updateAnimalRequest(String userId, AnimalRequest animalRequest) throws ResourceNotFoundException{
		return animalRepository.updateAnimalRequest(userId, animalRequest);
	}
	
	public  void deleteAnimalRequest(String id) throws ResourceNotFoundException{
		
	}

	



	

	



	
}
