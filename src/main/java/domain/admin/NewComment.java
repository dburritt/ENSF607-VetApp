package domain.admin;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Builder
public class NewComment {
	String userId;
	String animalId;
	Timestamp commentDate;
	String commentText;

}
