package api.user;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import api.ApiUtils;
import api.Constants;
import api.Handler;
import api.ResponseEntity;
import api.StatusCode;
import api.animal.AnimalListResponse;
import domain.user.Image;
import domain.user.NewImage;
import domain.user.ImageService;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;

public class ImageHandler extends Handler {

    private final ImageService imageService;

    public ImageHandler(ImageService imageService, ObjectMapper objectMapper,
                                   GlobalExceptionHandler exceptionHandler) {
        super(objectMapper, exceptionHandler);
        this.imageService = imageService;
    }

    @Override
    protected void execute(HttpExchange exchange) throws IOException {
        byte[] response=null;
        if ("POST".equals(exchange.getRequestMethod())) {
            ResponseEntity e = doPost(exchange.getRequestBody());
            exchange.getResponseHeaders().putAll(e.getHeaders());
            exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
            response = super.writeResponse(e.getBody());

        } else if ("GET".equals(exchange.getRequestMethod())) {

            ResponseEntity e = doGet(exchange);
            exchange.getResponseHeaders().putAll(e.getHeaders());
            exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
            response = super.writeResponse(e.getBody());

        } else if ("PUT".equals(exchange.getRequestMethod())) {
            ResponseEntity e = doPut(exchange);
            exchange.getResponseHeaders().putAll(e.getHeaders());
            exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
            response = super.writeResponse(e.getBody());

        } else if ("DELETE".equals(exchange.getRequestMethod())) {
            ResponseEntity e = doDelete(exchange);
            exchange.getResponseHeaders().putAll(e.getHeaders());
            exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
            response = super.writeResponse(e.getBody());
        } 
		else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	        ResponseEntity e = new ResponseEntity<>("ok",
	                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	        exchange.getResponseHeaders().putAll(e.getHeaders());
	        exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
	        response = super.writeResponse(e.getBody());
		} else {
            throw ApplicationExceptions.methodNotAllowed(
                    "Method " + exchange.getRequestMethod() + " is not allowed for " + exchange.getRequestURI()).get();
        }


        OutputStream os = exchange.getResponseBody();
        os.write(response);
        os.close();

    }

    private ResponseEntity<ImageResponse> doPost(InputStream is) {
    	ImageRequest imageRequest = super.readRequest(is, ImageRequest.class);

    	NewImage newImage = NewImage.builder()
                .userId(imageRequest.getUserId())
                .animalId(imageRequest.getAnimalId())
                .creationDate(new java.sql.Timestamp((new java.util.Date()).getTime()))
                .imageLocation(imageRequest.getImageLocation())
                .build();

        String image = imageService.create(newImage);

        ImageResponse response = new ImageResponse(image);

        return new ResponseEntity<>(response,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
    }

    private ResponseEntity<ImageListResponse> doGet(HttpExchange exchange) {
    	Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String noId= "";
        String animalId = params.getOrDefault("AnimalId", List.of(noId)).stream().findFirst().orElse(noId); 
        String imageId = params.getOrDefault("ImageId", List.of(noId)).stream().findFirst().orElse(noId);
        
        ImageListResponse imageListResponse = null;
        
        if (imageId.equals("0")) {
        	imageListResponse = new ImageListResponse(imageService.getImages());
        }
         
        else if (!animalId.equals("")){
        	imageListResponse = new ImageListResponse(imageService.getImages(animalId));
        }
        
    	//ImageListResponse commentListResponse = new ImageListResponse(imageService.getImages());
        return new ResponseEntity<>(imageListResponse,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);

    }

    private ResponseEntity<Image> doPut(HttpExchange exchange) {

        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String imageId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        ImageRequest imageRequest = super.readRequest(exchange.getRequestBody(), ImageRequest.class);
        Image imageForUpdate = Image.builder()
    			.imageId(imageId)
                .userId(imageRequest.getUserId())
                .animalId(imageRequest.getAnimalId())
                .creationDate(new java.sql.Timestamp((new java.util.Date()).getTime()))
                .imageLocation(imageRequest.getImageLocation())
                .build();
        Image imageAfterUpdate= imageService.updateImage(imageForUpdate);
        return new ResponseEntity<>(imageAfterUpdate,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);

    }

    private ResponseEntity<String> doDelete(HttpExchange exchange) {
        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String deleteImage = params.getOrDefault("id", List.of("")).stream().findFirst().orElse(null);
        imageService.deleteImage(deleteImage);
       return new ResponseEntity<>("Image successfully deleted",
                getHeaders(Constants.CONTENT_TYPE, Constants.PLAIN_TXT), StatusCode.OK);
    }
}
