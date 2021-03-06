import React from "react";
import styled from "styled-components";
import { Markdown } from "../renderer";
import PostContent from "../post/Content";

interface Props {
  markdown: string;
}

const Content = styled.div`
  border: solid 1px #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
`;

export function Preview({ markdown }: Props) {
  return (
    <Content>
      <PostContent>
        <Markdown markdown={markdown} />
      </PostContent>
    </Content>
  );
}
