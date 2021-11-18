package api.admin;

import lombok.Value;
import java.util.List;
import domain.user.User;

@Value
public class UserListResponse {
	List<User> users;
}
