package domain.animal;

import java.util.List;

import errors.ResourceNotFoundException;

public interface AnimalRepository {
	 String createAnimal(NewAnimal animal);
	 List<Animal> getAnimals();
	 List<Animal> getAnimals(String id) throws ResourceNotFoundException;
	 void deleteAnimal(String id) throws ResourceNotFoundException;
	 Animal updateAnimal(Animal animal) throws ResourceNotFoundException;
	 
	 String createAnimalDetails(NewAnimalDetails animalDetails);
	 List<AnimalDetails> getAnimalDetails(String id);
	 void deleteAnimalDetails(String id) throws ResourceNotFoundException;
	 AnimalDetails updateAnimalDetails(AnimalDetails animalDetails) throws ResourceNotFoundException;
	 
	 String createAnimalWeight(AnimalWeight animalWeight);
	 AnimalWeight getAnimalWeight(String id);
	 void deleteAnimalWeight(String id) throws ResourceNotFoundException;
	 AnimalWeight updateAnimalWeight(Animal animal) throws ResourceNotFoundException;
}
