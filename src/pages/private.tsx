import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../lib/prisma";
import { Post, PostState } from "../constants/type";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import { Mixpanel, TRACK } from "../lib/mixpanel";
import { getSession } from "next-auth/client";

interface Props {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    where: {
      author: {
        email: session?.user.email,
      },
    },
  });

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  useEffect(() => {
    Mixpanel.track(TRACK.HOME, {});
  }, []);

  return (
    <>
      <Header />
      <Container>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Container>
    </>
  );
};

export default Home;
