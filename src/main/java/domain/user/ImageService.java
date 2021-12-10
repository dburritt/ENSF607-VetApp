package domain.user;

import lombok.AllArgsConstructor;

import errors.ImageNotFoundException;

import java.util.List;
import java.util.Objects;


@AllArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public String create(NewImage image) {
        return imageRepository.create(image);
    }

    public List<Image> getImages(){return imageRepository.getImages();}
    
    public List<Image> getImages(String id) throws ImageNotFoundException {return imageRepository.getImages(id);}

    public void deleteImage(String id) throws ImageNotFoundException{
        Objects.requireNonNull(id,"Image id is required");
        imageRepository.deleteImage(id);
    }
    public Image updateImage(Image image) throws ImageNotFoundException{
        Objects.requireNonNull(image.getImageId(),"Image id is required for update");
        Objects.requireNonNull(image.getImageLocation(),"Image location is required for update");
        return  imageRepository.updateImage(image);

    }
}