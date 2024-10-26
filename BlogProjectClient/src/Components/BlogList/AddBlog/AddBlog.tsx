import { Button } from "antd";
import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";

type Props = {
}

const AddBlog = ( props: Props) => {
  return (
    <Link to={"/blogs/create-blog"}>
      <Button type="primary">
        Create Blog
      </Button>
    </Link>
  );
};
export default AddBlog;
