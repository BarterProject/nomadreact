import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
interface DummyProps {
  text: string;
  active?: boolean;
}
function Dummy({ text, active = false }: DummyProps) {
  return <h1>{text}</h1>;
}
function App() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <div>
      <Container>
        <Dummy active text="hello" />
        <H1>pro</H1>
        <button onClick={onClick}>Click</button>
      </Container>
    </div>
  );
}

export default App;
