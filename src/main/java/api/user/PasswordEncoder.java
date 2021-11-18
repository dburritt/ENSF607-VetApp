package api.user;

import java.util.Base64;

public class PasswordEncoder {

	public static String encode(String password) {
		return Base64.getEncoder().encodeToString(password.getBytes());
	}
	
	public static String decode(String encodedPassword) {
		byte[] decodedBytes = Base64.getDecoder().decode(encodedPassword);
		String decodedString = new String(decodedBytes);
		return decodedString;
	}
	
}
