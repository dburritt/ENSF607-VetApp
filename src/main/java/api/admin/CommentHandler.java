package api.admin;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Date;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import api.ApiUtils;
import api.Constants;
import api.Handler;
import api.ResponseEntity;
import api.StatusCode;
import domain.admin.*;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;

public class CommentHandler extends Handler {

	private final CommentService commentService;

	public CommentHandler(CommentService commentService, ObjectMapper objectMapper,
			GlobalExceptionHandler exceptionHandler) {
		super(objectMapper, exceptionHandler);
		this.commentService = commentService;
	}

	@Override
	protected void execute(HttpExchange exchange) throws IOException {
		byte[] response = null;
		if ("POST".equals(exchange.getRequestMethod())) {
			ResponseEntity e = doPost(exchange.getRequestBody());
			exchange.getResponseHeaders().putAll(e.getHeaders());
			exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
			response = super.writeResponse(e.getBody());

		} else if ("GET".equals(exchange.getRequestMethod())) {

			ResponseEntity e = doGet(exchange);
			exchange.getResponseHeaders().putAll(e.getHeaders());
			exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
			response = super.writeResponse(e.getBody());

		} else if ("PUT".equals(exchange.getRequestMethod())) {
			ResponseEntity e = doPut(exchange);
			exchange.getResponseHeaders().putAll(e.getHeaders());
			exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
			response = super.writeResponse(e.getBody());

		} else if ("DELETE".equals(exchange.getRequestMethod())) {
			ResponseEntity e = doDelete(exchange);
			exchange.getResponseHeaders().putAll(e.getHeaders());
			exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
			response = super.writeResponse(e.getBody());
		} else if ("OPTIONS".equals(exchange.getRequestMethod())) {
			ResponseEntity e = new ResponseEntity<>("ok",
					getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
			exchange.getResponseHeaders().putAll(e.getHeaders());
			exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
			response = super.writeResponse(e.getBody());
		} else {
			throw ApplicationExceptions
					.methodNotAllowed(
							"Method " + exchange.getRequestMethod() + " is not allowed for " + exchange.getRequestURI())
					.get();
		}

		OutputStream os = exchange.getResponseBody();
		os.write(response);
		os.close();

	}

	private ResponseEntity<CommentResponse> doPost(InputStream is) {
		CommentRequest commentRequest = super.readRequest(is, CommentRequest.class);

		NewComment newComment = NewComment.builder().userId(commentRequest.getUserId())
				.animalId(commentRequest.getAnimalId()).commentDate(new java.sql.Timestamp((new java.util.Date()).getTime()))
				.commentText(commentRequest.getCommentText()).build();

		String comment = commentService.create(newComment);

		CommentResponse response = new CommentResponse(comment);

		return new ResponseEntity<>(response, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON),
				StatusCode.OK);
	}

	private ResponseEntity<CommentListResponse> doGet(HttpExchange exchange) {
		
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		String commentType = params.getOrDefault("commentType", List.of("")).stream().findFirst().orElse("");
		String animalId = params.getOrDefault("animalId", List.of("")).stream().findFirst().orElse("");
		
		CommentListResponse commentListResponse = null;
		
		if (commentType.equals("staff")) {
			commentListResponse = new CommentListResponse(commentService.getStaffComments(animalId));
		}else if(commentType.equals("student")) {
			commentListResponse = new CommentListResponse(commentService.getStudentComments(animalId));
		}else {
			commentListResponse = new CommentListResponse(commentService.getComments());
		}
		
		return new ResponseEntity<>(commentListResponse, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON),
				StatusCode.OK);

	}

	private ResponseEntity<Comment> doPut(HttpExchange exchange) {

		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		String commentId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
		CommentRequest commentRequest = super.readRequest(exchange.getRequestBody(), CommentRequest.class);
		Comment commentForUpdate = Comment.builder().commentId(commentId).userId(commentRequest.getUserId())
				.animalId(commentRequest.getAnimalId()).commentDate(commentRequest.getCommentDate())
				.commentText(commentRequest.getCommentText()).build();
		Comment commentAfterUpdate = commentService.updateComment(commentForUpdate);
		return new ResponseEntity<>(commentAfterUpdate, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON),
				StatusCode.OK);

	}

	private ResponseEntity<String> doDelete(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		String deleteComment = params.getOrDefault("id", List.of("")).stream().findFirst().orElse(null);
		commentService.deleteComment(deleteComment);
		return new ResponseEntity<>("Comment successfully deleted",
				getHeaders(Constants.CONTENT_TYPE, Constants.PLAIN_TXT), StatusCode.OK);
	}

}
