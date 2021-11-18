package domain.animal;

import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Objects;

import errors.ResourceNotFoundException;

@AllArgsConstructor
public class AnimalService {
	private final AnimalRepository animalRepository;
	
	public String createAnimal(NewAnimal animal) {
        return animalRepository.createAnimal(animal);
    }

    public List<Animal> getAnimals(){return  animalRepository.getAnimals();}
    
    public List<Animal> getAnimals(String id) throws ResourceNotFoundException {return animalRepository.getAnimals(id);}
    
    public void deleteUser(String id) throws ResourceNotFoundException{
        Objects.requireNonNull(id,"User id is required");
        animalRepository.deleteAnimal(id);
    }
    public Animal updateAnimal(Animal animal) throws ResourceNotFoundException{
        Objects.requireNonNull(animal.getId(),"animal id is required for update");
        //Objects.requireNonNull(animal.getLogin(),"User login is required for update");
        //Objects.requireNonNull(animal.getPassword(),"User password is required for update");
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
	public AnimalDetails updateAnimalStatus(AnimalStatus animalStatus) {
		 Objects.requireNonNull(animalStatus.getAnimalId(),"animal id is required for update");
	        return  animalRepository.updateAnimalStatus(animalStatus);
	}
	public AnimalStatus getAnimalStatus(String id) throws ResourceNotFoundException {
		return animalRepository.getAnimalStatus(id);
	}

}
