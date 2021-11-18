package domain.admin;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Comment {
	String id;
	String commenter;
	String text;

}