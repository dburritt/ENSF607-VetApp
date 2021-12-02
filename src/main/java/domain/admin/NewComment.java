package domain.admin;

import java.sql.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class NewComment {
	String userId;
	String animalId;
	String commentDate;
	String commentText;

}
