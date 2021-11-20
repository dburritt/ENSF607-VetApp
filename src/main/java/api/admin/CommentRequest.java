package api.admin;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class CommentRequest {
	
    String commenter;
    String text;

}
