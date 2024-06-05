import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Rol from "./Rol.js";
import { config } from "dotenv";
import bcrypt from "bcryptjs";

config();

const Usuario = conexion.define(
  "Usuario",
  {
    // Insertar el ID desde el formulario
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Documento:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Usuarios",
    timestamps: true,
  }
);

Rol.hasMany(Usuario, { foreignKey: "RolId" });
Usuario.belongsTo(Rol);

//encriptacion de contraseñas
var salt = bcrypt.genSaltSync(10);
var hashPass = bcrypt.hashSync(process.env.PASSWORD_ADMIN, salt);

const master = {
  Documento: process.env.DOCUMENT_ADMIN,
  nombre: "Administrador sena",
  correo: "valsolano1111@soy.sena.edu.co",
  password: hashPass,
  RolId: 1,
  updatedAt: "2024-02-03T03:17:30.386Z",
  createdAt: "2024-02-03T03:17:30.386Z",
};

const guardarMaster = async () => {
  try {
    await Usuario.sync();
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      await Usuario.create(master);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
setTimeout(() => {
  guardarMaster();
}, 2500);

export default Usuario;
