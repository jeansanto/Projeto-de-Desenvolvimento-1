import { db } from "../db.js";

export const getClientes = (_, res) => {
  const q = "SELECT * FROM clientes";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addCliente = (req, res) => {
  const q =
    "INSERT INTO clientes(`nome`, `email`, `telefone`, `material`, `produto_final`, `codigo_barra`, `valor_produto`, `data_fiscal`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.material,
    req.body.produto_final,
    req.body.codigo_barra,
    req.body.valor_produto,
    req.body.data_fiscal,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cliente criado com sucesso.");
  });
};

export const updateCliente = (req, res) => {
  const q =
    "UPDATE clientes SET `nome` = ?, `email` = ?, `telefone` = ?, `material` = ?, `produto_final` = ?, `codigo_barra` = ?, `valor_produto` = ?, `data_fiscal` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.material,
    req.body.produto_final,
    req.body.codigo_barra,
    req.body.valor_produto,
    req.body.data_fiscal,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cliente atualizado com sucesso.");
  });
};

export const deleteCliente = (req, res) => {
  const q = "DELETE FROM clientes WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Cliente deletado com sucesso.");
  });
};