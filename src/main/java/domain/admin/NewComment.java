package domain.admin;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class NewComment {
	String commenter;
	String text;

}
