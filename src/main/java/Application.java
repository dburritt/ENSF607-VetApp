import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
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
import api.animal.AnimalStatusHandler;
import api.animal.AnimalWeightHandler;

import java.util.Map;
public class Application {

	
	public static void main(String[] args) throws IOException{
		int serverPort = 8001;
        HttpServer server = HttpServer.create(new InetSocketAddress(serverPort), 0);
        
        AnimalsHandler animalsHandler = new AnimalsHandler(Configuration.getAnimalService(), Configuration.getObjectMapper(),
                Configuration.getErrorHandler());
        server.createContext("/api/animals", animalsHandler::handle);
        
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
        
        HttpContext context =server.createContext("/api/hello", (exchange -> {

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
        server.setExecutor(null); // creates a default executor
        server.start();
        System.out.println("Http server started in port "+serverPort);
	}

}
