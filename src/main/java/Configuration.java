

import data.AnimalDB;
import data.CommentDB;
import data.MailingDB;
import data.UserDB;
import data.AdminDB;
import data.ImageDB;
import domain.admin.AdminMailingService;
import domain.admin.CommentRepository;
import domain.admin.CommentService;
import domain.admin.EmailRepository;
import domain.animal.AnimalRepository;
import domain.animal.AnimalService;
import domain.user.AdminRepository;
import domain.user.AdminService;
import domain.user.UserRepository;
import domain.user.UserService;
import domain.user.ImageRepository;
import domain.user.ImageService;
import errors.GlobalExceptionHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

class Configuration {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final AnimalRepository ANIMAL_REPOSITORY = new AnimalDB();
    private static final AnimalService ANIMAL_SERVICE = new AnimalService(ANIMAL_REPOSITORY);
    private static final UserRepository USER_REPOSITORY = new UserDB();
    private static final UserService USER_SERVICE = new UserService(USER_REPOSITORY);
    private static final AdminRepository ADMIN_REPOSITORY = new AdminDB();
    private static final AdminService ADMIN_SERVICE = new AdminService(ADMIN_REPOSITORY);
    private static final EmailRepository EMAIL_REPOSITORY = new MailingDB();
    private static final AdminMailingService EMAIL_SERVICE = new AdminMailingService(EMAIL_REPOSITORY);
    private static final CommentRepository COMMENT_REPOSITORY = new CommentDB();
    private static final CommentService COMMENT_SERVICE = new CommentService(COMMENT_REPOSITORY);
    private static final ImageRepository IMAGE_REPOSITORY = new ImageDB();
    private static final ImageService IMAGE_SERVICE = new ImageService(IMAGE_REPOSITORY);
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
    
    static UserService getUserService() {
    	return USER_SERVICE;
    }
    
    static AdminService getAdminService() {
    	return ADMIN_SERVICE;
    }

    public static EmailRepository getEmailRepository() {
		return EMAIL_REPOSITORY;
	}

	public static AdminMailingService getAdminMailingService() {
		return EMAIL_SERVICE;
	}

	public static CommentRepository getCommentRepository() {
		return COMMENT_REPOSITORY;
	}

	public static CommentService getCommentService() {
		return COMMENT_SERVICE;
	}
	
	public static ImageRepository getImageRepository() {
		return IMAGE_REPOSITORY;
	}
	
	public static ImageService getImageService() {
		return IMAGE_SERVICE;
	}

	public static GlobalExceptionHandler getErrorHandler() {
        return GLOBAL_ERROR_HANDLER;
    }
}
