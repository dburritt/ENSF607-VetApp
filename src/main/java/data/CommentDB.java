package data;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import domain.admin.*;
import errors.ResourceNotFoundException;
import errors.UserNotFoundException;

public class CommentDB implements CommentRepository{

	private static final Map<String,Comment> COMMENTS_STORE = new ConcurrentHashMap();
    MySQLJDBC DB;
	
	public CommentDB() {
		DB = new MySQLJDBC();
   	    DB.initializeConnection();
	}
	
	@Override
	public String create(NewComment newComment) {
		String id = UUID.randomUUID().toString();
		
        Comment comment = Comment.builder()
                .commentId(id)
                .userId(newComment.getUserId())
                .animalId(newComment.getAnimalId())
                .commentDate(newComment.getCommentDate())
                .commentText(newComment.getCommentText())
                .build();
        
        // COMMENTS_STORE.put(id, comment);
        try {
			DB.insertComment(comment);
		} catch (SQLException e) {
			e.printStackTrace();
			//throw new ResourceNotFoundException(404, "comment not created");
		}
		return id;
	}

	@Override
	public List<Comment> getComments() {
		try {
			return DB.getAllComments();
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "Comments not found.");
		}
	}
	
	@Override
	public List<Comment> getStudentComments(String animalId) {
		try {
			return DB.getStudentComments(animalId);
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "Comments not found.");
		}
	}
	
	@Override
	public List<Comment> getStaffComments(String animalId) {
		try {
			return DB.getStaffComments(animalId);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new ResourceNotFoundException(404, "Comments not found.");
		}
	}

	@Override
	public void deleteComment(String id) throws ResourceNotFoundException {
		try {
			DB.deleteComment(id);
		} catch (SQLException e) {
			throw new ResourceNotFoundException(404, "Comments not found.");
		}
	}

	@Override
	public Comment updateComment(Comment comment) throws ResourceNotFoundException {
		Optional.of(COMMENTS_STORE.get(comment.getCommentId())).orElseThrow(()->  new UserNotFoundException(404, "Comment id not found."));
		COMMENTS_STORE.replace(comment.getCommentId(), comment);
        return  comment;
	}

}
