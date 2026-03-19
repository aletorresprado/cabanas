// Mini CRUD para manejar la autenticación de usuarios, registro, inicio de sesión, etc.

const fs = require('fs'); // Para manejar archivos JSON como base de datos simple
const path = require('path'); // Para construir rutas de archivos de manera segura

const filePath = path.resolve(__dirname,'../data/users.json'); // Ruta al archivo JSON que actúa como base de datos

// Función para leer los usuarios desde el archivo JSON
const readUsers = () => {
    
        const data = fs.readFileSync(filePath, 'utf-8'); 
        return JSON.parse(data); // Convertir el JSON a un objeto JavaScript
    } 

 // Función para escribir los usuarios en el archivo JSON
const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); // Convertir el objeto a JSON y escribirlo en el archivo
};   

const register = (req, res) => {
    const {email, password} = req.body;
    // Validar que el email y la contraseña no estén vacíos
    if (!email || !password) {
        return res.status(400).json({ ok: false, message: 'Email y contraseña son requeridos' });
    }

    const users = readUsers(); // Leer los usuarios existentes desde el archivo JSON
    const exist = users.find(user => user.email === email); // Verificar si el email ya existe
    // Si el email ya está registrado, devolver un error
if (exist) {
    return res.status(409).json({ ok: false, message: 'El email ya está registrado' });
}

const newUser = {
    id: crypto.randomUUID(), // Generar un ID único para el nuevo usuario
    email,
    password // En un entorno real, la contraseña debería ser hasheada antes de guardarla
};
// Agregar el nuevo usuario a la lista de usuarios y escribirla de nuevo en el archivo JSON
users.push(newUser);
// Escribir la lista actualizada de usuarios en el archivo JSON
writeUsers(users);

return res.status(201).json({ 
    ok: true, 
    message: 'Usuario registrado exitosamente', 
    user: {
        id:newUser.id, 
        email:newUser.email
    } 
});


}

const login = (req, res) => {
    const {email, password} = req.body;

};

module.exports = {
    register,
    login
};