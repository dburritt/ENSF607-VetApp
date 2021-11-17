

import data.AnimalDB;
import domain.animal.AnimalRepository;
import domain.animal.AnimalService;
import errors.GlobalExceptionHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

class Configuration {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final AnimalRepository ANIMAL_REPOSITORY = new AnimalDB();
    private static final AnimalService ANIMAL_SERVICE = new AnimalService(ANIMAL_REPOSITORY);
    private static final GlobalExceptionHandler GLOBAL_ERROR_HANDLER = new GlobalExceptionHandler(OBJECT_MAPPER);

    static ObjectMapper getObjectMapper() {
        return OBJECT_MAPPER;
    }

    static AnimalService getAnimalService() {
        return ANIMAL_SERVICE;
    }

    static AnimalRepository getAnimalRepository() {
        return ANIMAL_REPOSITORY;
    }

    public static GlobalExceptionHandler getErrorHandler() {
        return GLOBAL_ERROR_HANDLER;
    }
}
