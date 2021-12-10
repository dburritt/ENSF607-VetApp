package errors;

public class ImageNotFoundException extends ApplicationException {

    public ImageNotFoundException(int code, String message) {
        super(code, message);
    }
}
