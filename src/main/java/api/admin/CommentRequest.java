package api.admin;

import lombok.Value;

@Value
public class CommentRequest {
	
	String id;
    String commenter;
    String text;

}
