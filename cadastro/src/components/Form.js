import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;


const Form = ({ getClientes, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const cliente = ref.current;

      cliente.nome.value = onEdit.nome;
      cliente.email.value = onEdit.email;
      cliente.telefone.value = onEdit.telefone;
      cliente.material.value = onEdit.material;
      cliente.produto_final.value = onEdit.produto_final;
      cliente.codigo_barra.value = onEdit.codigo_barra;
      cliente.valor_produto.value = onEdit.valor_produto;
      cliente.data_fiscal.value = onEdit.data_fiscal;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cliente = ref.current;

    if (
      !cliente.nome.value ||
      !cliente.email.value ||
      !cliente.telefone.value ||
      !cliente.material.value ||
      !cliente.produto_final.value ||
      !cliente.codigo_barra.value ||
      !cliente.valor_produto.value ||
      !cliente.data_fiscal.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: cliente.nome.value,
          email: cliente.email.value,
          telefone: cliente.telefone.value,
          material: cliente.material.value,
          produto_final: cliente.produto_final.value,
          codigo_barra: cliente.codigo_barra.value,
          valor_produto: cliente.valor_produto.value,
          data_fiscal: cliente.data_fiscal.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: cliente.nome.value,
          email: cliente.email.value,
          telefone: cliente.telefone.value,
          material: cliente.material.value,
          produto_final: cliente.produto_final.value,
          codigo_barra: cliente.codigo_barra.value,
          valor_produto: cliente.valor_produto.value,
          data_fiscal: cliente.data_fiscal.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    cliente.nome.value = "";
    cliente.email.value = "";
    cliente.telefone.value = "";
    cliente.material.value = "";
    cliente.produto_final.value = "";
    cliente.codigo_barra.value = "";
    cliente.valor_produto.value = "";
    cliente.data_fiscal.value = "";

    setOnEdit(null);
    getClientes();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
      </InputArea>
      <InputArea>
        <Label>Material</Label>
        <Input name="material" />
      </InputArea>
      <InputArea>
        <Label>Produto Final</Label>
        <Input name="produto_final" />
      </InputArea>
      <InputArea>
        <Label>Código Barra</Label>
        <Input name="codigo_barra" />
      </InputArea>
      <InputArea>
        <Label>Valor</Label>
        <Input name="valor_produto" />
      </InputArea>
      <InputArea>
        <Label>Data da Nota Fiscal</Label>
        <Input name="data_fiscal" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;