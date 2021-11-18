package domain.admin;

import errors.ResourceNotFoundException;

import java.util.List;

public interface CommentRepository {
	String create(Comment comment);
    List<Comment> getComments();
    void deleteComment(String id) throws ResourceNotFoundException;
    Comment updateComment(Comment comment) throws ResourceNotFoundException;
}

