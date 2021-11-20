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

    public void deleteComment(String id) throws ResourceNotFoundException{
        Objects.requireNonNull(id,"Comment id is required");
        commentRepository.deleteComment(id);
    }
    public Comment updateComment(Comment comment) throws ResourceNotFoundException{
    	Objects.requireNonNull(comment.getId(),"Comment Id is required for update");
        Objects.requireNonNull(comment.getText(),"Comment text is required for update");
        Objects.requireNonNull(comment.getCommenter(),"Commenter's name is required for update");
        return  commentRepository.updateComment(comment);

    }
	
}
