import { useState } from 'react';
import { FaUser , FaReply, FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';

const MyBlogs = () => {
  const [activePost, setActivePost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]); // Initialize blogPosts state

  const handleLike = (postId) => {
    setBlogPosts(blogPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1 // Toggle like count
        };
      }
      return post;
    }));
  };

  const handleCommentSubmit = (postId) => {
    if (commentText.length < 15) return;

    const newComment = {
      id: Date.now(),
      author: "You",
      text: commentText,
      time: "Just now",
      replies: []
    };

    setBlogPosts(blogPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [newComment, ...post.comments]
        };
      }
      return post;
    }));
    setCommentText('');
  };

  const handleReplySubmit = (postId, commentId, replyText) => {
    if (replyText.length < 15) return;

    const newReply = {
      id: Date.now(),
      author: "You",
      text: replyText,
      time: "Just now"
    };

    setBlogPosts(blogPosts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, newReply]
            };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    }));
    setShowReplyInput(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Blog Posts List */}
        {!activePost && (
          <div className="space-y-8">
            {blogPosts.map(post => (
              <article 
                key={post.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By {post.author} · {post.date}</span>
                    <div className="flex items-center space-x-4">
                      <button 
                        className="flex items-center space-x-1 hover:text-indigo-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.id);
                        }}
                      >
                        {post.liked ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart />
                        )}
                        <span>{post.likes}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <FaComment />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Single Post View */}
        {activePost && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button 
              onClick={() => setActivePost(null)}
              className="ml-6 mt-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              ← Back to all posts
            </button>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{activePost.title}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <span>By {activePost.author}</span>
                <span>·</span>
                <span>{activePost.date}</span>
              </div>
              
              <div className="prose max-w-none text-gray-700 mb-8">
                <p>{activePost.content}</p>
              </div>

              <div className="flex items-center space-x-4 border-t border-b border-gray-100 py-4 mb-6">
                <button 
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                  onClick={() => handleLike(activePost.id)}
                >
                  {activePost.liked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                  <span>{activePost.likes} Likes</span>
                </button>
                <div className="flex items-center space-x-1 text-gray-600">
                  <FaComment />
                  <span>{activePost.comments.length} Comments</span>
                </div>
              </div>

              {/* Comment Submission */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Leave a Comment</h2>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaUser  />
                  </div>
                  <div className="flex-1">
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                      placeholder="Share your thoughts... (minimum 15 characters)"
                      rows="3"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-sm ${commentText.length >= 15 ? 'text-green-600' : 'text-gray-500'}`}>
                        {commentText.length}/15 characters
                      </span>
                      <button
                        className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                          commentText.length < 15 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={commentText.length < 15}
                        onClick={() => handleCommentSubmit(activePost.id)}
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {activePost.comments.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Comments ({activePost.comments.length})
                  </h2>
                  <div className="space-y-6">
                    {activePost.comments.map(comment => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        onReply={() => setShowReplyInput(showReplyInput === comment.id ? null : comment.id)}
                        showReplyInput={showReplyInput === comment.id}
                        onReplySubmit={(replyText) => handleReplySubmit(activePost.id, comment.id, replyText)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const Comment = ({ comment, onReply, showReplyInput, onReplySubmit, isReply = false }) => {
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReplySubmit(replyText);
    setReplyText('');
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${isReply ? 'ml-8 mt-2' : ''}`}>
      <div className="flex gap-3">
        <div className={`${isReply ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600`}>
          {comment.author.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-medium text-gray-800">{comment.author}</span>
              <span className="text-xs text-gray-500 ml-2">{comment.time}</span>
            </div>
            {!isReply && (
              <button
                onClick={onReply}
                className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
              >
                <FaReply size={12} /> Reply
              </button>
            )}
          </div>
          <p className={`mt-1 ${isReply ? 'text-sm' : ''} text-gray-700`}>{comment.text}</p>
        </div>
      </div>

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-3 space-y-2">
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              isReply
            />
          ))}
        </div>
      )}

      {/* Reply Input */}
      {showReplyInput && (
        <form onSubmit={handleReplySubmit} className="mt-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <FaUser  size={14} />
            </div>
            <div className="flex-1">
              <textarea
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Write your reply... (minimum 15 characters)"
                rows="2"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs ${replyText.length >= 15 ? 'text-green-600' : 'text-gray-500'}`}>
                  {replyText.length}/15 characters
                </span>
                <button
                  type="submit"
                  className={`px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                    replyText.length < 15 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={replyText.length < 15}
                >
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default MyBlogs;
