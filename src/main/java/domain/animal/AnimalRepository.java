package domain.animal;

import java.util.List;

import errors.ResourceNotFoundException;

public interface AnimalRepository {
	 String create(NewAnimal animal);
	 List<Animal> getAnimals();
	 void deleteAnimal(String id) throws ResourceNotFoundException;
	 Animal updateAnimal(Animal animal) throws ResourceNotFoundException;
}
