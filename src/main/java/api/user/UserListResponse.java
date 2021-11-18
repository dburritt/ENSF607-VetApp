package api.user;

import domain.user.User;
import lombok.Value;

import java.util.List;

@Value
public class UserListResponse {
    List<User> users;
}
