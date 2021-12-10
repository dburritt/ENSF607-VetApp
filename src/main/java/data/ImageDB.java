package data;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import domain.user.*;
import errors.ResourceNotFoundException;
import errors.ImageNotFoundException;

public class ImageDB implements ImageRepository{

	private static final Map<String,Image> IMAGE_STORE = new ConcurrentHashMap();
    MySQLJDBC DB;
	
	public ImageDB() {
		DB = new MySQLJDBC();
   	    DB.initializeConnection();
	}
	
	@Override
	public String create(NewImage newImage, String imageLocation) {
		String id = UUID.randomUUID().toString();
        Image image = Image.builder()
                .imageId(id)
                .userId(newImage.getUserId())
                .animalId(newImage.getAnimalId())
                .creationDate(newImage.getCreationDate())
                .imageData(newImage.getImageData())
                .build();
        
        // COMMENTS_STORE.put(id, comment);
        try {
			DB.insertImage(image, imageLocation);
		} catch (SQLException e) {
			e.printStackTrace();
			//throw new ResourceNotFoundException(404, "comment not created");
		}
		return id;
	}

	@Override
	public List<Image> getImages() {
		try {
			return DB.getAllImages();
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "Comments not found.");
		}
	}

	@Override
	public void deleteImage(String id) throws ResourceNotFoundException {
		try {
			DB.deleteImage(id);
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "Comments not found.");
		}
	}

	@Override
	public Image updateImage(Image image) throws ResourceNotFoundException {
		Optional.of(IMAGE_STORE.get(image.getImageId())).orElseThrow(()->  new ImageNotFoundException(404, "Comment id not found."));
		IMAGE_STORE.replace(image.getImageId(), image);
        return image;
	}

}
