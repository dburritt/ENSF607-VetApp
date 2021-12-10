package domain.admin;

import errors.ResourceNotFoundException;

import java.util.List;

public interface CommentRepository {
	String create(NewComment newComment);
    List<Comment> getComments();
	List<Comment> getStaffComments(String animalId);
	List<Comment> getStudentComments(String animalId);
    void deleteComment(String id) throws ResourceNotFoundException;
    Comment updateComment(Comment comment) throws ResourceNotFoundException;

}

