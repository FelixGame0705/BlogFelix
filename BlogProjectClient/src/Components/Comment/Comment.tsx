import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Input, List, Layout } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { CommentData, CommentShowData, IOptionItems } from "../../data";
import SelectComment from "./Select/SelectComment";
import ShowMoreButton from "./Showmore/ShowMoreButton";
import "../Comment/Comment.css";
import { optionItems } from "../../Constants/Constants";
import { deleteComment } from "../../api";
import { useAuth } from "../../Context/useAuth";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../Features/comment/commentSlice";

const { TextArea } = Input;

type CommentProps = {
  pageID: number;
  // getOptions: (options: any) => string;
  commentsData: CommentShowData[];
  onCommentCreate: (comment: {
    postID: number;
    appUserID: string|null;
    content: string;
    timeStamp: string;
    fullName: string|undefined;
    avatarURL: string|undefined;
  }) => any;
};

const Comment = ({
  pageID,
  commentsData,
  onCommentCreate,
  // getOptions,
}: CommentProps) => {
  const [comments, setComments] = useState<CommentShowData[]>([]);
  const [replyVisible, setReplyVisible] = useState(true);
  const [newComment, setNewComment] = useState<string>("");
  const { decodedToken, isLoggedIn, userGoogle, user } = useAuth();
  const commentsRedux = useSelector((state:RootState) => state.comments.comments)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  useEffect(() => {
    setComments(commentsRedux);
  }, [commentsRedux]);

  const handleReplyToggle = () => {
    setReplyVisible(!replyVisible);
  };

  const handleNewCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(e.target.value);
  };

  const removeComment = (commentRemove: number) => {
    setComments(comments.filter((item) => item.commentID !== commentRemove));
  };

  const handleDeleteComment = async (id: number) => {
    const deleteCommentData = await deleteComment(id.toString());
    removeComment(id);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const newCommentData = await onCommentCreate({
        postID: pageID, // Thay bằng ID thực tế
        appUserID: null, // Thay thế với dữ liệu thực
        content: newComment,
        timeStamp: new Date().toISOString(),
        fullName: userGoogle?.fullName || decodedToken?.given_name,
        avatarURL: userGoogle?.avatarUrl
      });
      setComments([...comments, newCommentData]);
      dispatch(addComment(newCommentData))
      setNewComment(""); // Xóa bình luận mới sau khi đã thêm
    }
  };

  const navigateLogin = async () => {
    navigate("/login");
  };

  const handleChangeItemComment = (option: any) => {
    // getOptions(option);
    return option;
  };

  return (
    <Layout>
      <Layout.Content className="commentLayout">
        <div className="right-drop-down">
          <SelectComment
            onChangeItem={handleChangeItemComment}
            optionsItem={optionItems}
          />
        </div>
        {isLoggedIn() && replyVisible && (
          <div style={{ marginTop: 16, marginBottom: "3%" }}>
            {isLoggedIn() && (
              <TextArea
                rows={4}
                value={newComment}
                onChange={handleNewCommentChange}
                placeholder="Write your reply here..."
              />
            )}
            <Button
              type="primary"
              style={{ marginTop: "1%" }}
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
          </div>
        )}
        {isLoggedIn() === false && (
          <Button
            type="primary"
            style={{ margin: "3% 0" }}
            onClick={navigateLogin}
          >
            Login to comment
          </Button>
        )}
        <List
          dataSource={commentsRedux}
          renderItem={(item) => (
            <Card
              style={{ marginBottom: 16 }}
              actions={[
                <span onClick={handleReplyToggle}>
                  <MessageOutlined /> Reply
                </span>,
              ]}
            >
              {isLoggedIn() && decodedToken?.role === "AppUser" &&(
                <div className="right-drop-down">
                  <Button
                    onClick={() => handleDeleteComment(item.commentID)}
                    type="primary"
                    style={{
                      background: "red",
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
              <Card.Meta
                avatar={<Avatar src={item.avatarURL} />}
                title={item.fullName}
                description={item?.content}
              />
            </Card>
          )}
        />
      </Layout.Content>
    </Layout>
  );
};

export default Comment;
