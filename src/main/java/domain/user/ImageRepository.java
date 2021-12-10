package domain.user;

import errors.ImageNotFoundException;

import java.util.List;

public interface ImageRepository {
	String create(NewImage image);
    List<Image> getImages();
    List<Image> getImages(String id) throws ImageNotFoundException;
    void deleteImage(String id) throws ImageNotFoundException;
    Image updateImage(Image user) throws ImageNotFoundException;
}
