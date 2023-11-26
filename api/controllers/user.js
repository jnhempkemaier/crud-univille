import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM todolist2";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO todolist2(`tarefa`, `horario`, `prioridade`) VALUES(?, ?, ?)";

  const values = [
    req.body.tarefa,
    req.body.horario,
    req.body.prioridade,
  ];

  db.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa criada com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE todolist2 SET `tarefa` = ?, `horario` = ?, `prioridade` = ? WHERE `id` = ?";

  const values = [
    req.body.tarefa,
    req.body.horario,
    req.body.prioridade,
  ];

  console.log("Valores a serem atualizados:", values);  // Esta linha está referenciando a variável values

  db.query(q, [...values, req.params.id], (err) => {
    if (err) {
      console.error("Erro ao atualizar a tarefa:", err);
      return res.status(500).json({ error: "Erro ao atualizar a tarefa." });
    }

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM todolist2 WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa deletada com sucesso.");
  });
};
