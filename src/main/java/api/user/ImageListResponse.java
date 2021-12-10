package api.user;

import domain.user.Image;
import lombok.Value;

import java.util.List;

@Value
public class ImageListResponse {
	List<Image> images;
}
