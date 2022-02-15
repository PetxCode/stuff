import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import axios from "axios";

const App = () => {
  const url = "http://localhost:9900";
  const [name, setName] = useState("");
  const [display, setDisplay] = useState([]);
  const [displaySocket, setDisplaySocket] = useState([]);

  const postData = async () => {
    await axios.post(url, { name });
  };

  const fetchData = async () => {
    const r = await axios.get(url);
    setDisplay(r.data.data);
  };

  const deleteButton = async (id) => {
    await axios.delete(`${url}/${id}`);
  };

  useEffect(() => {
    const socket = io(url);

    socket.on("observerDelete", (id) => {
      console.log(id);
      if (id) {
        const deleteData = display.filter((el) => {
          return el._id !== id;
        });
        setDisplay(deleteData);
      }
      fetchData();
    });

    socket.on("observer", (data) => {
      console.log(data);
      if (data) {
        setDisplay([...display, data]);
      }
      fetchData();
    });

    fetchData();
  }, []);
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
                <Button
                  onClick={() => {
                    deleteButton(_id);
                  }}
                >
                  Delete
                </Button>
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
  margin-left: 10px;

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
