// Mini CRUD para manejar la autenticación de usuarios, registro, inicio de sesión, etc.

const fs = require("fs"); // Para manejar archivos JSON como base de datos simple
const path = require("path"); // Para construir rutas de archivos de manera segura

const filePath = path.resolve(__dirname, "../data/users.json"); // Ruta al archivo JSON que actúa como base de datos

// Función para leer los usuarios desde el archivo JSON
const readUsers = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data); // Convertir el JSON a un objeto JavaScript
};

// Función para escribir los usuarios en el archivo JSON
const writeUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); // Convertir el objeto a JSON y escribirlo en el archivo
};

//Leer todos los usuarios
const getAllUsers = (req, res) => {
    try {
        const users = readUsers(); // Leer los usuarios desde el archivo JSON
        if (users.length === 0) {
            return res.status(404).json({ ok: false, message: "No se encontraron usuarios en la base de datos" });
        }
        return res.status(200).json({ ok: true, message: "Usuarios encontrados", 
            data: {
                length: users.length,
                users,
            }
         }); // Devolver la lista de usuarios en la respuesta


} catch (error) {
        console.error("Error al leer usuarios:", error);
        return res
            .status(500)    
            .json({ ok: false, message: "Error interno del servidor" });
    }
};


//Register
const register = (req, res) => {
  try {
    const { email, password } = req.body;
    // Validar que el email y la contraseña no estén vacíos
    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "Email y contraseña son requeridos" });
    }

    const users = readUsers(); // Leer los usuarios existentes desde el archivo JSON
    const exist = users.find((user) => user.email === email); // Verificar si el email ya existe
    // Si el email ya está registrado, devolver un error
    if (exist) {
      return res
        .status(409)
        .json({ ok: false, message: "El email ya está registrado" });
    }

    const newUser = {
      id: crypto.randomUUID(), // Generar un ID único para el nuevo usuario
      email,
      password, // En un entorno real, la contraseña debería ser hasheada antes de guardarla
    };
    // Agregar el nuevo usuario a la lista de usuarios y escribirla de nuevo en el archivo JSON
    users.push(newUser);
    // Escribir la lista actualizada de usuarios en el archivo JSON
    writeUsers(users);

    return res.status(201).json({
      ok: true,
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

//Login
const login = (req, res) => {
  
  try {
    const {email, password} = req.body;
    // Validar que el email y la contraseña no estén vacíos
    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "Email y contraseña son requeridos" });
    }
    const users = readUsers(); // Leer los usuarios existentes desde el archivo JSON
    const user = users.find(
        (u) => u.email === email && u.password === password
    ); // Verificar si el email y la contraseña coinciden con algún usuario registrado
    // Si no se encuentra un usuario con las credenciales proporcionadas, devolver un error
    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Credenciales inválidas" });
    }
    // Si las credenciales son correctas, devolver una respuesta exitosa
    return res.status(200).json({
      ok: true,
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    
    const users = readUsers(); // Leer los usuarios existentes desde el archivo JSON
    const exist = users.find((u) => u.id === id); // Verificar si el usuario con el ID proporcionado existe
    // Si el usuario no existe, devolver un error
    if (!exist) {
      return res.status(404).json
      ({ ok: false, 
        message: "Usuario no encontrado" 
    });
    }   
    const filtered = users.filter((u) => u.id !== id); // Filtrar el usuario a eliminar de la lista de usuarios
    writeUsers(filtered); // Escribir la lista actualizada de usuarios en el archivo JSON

    return res.status(200).json({
      ok: true,
      message: "Usuario eliminado exitosamente",
      deleteUser: {
        id: exist.id,
        email: exist.email,
      },    
    });    



  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};
 

module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser,
};
