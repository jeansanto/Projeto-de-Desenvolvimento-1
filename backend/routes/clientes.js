import express from "express";
import { addCliente, deleteCliente, getClientes, updateCliente } from "../controllers/cliente.js";

const router = express.Router()

router.get("/", getClientes)

router.post("/", addCliente)

router.put("/:id", updateCliente)

router.delete("/:id", deleteCliente)

export default router