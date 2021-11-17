package data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.UUID;

import domain.animal.*;
import errors.ResourceNotFoundException;

public class AnimalDB implements AnimalRepository{
    private static final Map<String,Animal> ANIMAL_STORE = new ConcurrentHashMap();
    
    
	@Override
	public String create(NewAnimal animal) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Animal> getAnimals() {
		String id = UUID.randomUUID().toString();
		//CREATE TEST ANIMAL
		Animal a = Animal.builder().id(id).type("dog").weight(123).breed("big").color("black").build();
	    ANIMAL_STORE.put(id,a);
        return new ArrayList<>(ANIMAL_STORE.values());
	}

	@Override
	public void deleteAnimal(String id) throws ResourceNotFoundException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Animal updateAnimal(Animal animal) throws ResourceNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}
}
