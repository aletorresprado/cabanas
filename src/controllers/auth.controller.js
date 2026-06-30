// Mini CRUD para manejar la autenticación de usuarios, registro, inicio de sesión, etc.
const User = require("../models/User"); // Importar el modelo de usuario



//Register
const register = async(req, res) => {
        try {
          const { name, email, password } = req.body;

          // Validar que se proporcionen todos los campos requeridos
          if (!name || !email || !password) {
            return res.status(400).json({
              ok: false,
              message: "Por favor, complete todos los campos requeridos. 🤬",
            });
          }

         //Valido que el email no esté registrado previamente 
          const exist = await User.findOne({ email});

          if (exist) {
            return res.status(400).json({
              ok: false,
              message: "El Usuario ya está registrado. 😡",
            });
          }

          // Crear un nuevo usuario con mongoose
          const newUser = await User.create({ 
            name, 
            email, 
            password 
          });

          return res.status(201).json({
            ok: true,
            message: "Usuario registrado exitosamente. 😎",
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role
            }
          });

        }catch (error) {
          console.error(error)
          return res.status(500).json({
            ok: false,
            message: error.message
          })
        }
};

//Login
const login = async(req, res) => {
    try{
       const { email, password } = req.body;
       
       // Validar que se proporcionen todos los campos requeridos
       if (!email || !password) {
        return res.status(400).json({
          ok: false,
          message: "Por favor, complete todos los campos requeridos. 🤬",
        });
      }
     
      const user = await User.findOne({ email, password });

      if (!user) {
        return res.status(401).json({
          ok: false,
          message: "Credenciales inválidas. 😡",
        });
      }
      return res.status(200).json({
        ok: true,
        message: "Inicio de sesión exitoso. 😎",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    }catch (error) {
        console.error(error)
        return res.status(500).json({
          ok: false,
          message: error.message
        })
    }



};

// Obtener todos los usuarios registrados (solo para fines de prueba, no se recomienda en producción)
const getAllUsers = async(req, res) => {
  try {
    const users = await User.find().select('-password'); // Excluir el campo de contraseña de la respuesta
    // Validar si hay usuarios registrados
    if(users.length === 0){
      return res.status(404).json({
        ok: false,
        message: "No hay usuarios registrados. 😥",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Usuarios obtenidos exitosamente. 😎",
      data: {
        length: users.length,
        users
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getAllUsers 
};