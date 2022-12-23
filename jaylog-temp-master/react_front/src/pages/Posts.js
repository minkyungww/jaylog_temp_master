import MyCard from "components/commons/MyCard";
import CommonLayout from "components/layouts/CommonLayout";
import React, { useEffect, useState } from "react";
import { CardGroup, Container } from "react-bootstrap";
import { customAxios } from "util/CustomAxios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    customAxios
      .publicAxios({
        method: `get`,
        url: `/api/v1/posts`,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setPosts(response.data.content);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        // if (error.response.status == 401) {
        //   // alert();
        // }
        // 로그인 페이지로 이동
        //또는 refresh 해서 재통신

        if (error?.response?.data?.detail != null) {
          alert(JSON.stringify(error?.response?.data?.detail));
        } else if (error?.response?.data?.message != null) {
          alert(error.response.data.message);
        } else {
          alert("오류가 발생했습니다. 관리자에게 문의하세요.");
        }
      })
      .finally(() => {});
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <CommonLayout isNavbar={true}>
      <Container className="mt-3">
        <CardGroup className="row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
          {posts.map((post, index) => (
            <MyCard key={index} post={post} />
          ))}
        </CardGroup>
      </Container>
    </CommonLayout>
  );
};

export default Posts;
