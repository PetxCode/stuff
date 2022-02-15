return (
  <div>
    <Container>
      <Wrapper>
        <Form onSubmit={postData}>
          <Input
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button type="submit">Submit</Button>
        </Form>

        <br />
        <br />

        <Card>
          {display?.map(({ _id, name }) => (
            <Holder key={_id}>
              <Name>{name}</Name>
            </Holder>
          ))}
        </Card>
      </Wrapper>
    </Container>
  </div>
);
};

export default App;

const Name = styled.div`
font-weight: bold;
`;

const Holder = styled.div`
width: 200px;
height: 100px;
background: white;
border-radius: 5px;
border: 1px solid gray;
display: flex;
justify-content: center;
align-items: center;
margin: 10px;
`;

const Card = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

const Button = styled.button`
padding-left: 10px;
border-radius: 3px;
outline: none;
border: 1px gray;
padding: 15px 30px;
transition: all 350ms;
transform: scale(1);
background: #004080;
color: white;

:hover {
  transform: scale(0.97);
  cursor: pointer;
}
`;

const Input = styled.input`
width: 300px;
height: 40px;
padding-left: 10px;
border-radius: 3px;
outline: none;
border: 1px gray;
margin: 0 10px;
`;

const Form = styled.form`
display: flex;
align-items: center;
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
padding-top: 50px;
`;

const Container = styled.div`
width: 100%;
height: 100%;
min-height: 100vh;
background: lightgray;
`;
