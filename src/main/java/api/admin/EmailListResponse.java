package api.admin;

import domain.admin.Email;
import lombok.Value;

import java.util.List;

@Value
public class EmailListResponse {
	List<Email> emails;
}
