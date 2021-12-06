package domain.admin;

import java.sql.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Builder
public class NewComment {
	String userId;
	String animalId;
	Date commentDate;
	String commentText;

}
