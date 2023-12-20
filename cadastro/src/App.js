import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [clientes, setClientes] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setClientes(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getClientes();
  }, [setClientes]);

  return (
    <>
      <Container>
        <Title>sistema de cadastro</Title>
        <a href="http://127.0.0.1:5500/Tela%20home%20Ferra%C3%A7o%20Sul/index.html">Pagina inicial</a>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getClientes={getClientes} />
        <Grid setOnEdit={setOnEdit} clientes={clientes} setClientes={setClientes} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;