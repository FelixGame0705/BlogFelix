import React, { useState, useEffect, useCallback } from "react";
import AppHeader from "../../Components/AppHeader/AppHeader";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCommentData,
  createPostAuthorData,
  deleteBlogContentData,
  getBlogContentData,
  getCommentData,
  updateBlogContentData,
} from "../../api";
import BlogContent from "../../Components/BlogContent/BlogContent";
import RichTextEditor from "../../Components/RichTextEditor/RichTextEditor";
import Footer from "../../Components/Footer/Footer";
import { notification } from "antd";
import Comment from "../../Components/Comment/Comment";
import { ok } from "assert";
import {
  BlogContentData,
  CommentData,
  CommentFilter,
  CommentShowData,
  IOptionItems,
} from "../../data";
import ShowMoreButton from "../../Components/Comment/Showmore/ShowMoreButton";
import { toast } from "react-toastify";
import { optionItems } from "../../Constants/Constants";
import { useAuth } from "../../Context/useAuth";
import { UserInfo } from "../../Models/User";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

const BlogContentPage = () => {
  const { id } = useParams();
  const [optionFilter, setOptionFilter] = useState("");
  const [comments, setComments] = useState<CommentShowData[]>([]);
  const [blog, setBlog] = useState<BlogContentData>();
  const [authors, setAuthors] = useState<UserInfo[] | undefined>();
  // const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // const [isDesc, setDesc] = useState(true);
  const commentsRedux = useSelector((state:RootState) => state.comments.comments)
  const navigate = useNavigate();
  const { user, decodedToken } = useAuth();

  useEffect(()=>{
    setComments(commentsRedux)
  },[commentsRedux])
  useEffect(() => {
    const fetchBlogContent = async () => {
      const isPageReloaded = sessionStorage.getItem("page-reloaded") === "true";

      if (isPageReloaded) {
        // Nếu trang đã được tải lại
        console.log("Page was reloaded.");
      } else {
        // Đánh dấu rằng trang đã được tải
        sessionStorage.setItem("page-reloaded", "true");
      }
      const savedContent = localStorage.getItem(`blog-content-${id}`);
      if (savedContent) {
        setBlog(JSON.parse(savedContent));
      } else {
        const result = await getBlogContentData(id!);
        setBlog(result?.data);
        console.log("Authors: " + authors);
        localStorage.setItem(
          `blog-content-${id}`,
          JSON.stringify(result?.data)
        );
      }

      // Xóa đánh dấu tải lại trang khi người dùng rời khỏi trang hoặc đóng tab
      return () => {
        sessionStorage.removeItem("page-reloaded");
      };
    };
    const fetchBlogContentForGuest = async () => {
      const isPageReloaded = sessionStorage.getItem("page-reloaded") === "true";

      if (isPageReloaded) {
        // Nếu trang đã được tải lại
        console.log("Page was reloaded.");
      } else {
        // Đánh dấu rằng trang đã được tải
        sessionStorage.setItem("page-reloaded", "true");
      }
      const result = await getBlogContentData(id!);
      setBlog(result?.data);
      setAuthors(result?.data?.postAuthors);
      localStorage.setItem(`blog-content-${id}`, JSON.stringify(result?.data));

      // Xóa đánh dấu tải lại trang khi người dùng rời khỏi trang hoặc đóng tab
      return () => {
        sessionStorage.removeItem("page-reloaded");
      };
    };
    if (decodedToken?.role == "AppUser") fetchBlogContent();
    else {
      fetchBlogContentForGuest();
    }
  }, [id]);

  const handleBlogChange = useCallback(
    (updatedBlog: any) => {
      setBlog(updatedBlog);
      localStorage.setItem(`blog-content-${id}`, JSON.stringify(updatedBlog));
    },
    [id]
  );

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      setBlog((prevBlog: any) => ({ ...prevBlog, title: newTitle }));
      localStorage.setItem(
        `blog-content-${id}`,
        JSON.stringify({ ...blog, title: newTitle })
      );
    },
    [id, blog]
  );

  const handleCategoryChange = useCallback(
    (updatedCategory: any) => {
      setBlog((prevBlog: any) => ({ ...prevBlog, category: updatedCategory }));
      localStorage.setItem(
        `blog-category-${id}`,
        JSON.stringify(updatedCategory)
      );
    },
    [id, blog]
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      if (blog) {
        await updateBlogContentData(
          blog.title,
          blog.content,
          blog.category,
          Number.parseInt(id!)
        );
        localStorage.setItem(`blog-content-${id}`, JSON.stringify(blog));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      // Xóa localStorage
      localStorage.removeItem(`blog-content-${id}`);

      // Lấy lại dữ liệu từ API
      const result = await getBlogContentData(id!);
      setBlog(result?.data);
      setAuthors(result?.data?.postAuthors);
      localStorage.setItem(`blog-content-${id}`, JSON.stringify(result?.data));

      // Hiển thị thông báo thông tin
      notification.info({
        message: "Reset",
        description:
          "Blog content has been reset and reloaded from the server.",
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "An error occurred while resetting the blog content.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteBlogContentData(id!); // Gọi API để xóa bài viết
      if (result?.status) {
        notification.success({
          message: "Success",
          description: "Blog deleted successfully.",
        });
        navigate("/blogs"); // Sau khi xóa, điều hướng về trang danh sách blog
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "An error occurred while deleting the blog.",
      });
    }
  };

  const handleCommentCreate = useCallback(
    async (comment: CommentData) => {
      try {
        // Gọi API để tạo comment
        const response = await createCommentData(comment);
        // await handleCommentShowOnPost();
        if (!response?.status) {
          throw new Error("Failed to create blog.");
        }
        return response.data;
        // Điều hướng người dùng đến trang blog sau khi tạo xong
      } catch (error) {
        notification.error({
          message: "Error",
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred.",
        });
        return false;
      }
    },
    [navigate]
  );
  // const handleShowComment = async () => {
  //   try {
  //     setCommentsSize(commentsSize! + 10);
  //     // Gọi API để tạo comment
  //     const response = await getCommentData(params);
  //     if (!response?.status) {
  //       throw new Error("Failed to show comment.");
  //     }
  //     console.log("Data123 "+response.data.map((item)=>item.fullName));
  //     setComments(response.data);
  //     // Điều hướng người dùng đến trang blog sau khi tạo xong
  //   } catch (error) {
  //     notification.error({
  //       message: "Error",
  //       description:
  //         error instanceof Error ? error.message : "An unknown error occurred.",
  //     });
  //   }
  // };
  // const handleCommentShowOnPost = async () => {
  //   try {
  //     // Gọi API để tạo comment
  //     const response = await getCommentData(params);
  //     // console.log("comments: "+params.)
  //     if (!response?.status) {
  //       throw new Error("Failed to create blog.");
  //     }
  //     setComments(commentsRedux);

  //     // Điều hướng người dùng đến trang blog sau khi tạo xong
  //   } catch (error) {
  //     notification.error({
  //       message: "Error",
  //       description:
  //         error instanceof Error ? error.message : "An unknown error occurred.",
  //     });
  //   }
  // };
  // useEffect(() => {
  //   handleCommentShowOnPost();
  // }, [isDesc, commentsSize]);

  // const handleOptionsUse = (options: any) => {
  //   setOptionFilter(options);
  //   if (optionFilter === optionItems[0].label) {
  //     setDesc(false);
  //     params.pageSize = undefined;
  //   }
  //   if (optionFilter === optionItems[1].label) setDesc(false);
  //   if (optionFilter === optionItems[2].label) setDesc(true);
  //   handleCommentShowOnPost();
  //   return optionFilter;
  // };

  return (
    <div className="app-container">
      <main className="main-content">
        {blog && (
          <>
            <BlogContent title={blog.title} content={blog.content} />
            <RichTextEditor
              title={blog.title}
              userRole={decodedToken?.role} // Change this to the appropriate user role as needed
              contentParams={blog}
              onBlogChange={handleBlogChange}
              onTitleChange={handleTitleChange}
              onSave={handleSave}
              onReset={handleReset} // Thêm callback reset
              onDelete={handleDelete}
              onCategoryChange={handleCategoryChange}
              authors={authors}
            />
          </>
        )}
        {comments && (
          <Comment
            pageID={Number(id)}
            commentsData={comments}
            onCommentCreate={(commentData) =>
              handleCommentCreate({
                postID: Number(id), // Đảm bảo `id` là số
                appUserID: decodedToken?.nameid||null, // Thay bằng ID thực tế của người dùng
                content: commentData.content, // Nội dung bình luận
                timeStamp: new Date().toISOString(), // Thời gian hiện tại
                fullName: commentData.fullName,
                avatarURL: commentData.avatarURL
              })
            }
            // getOptions={handleOptionsUse}
          />
        )}
        <ShowMoreButton pageNumber={0} />
      </main>
    </div>
  );
};

export default BlogContentPage;
