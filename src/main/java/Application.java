import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.BasicAuthenticator;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.util.List;
import api.*;
import api.admin.AdminEmailHandler;
import api.admin.CommentHandler;
import api.animal.AnimalsHandler;
import api.user.*;
import api.animal.AnimalDetailsHandler;
import api.animal.AnimalHealthRecordHandler;
import api.animal.AnimalReminderHandler;
import api.animal.AnimalRequestHandler;
import api.animal.AnimalSearchHandler;
import api.animal.AnimalStatusHandler;
import api.animal.AnimalWeightHandler;
import api.animal.AnimalsAvailableHandler;

import java.util.Map;
public class Application {

	
	public static void main(String[] args) throws IOException{
		int serverPort = 8001;
        HttpServer server = HttpServer.create(new InetSocketAddress(serverPort), 0);
        
        AnimalsHandler animalsHandler = new AnimalsHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        HttpContext context = server.createContext("/api/animals", animalsHandler::handle);
        
        AnimalSearchHandler animalsSearchHandler = new AnimalSearchHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/animals/search", animalsSearchHandler::handle);
        
        AnimalsAvailableHandler animalsAvailableHandler = new AnimalsAvailableHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
       server.createContext("/api/animals/available", animalsAvailableHandler::handle);
        
        AnimalRequestHandler animalRequestHandler = new AnimalRequestHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/animals/requests", animalRequestHandler::handle);
        
        AnimalDetailsHandler animalDetailsHandler = new AnimalDetailsHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/animals/details", animalDetailsHandler::handle);
        
        AnimalWeightHandler animalWeightHandler = new AnimalWeightHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/animals/weight", animalWeightHandler::handle);
        
        AnimalStatusHandler animalStatusHandler = new AnimalStatusHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/animals/status", animalStatusHandler::handle);
        
        AnimalHealthRecordHandler animalHealthRecordHandler = new AnimalHealthRecordHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/animals/healthrecord", animalHealthRecordHandler::handle);
        
        AnimalReminderHandler animalReminderHandler = new AnimalReminderHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/animals/reminders", animalReminderHandler::handle);
        
        UserRegistrationHandler userRegistrationHandler = new UserRegistrationHandler(Configuration.getUserService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/users/register", userRegistrationHandler::handle);
        
        AdminRegistrationHandler adminRegistrationHandler = new AdminRegistrationHandler(Configuration.getAdminService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/admin/register", adminRegistrationHandler::handle);   
        
        AdminEmailHandler adminEmailHandler = new AdminEmailHandler(Configuration.getAdminMailingService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/admin/email", adminEmailHandler::handle); 
        
        CommentHandler commentHandler = new CommentHandler(Configuration.getCommentService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/admin/comment", commentHandler::handle);
        
        ImageHandler imageHandler = new ImageHandler(Configuration.getImageService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/users/image", imageHandler::handle);
        
        UserLoginHandler userLoginHandler = new UserLoginHandler(Configuration.getUserService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/login", userLoginHandler::handle);
        
 
        HttpContext context1 =server.createContext("/api/hello", (exchange -> {

            if ("GET".equals(exchange.getRequestMethod())) {
                Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
                String noNameText = "Anonymous";
                String name = params.getOrDefault("name", List.of(noNameText)).stream().findFirst().orElse(noNameText);
                String respText = String.format("Hello %s!", name);
                exchange.sendResponseHeaders(200, respText.getBytes().length);
                OutputStream output = exchange.getResponseBody();
                output.write(respText.getBytes());
                output.flush();
            } else {
                exchange.sendResponseHeaders(405, -1);// 405 Method Not Allowed
            }
            exchange.close();
        }));
        context1.setAuthenticator(new BasicAuthenticator("myrealm") {
            @Override
            public boolean checkCredentials(String user, String pwd) {
            	System.out.println(user + pwd);
                return user.equals("admin") && pwd.equals("admin");
            }
        });
        server.setExecutor(null); // creates a default executor
        server.start();
        System.out.println("Http server started in port "+serverPort);
	}

}
