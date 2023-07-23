import { useState, type FC, useEffect } from "react";
import "./style.scss";
import {
  getComments,
  getLikesByUser,
  likePost,
  postComment,
} from "../../api/firestoreApi";
import { useAuthContext } from "../../contexts/authContext";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import moment from "moment";

export interface IComment {
  id: string;
  postId: string;
  comment: string;
  timeStamp: string;
  name: string;
}

interface IProps {
  postId: string;
}

const LikeButton: FC<IProps> = ({ postId }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>([]);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const { isLiked, likeCount } = await getLikesByUser(
        currentUser?.userID as string,
        postId
      );
      setLiked(isLiked);
      setLikesCount(likeCount);
    };

    fetchLikeStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = getComments(postId, setComments);
    return unsubscribe;
  }, [postId]);

  const handleLike = () => {
    if (!currentUser) return;
    likePost(currentUser.userID, postId, !liked);
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const addComment = () => {
    postComment({
      postId,
      comment,
      timeStamp: moment().format("LLL"),
      name: currentUser?.name as string,
    });
    setComment("");
  };

  return (
    <div className="like-container">
      <p>{likesCount} People Like this Post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}

          <p className={liked ? "blue" : "black"}>Like</p>
        </div>
        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "#0a66c2" : "#212121"}
          />
          <p className={showCommentBox ? "blue" : "black"}>Comments</p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>
          {comments.map((comment) => (
            <div className="all-comments" key={comment.id}>
              <p className="name">{comment.name}</p>
              <p className="comment">{comment.comment}</p>
              <p className="timestamp">{comment.timeStamp}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default LikeButton;
