package domain.animal;

import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Objects;

import errors.ResourceNotFoundException;

@AllArgsConstructor
public class AnimalService {
	private final AnimalRepository animalRepository;
	
	public String create(NewAnimal animal) {
        return animalRepository.create(animal);
    }

    public List<Animal> getAnimals(){return  animalRepository.getAnimals();}

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

}
