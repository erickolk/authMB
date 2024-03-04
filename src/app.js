require("dotenv").config();
const cors = require('cors');
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const router = require('./routes')


const app = express();

// Isto permite todas as origens. Para segurança, restrinja apenas às origens necessárias
app.use(cors());

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

//Models
const User = require('./models/User')

// Use o router na aplicação
app.use(router);
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}...`));