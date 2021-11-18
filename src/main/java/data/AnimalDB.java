package data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.UUID;

import domain.animal.*;
import errors.ResourceNotFoundException;

public class AnimalDB implements AnimalRepository{
	
    private static final Map<String,Animal> ANIMAL_STORE = new ConcurrentHashMap();
    private static final Map<String,AnimalDetails> ANIMAL_DETAILS_STORE = new ConcurrentHashMap();
    
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
	    AnimalDetails d = AnimalDetails.builder().id(id).tattoo("234234").RFID("1231223").DOB("2018-08-12").build();
	    ANIMAL_DETAILS_STORE.put(id,d);
	    
        return new ArrayList<>(ANIMAL_STORE.values());
	}
	@Override
	public List<Animal> getAnimals(String id) throws ResourceNotFoundException{
		Animal animal= Optional.ofNullable(ANIMAL_STORE.get(id)).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		List<Animal> animals = new ArrayList<Animal>();
		animals.add(animal);
		return  animals;
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

	

	@Override
	public List<AnimalDetails> getAnimalDetails(String id) {
		AnimalDetails details = Optional.ofNullable(ANIMAL_DETAILS_STORE.get(id)).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		List<AnimalDetails> animalDetail = new ArrayList<AnimalDetails>();
		animalDetail.add(details);
		return  animalDetail;
		
	}
}





