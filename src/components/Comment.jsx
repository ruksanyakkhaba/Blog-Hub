import React, { useState } from 'react';
import { FaUser, FaReply } from 'react-icons/fa';

const Comment = ({ comment, currentUser, onAddReply, depth = 0 }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    onAddReply(comment.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className={`comment ${depth > 0 ? 'nested' : ''}`}>
      <div className="comment-header">
        <div className="comment-avatar">
          <FaUser className="avatar-icon" />
        </div>
        <div className="comment-meta">
          <span className="comment-author">{comment.author || 'Anonymous'}</span>
          <span className="comment-time">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="comment-content">
        <p className="comment-text">{comment.text}</p>
        <button 
          className="reply-button"
          onClick={() => setIsReplying(!isReplying)}
        >
          <FaReply className="reply-icon" />
          Reply
        </button>
      </div>

      {isReplying && (
        <form className="reply-form" onSubmit={handleReplySubmit}>
          <div className="form-group">
            <textarea
              className="reply-textarea"
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setIsReplying(false)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Post Reply
            </button>
          </div>
        </form>
      )}

      {comment.replies?.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onAddReply={onAddReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .comment {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .comment.nested {
          margin-left: 2rem;
          margin-top: 1rem;
          border-left: 2px solid #e9ecef;
          padding-left: 1rem;
        }

        .comment-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .comment-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
        }

        .avatar-icon {
          color: #6c757d;
          font-size: 14px;
        }

        .comment-meta {
          display: flex;
          flex-direction: column;
        }

        .comment-author {
          font-weight: 600;
          color: #212529;
        }

        .comment-time {
          font-size: 0.75rem;
          color: #6c757d;
        }

        .comment-text {
          margin: 0.5rem 0;
          color: #495057;
          line-height: 1.5;
        }

        .reply-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          color: #0d6efd;
          font-size: 0.875rem;
          cursor: pointer;
          padding: 0.25rem 0;
        }

        .reply-button:hover {
          color: #0a58ca;
        }

        .reply-icon {
          margin-right: 0.25rem;
          font-size: 12px;
        }

        .reply-form {
          margin-top: 1rem;
        }

        .reply-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 0.375rem;
          min-height: 80px;
          resize: vertical;
          font-family: inherit;
        }

        .reply-textarea:focus {
          outline: none;
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .cancel-button {
          padding: 0.375rem 0.75rem;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          color: #212529;
          cursor: pointer;
        }

        .cancel-button:hover {
          background: #e9ecef;
        }

        .submit-button {
          padding: 0.375rem 0.75rem;
          background: #0d6efd;
          border: 1px solid #0d6efd;
          border-radius: 0.375rem;
          color: white;
          cursor: pointer;
        }

        .submit-button:hover {
          background: #0b5ed7;
          border-color: #0a58ca;
        }

        .replies {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Comment;
