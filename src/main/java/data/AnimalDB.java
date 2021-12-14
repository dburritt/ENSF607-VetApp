package data;

import java.sql.SQLException;
import java.time.LocalDateTime;
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
import domain.user.User;
import errors.ResourceNotFoundException;
import errors.UserNotFoundException;

public class AnimalDB implements AnimalRepository{
	
    private static final Map<String,Animal> ANIMAL_STORE = new ConcurrentHashMap();
    private static final Map<String,AnimalDetails> ANIMAL_DETAILS_STORE = new ConcurrentHashMap();
    private static final Map<String,AnimalWeight> ANIMAL_WEIGHT_STORE = new ConcurrentHashMap();
    private static final Map<String,AnimalStatus> ANIMAL_STATUS_STORE = new ConcurrentHashMap();
    private static final Map<String,AnimalReminder> ANIMAL_REMINDER_STORE = new ConcurrentHashMap();
    private static final Map<String,AnimalHealthRecord> ANIMAL_HEALTH_RECORD_STORE = new ConcurrentHashMap();
    MySQLJDBC DB;
   
    
    public AnimalDB() {
    	 DB = new MySQLJDBC();
    	 DB.initializeConnection();
    	//CREATE TEST ANIMAL
    	 String id = UUID.randomUUID().toString();
			//Animal a = Animal.builder().id(id).type("dog").weight(123).breed("lab").color("black").build();
			
		  //  ANIMAL_STORE.put(id,a);
//		    AnimalDetails d = AnimalDetails.builder().id(id).tattoo("234234").RFID("1231223").DOB("2018-08-12").build();
//		    ANIMAL_DETAILS_STORE.put(id,d);
//				TreeMap<Date, Double> weight = new 	TreeMap<Date, Double>();
//				weight.put(new Date(55415412), 123.1);
//				weight.put(new Date(55445412), 120.0);
//				weight.put(new Date(55455412), 125.1);
//				weight.put(new Date(55459000), 121.1);
			//AnimalWeight w = AnimalWeight.builder().id(id).weight(weight).build();
			//ANIMAL_WEIGHT_STORE.put(id,w);
//			AnimalStatus s = AnimalStatus.builder().animalId(id).status("GOOD").build();
//			ANIMAL_STATUS_STORE.put(id,s);
			//AnimalHealthRecord h = AnimalHealthRecord.builder().animalId(id).date(new Date(2020,03,01)).type("temp").record("37 degrees").build();
			//ANIMAL_HEALTH_RECORD_STORE.put(id,h);
    }

	@Override
	public String createAnimal(NewAnimal newAnimal) {	
		String id = UUID.randomUUID().toString();
			Animal animal = Animal.builder()
				.id(id)
                .name(newAnimal.getName())
                .species(newAnimal.getSpecies())
                .subspecies(newAnimal.getSubspecies())
                .breed(newAnimal.getBreed())
                .sex(newAnimal.getSex())
                .color(newAnimal.getColor())
                .features(newAnimal.getFeatures())
                .bithdate(newAnimal.getBithdate())
                .rfid(newAnimal.getRfid())
                .microchip(newAnimal.getMicrochip())
                .tattooNum(newAnimal.getTattooNum())
                .build();
        //ANIMAL_STORE.put(id, animal);
	
		try {
			DB.insertAnimal(animal);
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "could not create animal.");
		}
		return id;//animal.getId();
	}

	@Override
	public List<Animal> getAnimals() {
        //return new ArrayList<>(ANIMAL_STORE.values());
		try {
			return DB.getAllAnimals();
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animals not found.");
		}
	}
	@Override
	public List<Animal> getAnimals(String id) throws ResourceNotFoundException{
		//Animal animal= Optional.ofNullable(ANIMAL_STORE.get(id)).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		List<Animal> animals = null;
		try {
			animals = DB.getAnimal(id);
			if (animals == null)
				throw new ResourceNotFoundException(404, "animal not found.");
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
		
		return  animals;
	}
	@Override
	public List<Animal> getAnimalsByUserId(String id) throws ResourceNotFoundException{
		List<Animal> animals = null;
		try {
			animals = DB.getAnimalsByUserId(id);
			if (animals == null)
				throw new ResourceNotFoundException(404, "animal not found.");
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
		
		return  animals;
	}
	public List<Animal> getAvailableAnimals(){
		List<Animal> animals = null;
		try {
			animals = DB.getAvailableAnimals();
			if (animals == null)
				throw new ResourceNotFoundException(404, "animal not found.");
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
		
		return  animals;
	}
	
	@Override
	public List<Animal> getAnimalSubspecies() {
		List<Animal> animals = null;
		try {
			animals = DB.getAnimalSubspecies();
			if (animals == null)
				throw new ResourceNotFoundException(404, "animal not found.");
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
		
		return  animals;
	}
	
	@Override
	public List<Animal> getAnimalBreed() {
		List<Animal> animals = null;
		try {
			animals = DB.getAnimalBreed();
			if (animals == null)
				throw new ResourceNotFoundException(404, "animal not found.");
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
		
		return  animals;
	}

	@Override
	public List<Animal> getAnimalsBySubspecies(String subspecies) {
		List<Animal> animals = null;
		try {
			animals = DB.getAnimalsBySubspecies(subspecies);
			if (animals == null)
				throw new ResourceNotFoundException(404, "animals not found.");
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
		
		return  animals;
	}
	@Override
	public List<Animal> getAnimalsSearch(String search) {
		List<Animal> animals = null;
		try {
			animals = DB.getAnimalsSearch(search);
			if (animals == null)
				throw new ResourceNotFoundException(404, "animal not found.");
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
		return  animals;
	}
	@Override
	public void deleteAnimal(String id) throws ResourceNotFoundException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Animal updateAnimal(Animal animal) throws ResourceNotFoundException {
		//Optional.of(ANIMAL_STORE.get(animal.getId())).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		//ANIMAL_STORE.replace(animal.getId(), animal);
		try {
			DB.updateAnimal(animal);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			throw new ResourceNotFoundException(404, "animal not found.");
		}
        return  animal;
	}

	@Override
	public String createAnimalDetails(AnimalDetails animalDetails) {	
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
		// ANIMAL_WEIGHT_STORE.put(animalWeight.getAnimalId(), animalWeight);
		try {
			DB.insertAnimalWeight(animalWeight);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	     return animalWeight.getAnimalId();
	}

	@Override
	public List<AnimalWeight> getAnimalWeight(String id) {
		//AnimalWeight animalWeight = Optional.of(ANIMAL_WEIGHT_STORE.get(id)).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		try {
			return DB.getAnimalWeight(id);
		} catch (SQLException e) {
			//e.printStackTrace();
			throw new ResourceNotFoundException(404, "animal not found.");
		}
	}

	@Override
	public void deleteAnimalWeight(String deleteAnimalId, String deleteTime) {
		try {
			DB.deleteAnimalWeight(deleteAnimalId,deleteTime);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Override
	public AnimalWeight updateAnimalWeight(AnimalWeight animalWeight) throws ResourceNotFoundException {
		Optional.of(ANIMAL_WEIGHT_STORE.get(animalWeight.getAnimalId())).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		ANIMAL_WEIGHT_STORE.replace(animalWeight.getAnimalId(), animalWeight);
        return  animalWeight;
	}
	
	@Override
	public String createAnimalStatus(AnimalStatus animalStatus) {
		
		try {
			DB.insertAnimalStatus(animalStatus);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
       return animalStatus.getAnimalId();
	}

	@Override
	public AnimalStatus getAnimalStatus(String animalId) {
		
		try {
			return DB.getAnimalStaus(animalId);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new ResourceNotFoundException(404, "Animal not found.");
		}
	}

	@Override
	public AnimalStatus updateAnimalStatus(AnimalStatus animalStatus) {
		
		try {
			DB.updateAnimalStatus(animalStatus);
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "Animal not found.");
		}
		
        return  animalStatus;
	}

	@Override
	public String createAnimalHealthRecord(AnimalHealthRecord animalHealthRecord) {
		//ANIMAL_HEALTH_RECORD_STORE.put(animalHealthRecord.getAnimalId(), animalHealthRecord);
		try {
			DB.insertAnimalHealthRecord(animalHealthRecord);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return animalHealthRecord.getAnimalId();
	}

	@Override
	public List<AnimalHealthRecord> getAnimalHealthRecord(String id) {
		//AnimalHealthRecord animalHealthRecord = Optional.ofNullable(ANIMAL_HEALTH_RECORD_STORE.get(id)).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		try {
			return DB.getAnimalHealthRecord(id);
		} catch (SQLException e) {
			//e.printStackTrace();
			throw new ResourceNotFoundException(404, "animal not found.");
		}
	}

	@Override
	public void deleteAnimalHealthRecord(String deleteAnimalId, String deleteTime) throws ResourceNotFoundException {
		try {
			DB.deleteAnimalHealthRecord(deleteAnimalId,deleteTime);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	

	@Override
	public AnimalHealthRecord updateAnimalHealthRecord(AnimalHealthRecord animalHealthRecord) {
		Optional.of(ANIMAL_HEALTH_RECORD_STORE.get(animalHealthRecord.getAnimalId())).orElseThrow(()->  new ResourceNotFoundException(404, "animal not found."));
		ANIMAL_HEALTH_RECORD_STORE.replace(animalHealthRecord.getAnimalId(), animalHealthRecord);
        return  animalHealthRecord;

	}

	@Override
	public String createAnimalReminder(NewAnimalReminder newAnimalReminder) {
        
        try {
			DB.insertAnimalReminder(newAnimalReminder);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	     return newAnimalReminder.getAnimalId();
	     
	}
	
	@Override
	public List<AnimalReminder> getAnimalReminders(String animalId) {
		try {
			return DB.getAnimalReminders(animalId);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new ResourceNotFoundException(404, "Reminders not found.");
		}
	}

	@Override
	public void deleteAnimalReminder(String reminderId) throws ResourceNotFoundException {
		try {
			DB.deleteAnimalReminder(reminderId);
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "Reminders not found.");
		}
		
	}

	@Override
	public AnimalReminder updateAnimalReminder(AnimalReminder animalReminder) throws ResourceNotFoundException {
		try {
			DB.updateAnimalReminder(animalReminder);
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "Reminder not found.");
		}
        return  animalReminder;
	}

	@Override
	public String createAnimalRequest(NewAnimalRequest newAnimalRequest) {
		String id = UUID.randomUUID().toString();
		AnimalRequest animalRequest = AnimalRequest.builder()
                .requestId(id)
                .animalId(newAnimalRequest.getAnimalId())
                .userId(newAnimalRequest.getUserId())
                .currentState(newAnimalRequest.getState())
                .build();

		try {
			DB.insertAnimalRequest(animalRequest);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new ResourceNotFoundException(404, "could not create animal request");
		}
		return id;//animal.getId();    
	}

	@Override
	public List<AnimalRequest> getAnimalRequests() {
		try {
			return DB.getAllAnimalRequests();
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
	}

	@Override
	public List<AnimalRequest> getAnimalRequestsUser(String userId) {
		try {
			return DB.getAnimalRequestsUser(userId);
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "animal not found.");
		}
	}

	@Override
	public void deleteAnimalRequest(String id) throws ResourceNotFoundException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AnimalRequest updateAnimalRequest(String userid, AnimalRequest animalRequestToUpdate) throws ResourceNotFoundException {
		
		try {
			AnimalRequest currentAnimalRequest = DB.getAnimalRequest(animalRequestToUpdate.getRequestId()).get(0);
			
			User u = DB.getUser(userid).get(0);
			
			String requestedState = animalRequestToUpdate.getCurrentState();
			String currentState = currentAnimalRequest.getCurrentState();
			String updatedState = "";
			AnimalRequest newAnimalRequest = null;
			
			switch(requestedState) {
			
				case "approve":
					switch(currentState) {
					
						case "requested":
							if(u.getAccountType().equalsIgnoreCase("admin")) {
								updatedState="Accept_by_Admin";
							}
							break;
						case "Accept_by_Admin":
							if(u.getAccountType().equalsIgnoreCase("Health Technician")) {
								updatedState = "Ready";
							}
							break;
					}
					break;
				case "reject":
					switch(currentState) {
						case "requested":
							if(u.getAccountType().equalsIgnoreCase("admin")) {
								updatedState = "Reject";
							}
							break;
						case "Accept_by_Admin":
							if(u.getAccountType().equalsIgnoreCase("Health Technician")) {
								updatedState = "Reject";
							}
							break;	
					}
					break;
				case "cancel":
					switch(currentState) {
						case "requested":
							if(u.getAccountType().equalsIgnoreCase("Instructor")) {
								updatedState = "Cancel";
							}
							break;
						case "Accept_By_Admin":
							if(u.getAccountType().equalsIgnoreCase("Instructor")) {
								updatedState = "Cancel";
							}
							break;	
				}
				break;
			}
			if(updatedState != "") {
			
				newAnimalRequest = AnimalRequest.builder()
						.requestId(animalRequestToUpdate.getRequestId())
						.animalId(animalRequestToUpdate.getAnimalId())
						.userId(animalRequestToUpdate.getUserId())
						.currentState(updatedState)
						.build();
				DB.updateAnimalRequest(newAnimalRequest);	
			}
			return DB.getAnimalRequest(animalRequestToUpdate.getRequestId()).get(0);
		} catch (SQLException e) {
			return null;

		}
	
	}

	
	

	

	
	

	
}





