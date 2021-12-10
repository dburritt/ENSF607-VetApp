package domain.admin;

import java.util.List;
import java.util.Objects;

import errors.ResourceNotFoundException;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public String create(NewComment comment) {
        return commentRepository.create(comment);
    }

    public List<Comment> getComments(){return  commentRepository.getComments();}
    
    public List<Comment> getStudentComments(String animalId){return  commentRepository.getStudentComments(animalId);}

    public List<Comment> getStaffComments(String animalId){return  commentRepository.getStaffComments(animalId);}

    public void deleteComment(String id) throws ResourceNotFoundException{
        Objects.requireNonNull(id,"Comment id is required");
        commentRepository.deleteComment(id);
    }
    public Comment updateComment(Comment comment) throws ResourceNotFoundException{
    	Objects.requireNonNull(comment.getCommentId(),"Comment Id is required for update");
        Objects.requireNonNull(comment.getCommentText(),"Comment text is required for update");
        Objects.requireNonNull(comment.getUserId(),"Commenter's name is required for update");
        Objects.requireNonNull(comment.getAnimalId(),"Animal Id is required for update");
        Objects.requireNonNull(comment.getCommentDate(),"Commenter date is required for update");
        return  commentRepository.updateComment(comment);

    }
	
}
