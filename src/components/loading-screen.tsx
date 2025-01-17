import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 24px;
`;

function LodingScreen() {
  return (
    <Wrapper>
      <Text>Loding...</Text>
    </Wrapper>
  );
}

export default LodingScreen;
