import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import TimeLine from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;

function home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <TimeLine />
    </Wrapper>
  );
}

export default home;
