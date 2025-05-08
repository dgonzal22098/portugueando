const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3310;

app.use(express.json());
app.use(cors());

const DB = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password:'Pinkpasword*26019*',
    database:'PruebasPortugues',
})

DB.connect()
.then(() => console.log('Conexión exitosa a PostgreSQL!'))
.catch((err) => console.error('Error de conexión', err));

//RUTA GET

app.get('/api/usuarios', async (req, res) => {
    try {
        const result = await DB.query('SELECT * FROM usuario');
        res.json(result.rows);
    } catch (err) {
        console.log('Error ejecutando query', err);
        res.status(500).json({error: 'Error al obtener usuarios'});
    }
});

//QUERIES
//OBTENER UN USUARIO POR SU EMAIL

  app.post('/api/login', async (req,res) => {
    const {email, password} = req.body;
    console.log("Intentando login con: ",email,password);

    if (!email || !password) {
      return res.status(400).json({error: "Faltan campos requeridos "});
    }

    try {
      const query = 'SELECT * FROM usuario WHERE email = $1 AND contrasena = $2';
      const values = [email, password];

      const result = await DB.query(query, values);
      console.log('Resultado de la consulta: ',result.rows)

      if (result.rows.length === 0) {
        return res.status(401).json({error: 'Credenciales inválidas'});
      }

      res.status(200).json(result.rows[0]);

    } catch (error) {
      console.error('Error al verificar login:', error);
      res.status(500).json({error: 'Error interno del servidor'});
    }


})


//LEVANTAR EL SERVIDOR

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
})