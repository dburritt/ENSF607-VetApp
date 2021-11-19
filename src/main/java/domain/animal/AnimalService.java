package domain.animal;

import lombok.AllArgsConstructor;
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

	public AnimalWeight getAnimalWeight(String id) throws ResourceNotFoundException {
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

	public AnimalWeight updateAnimalWeight(AnimalWeight animalWeight) {
		Objects.requireNonNull(animalWeight.getId(),"animal id is required for update");
        return  animalRepository.updateAnimalWeight(animalWeight);
	}

	public String createAnimalWeight(AnimalWeight animalWeight) {
		return animalRepository.createAnimalWeight(animalWeight);				
	}

	public AnimalHealthRecord getAnimalHealthRecord(String id) {
		return animalRepository.getAnimalHealthRecord(id);
	}

}
