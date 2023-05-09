// Creamos el conjunto de usuarios ya existentes en la base de datos.

let users = [
    {
        "username" : "paulorze",
        "password" : "paulorze12",
        "mail" : "agustinrzeszut@hotmail.com",
        "lenguajes" : ["HTML","CSS","JavaScript","Python"]
    },
    {
        "username" : "juanmerca",
        "password" : "juanmerca69420",
        "mail" : "juanmerca@yahoo.com",
        "lenguajes" : ["algo de español"]
    },
    {
    "username" : "loleroavanzado",
    "password" : "contraseña",
    "mail" : "loleroavanzado@gmail.com",
    "lenguajes" : ["LoL","CS 1.6","Minecraft"]
    },
    {
        "username" : "a",
        "password" : "a",
        "mail" : "a@gmail.com",
        "lenguajes" : ["HTML","CSS","JavaScript","Python"]
    }
];

// Creamos las variables que serán utilizadas en caso que el usuario decida crear un nuevo perfil.

let nuevoUsername;
let nuevoMail;
let nuevoPassword;
let nuevoLenguajes = [];

// Creamos la variable que va a contar la cantidad de intentos de inicio de sesión.

let iniciosFallidos = 0;

// Le preguntamos al usuario si quiere iniciar sesión o crear un nuevo usuario. Dependiendo de lo que elija el usuario, iniciamos sesión, creamos nuevo usuario o solicitamos que ingrese nuevamente la opción.

let elegirAccion = ()=> {
    let accion = parseInt(prompt(`Bienvenido, ingresa 1 para iniciar sesión o 2 para crear un nuevo usuario.`));
    switch (accion) {
        case 1:
            verificar();
            break;
        case 2:
            ingresarUsername();
            break;
        default:
            alert(`Por favor, elige una opción correcta.`);
            elegirAccion();
    }
}

// Creamos la función para poder verificar al usuario en la lista de usuarios ya ingresados a la plataforma
let verificar = ()=> {
    let username = (prompt(`Por favor, ingresa tu nombre de usuario. Recuerda que no distingue entre mayúsculas y minúsculas.`)).toLowerCase();
    let password = prompt(`Por favor, ingresá tu contraseña.`);
    let ingreso = false;
    
    users.forEach(user => {
        if (ingreso == false) {
            if (user.username == username && user.password == password) {
                ingreso = true;
                alert(`Bienvenido ${user.username}, gracias por volver. La dirección de correo electrónico asociada a esta cuenta es "${user.mail}". Los lenguajes que has trabajado hasta ahora son: ${user.lenguajes}.`);
            };
        };
    });

    if (ingreso == false) {
        if (iniciosFallidos < 2) {
            alert(`Alguno de los datos que ingresaste no es válido. Por favor, intenta nuevamente.`);
        iniciosFallidos += 1;
        verificar();
        } else {
            alert(`Me estás queriendo hackear. Le pasé tu dirección al FBI y te van a ir a buscar por atrevid@`);
        }
    };
};

// El usuario ha elegido crear un nuevo usuario Primero se verificará que el username elegido por el usuario no haya sido utilizado aún.
let ingresarUsername = ()=> {
    nuevoUsername = (prompt(`Por favor, ingresa tu nuevo nombre de usuario. Puede estar formado por números y letras, no distingue entre mayúsculas y minúsculas.`)).toLowerCase();
    let usernameDisponible = true;
    users.forEach(user => {
            if (user.username == nuevoUsername) {
                usernameDisponible = false;
                return false; //Si el nombre de usuario es igual a alguno de los nombres de usuarios en la base de datos, entonces usamos el return false para que corte el forEach.
            }
    });
    if (usernameDisponible == false) {
        alert(`Lo sentimos, ese nombre de usuario ya existe.`);
        ingresarUsername();
    } else {
        alert (`El nombre de usuario que elegiste está disponible.`);
        ingresarMail();
    };
};

// Luego verificamos que el correo electrónico tampoco haya sido usado.

let ingresarMail = ()=> {
    nuevoMail = (prompt(`Por favor, ingrese su dirección de correo electrónico.`)).toLowerCase();
    let mailDisponible = true;

    if (nuevoMail.length < 12 || !(nuevoMail.includes("@")) || !(nuevoMail.includes(".com"))) {
        alert(`La dirección de correo que nos proporcionaste no tiene un formato válido.`);
        ingresarMail();
    } else {
        users.forEach(user => {
            if (user.mail == nuevoMail) {
                mailDisponible = false;
                return false; //Si el mail ingresado es igual a alguno de los mails en la base de datos, entonces usamos el return false para que corte el forEach.
            }
        });
        if (mailDisponible == false) {
            alert(`Lo sentimos, esa dirección de correo ya cuenta con un usuario.`);
            ingresarMail();
        } else {
            alert (`El mail que ingresaste está disponible.`);
            ingresarPassword();
        };
    };
};

// Verificamos que el usuario ingrese una contraseña que cumpla con los requisitos pedidos.

let ingresarPassword = ()=> {
    let password1 = prompt(`Por favor, ingrese su contraseña. Debe incluir al menos un número, una letra en mayúscula y tener 8 caracteres de largo.`);
    let password2 = prompt(`Por favor, vuelva a ingresar su contraseña.`);
    
    if (password1 != password2) {
        alert(`Las contraseñas que ingresaste no concuerdan. Por favor, volvé a ingresarlas.`);
        ingresarPassword();
    } else {
        nuevoPassword = password1;
        if (nuevoPassword.length <= 7 || !(/[A-Z]/.test(nuevoPassword)) || !(/[0-9]/.test(nuevoPassword))){
            alert(`La contraseña no cumple con los requisitos.`);
            ingresarPassword();
        } else {
            alert(`La contraseña es válida.`);
            ingresarLenguajes();
        }
    };
};

// Una vez que el usuario ingresa todos los datos necesarios de forma válida, entonces le pediremos que ingrese los lenguajes que ya conoce.
let ingresarLenguajes = ()=> {
    lenguajesIngresados = prompt(`Por favor, ingresa los lenguajes que conoces separados entre sí por una coma`);
    nuevoLenguajes = lenguajesIngresados.split(",");
    if (!(confirm(`Los lenguajes que ingresaste son ${nuevoLenguajes}. ¿Es correcto?`))) {
        alert(`Menos mal que te pregunté.`);
        ingresarLenguajes();
    } else {
        alert(`Todos los datos ingresados han sido verificados correctamente. Por favor, inicie sesión con su nueva cuenta.`);
        crearUsuario();
    }
};

// Una vez que está todo correcto, entonces, procedemos a añadir el nuevo usuario a la base de datos y confirmar su existencia en la misma pidiéndole que inicie sesión.
let crearUsuario = ()=> {
    let nuevoUsuario = {"username" : nuevoUsername,"password" : nuevoPassword,"mail"  : nuevoMail,"lenguajes" : nuevoLenguajes};
    users.push(nuevoUsuario);
    verificar();
}

// Iniciamos la primer función para que todo fluya (?)

elegirAccion();


