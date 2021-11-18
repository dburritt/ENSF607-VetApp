package api.user;

import domain.user.Admin;
import lombok.Value;

import java.util.List;

@Value
public class AdminListResponse {
	List<Admin> admin;
}
