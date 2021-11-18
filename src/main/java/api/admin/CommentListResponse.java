package api.admin;

import domain.admin.Comment;
import lombok.Value;

import java.util.List;

@Value
public class CommentListResponse {
	List<Comment> comments;
}
