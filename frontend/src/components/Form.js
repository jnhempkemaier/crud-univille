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

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.tarefa.value = onEdit.tarefa;
      user.horario.value = onEdit.horario;
      user.prioridade.value = onEdit.prioridade;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.tarefa.value ||
      !user.horario.value ||
      !user.prioridade.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }
  
    if (onEdit) {
      await axios
        .put("http://localhost:8080/" + onEdit.id, {
          tarefa: user.tarefa.value,
          horario: user.horario.value,
          prioridade: user.prioridade.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8080", {
          tarefa: user.tarefa.value,
          horario: user.horario.value,
          prioridade: user.prioridade.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.tarefa.value = "";
    user.horario.value = "";
    user.prioridade.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Tarefa</Label>
        <Input name="tarefa" />
      </InputArea>
      <InputArea>
        <Label>Horário</Label>
        <Input name="horario" type="time" />
      </InputArea>
      <InputArea>
        <Label>Prioridade</Label>
        <Input name="prioridade" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
