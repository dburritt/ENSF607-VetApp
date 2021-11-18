package data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.UUID;

import domain.admin.Comment;
import domain.animal.*;
import errors.ResourceNotFoundException;

public class AnimalDB implements AnimalRepository{
	
    private static final Map<String,Animal> ANIMAL_STORE = new ConcurrentHashMap();
    private static final Map<String,AnimalDetails> ANIMAL_DETAILS_STORE = new ConcurrentHashMap();
    private static final Map<String,AnimalWeight> ANIMAL_WEIGHT_STORE = new ConcurrentHashMap();

	@Override
	public String createAnimal(NewAnimal newAnimal) {
		String id = UUID.randomUUID().toString();
		Animal animal = Animal.builder()
                .id(id)
                .type(newAnimal.getType())
                .weight(newAnimal.getWeight())
                .breed(newAnimal.getBreed())
                .color(newAnimal.getColor())
                .build();
        ANIMAL_STORE.put(id, animal);

       return animal.getId();
	}

	@Override
	public List<Animal> getAnimals() {
		String id = UUID.randomUUID().toString();
		//CREATE TEST ANIMAL
			Animal a = Animal.builder().id(id).type("dog").weight(123).breed("big").color("black").build();
		    ANIMAL_STORE.put(id,a);
		    AnimalDetails d = AnimalDetails.builder().id(id).tattoo("234234").RFID("1231223").DOB("2018-08-12").build();
		    ANIMAL_DETAILS_STORE.put(id,d);
				TreeMap<Date, Double> weight = new 	TreeMap<Date, Double>();
				weight.put(new Date(55415412), 123.1);
				weight.put(new Date(55445412), 120.0);
				weight.put(new Date(55455412), 125.1);
				weight.put(new Date(55459000), 121.1);
			AnimalWeight w = AnimalWeight.builder().id(id).weight(weight).build();
			ANIMAL_WEIGHT_STORE.put(id,w);

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
		Optional.of(ANIMAL_STORE.get(animal.getId())).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		ANIMAL_STORE.replace(animal.getId(), animal);
        return  animal;
	}

	@Override
	public String createAnimalDetails(NewAnimalDetails newAnimalDetails) {
		 AnimalDetails animalDetails = AnimalDetails.builder()
	                .id(newAnimalDetails.getId())
	                .tattoo(newAnimalDetails.getTattoo())
	                .RFID(newAnimalDetails.getRFID())
	                .DOB(newAnimalDetails.getDOB())
	                .build();
        ANIMAL_DETAILS_STORE.put(animalDetails.getId(), animalDetails);

       return animalDetails.getId();
	}

	@Override
	public List<AnimalDetails> getAnimalDetails(String id) {
		AnimalDetails details = Optional.ofNullable(ANIMAL_DETAILS_STORE.get(id)).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		List<AnimalDetails> animalDetail = new ArrayList<AnimalDetails>();
		animalDetail.add(details);
		return  animalDetail;
		
	}
	@Override
	public AnimalDetails updateAnimalDetails(AnimalDetails animalDetails) throws ResourceNotFoundException {
		Optional.of(ANIMAL_DETAILS_STORE.get(animalDetails.getId())).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		ANIMAL_DETAILS_STORE.replace(animalDetails.getId(), animalDetails);
        return  animalDetails;
	}
	
	@Override
	public void deleteAnimalDetails(String id) throws ResourceNotFoundException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String createAnimalWeight(AnimalWeight animalWeight) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AnimalWeight getAnimalWeight(String id) {
		AnimalWeight animalWeight = Optional.of(ANIMAL_WEIGHT_STORE.get(id)).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		return  animalWeight;
	}

	@Override
	public void deleteAnimalWeight(String id) throws ResourceNotFoundException {
		// TODO Auto-generated method stub
		
	}


	

	@Override
	public AnimalWeight updateAnimalWeight(Animal animal) throws ResourceNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	
}





