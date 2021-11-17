package errors;
public class UserNotFoundException extends ApplicationException {

    public UserNotFoundException(int code, String message) {
        super(code, message);
    }
}
