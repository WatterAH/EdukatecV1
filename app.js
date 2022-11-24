const express = require('express')
const mysql = require('mysql2')
const { body, validationResult } = require('express-validator')
var app = express()
var bodyPraser = require('body-parser')
var nodemailer = require('nodemailer')

app.set('view engine', 'ejs')

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => console.log('Servidor iniciado en ' + app.get('port')));

app.use(bodyPraser.json())

app.use(bodyPraser.urlencoded({
    extended: false
}))

app.use(express.static('public'))

//CONEXION DB
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'users'
})

con.connect((err) => {
    if (err) {
        console.log("ERROR: " + err)
        return
    }
    console.log("Conexion con 'users' establecida")
})

//BYCRIPTJS
const bcryptjs = require('bcryptjs')

//SESSION
const session = require('express-session')
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


//REGISTRO
app.post('/reg', [
    body('name', 'Ingresa un nombre valido')
        .exists()
        .trim()
        .isAlpha(),
    body('lastname', 'Ingresa un apellido valido')
        .exists()
        .trim()
        .isAlpha(),
    body('pass', 'Ingresa un contraseña valida')
        .exists()
        .isLength({ min: 7 }),
    body('mail', 'Ingresa un email valido')
        .exists()
        .isEmail()
        .trim()
        .isLength({ max: 250 }),
    body('rol', 'Selecciona un rol')
        .exists()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const valores = req.body
        const validaciones = errors.array()
        res.render('register', {
            validaciones: validaciones,
            valores: valores
        })
    } else {
        let name = req.body.name
        let lastname = req.body.lastname
        let mail = req.body.mail
        let pass = req.body.pass
        let rol = req.body.rol
        let passwordHaash = await bcryptjs.hash(pass, 8)

        con.query('CREATE TABLE IF NOT EXISTS maestros(id int auto_increment, name text, lastname text, mail varchar(250) unique, pass text, primary key (id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })
        con.query('CREATE TABLE IF NOT EXISTS coordinadores(id int auto_increment, name text, lastname text, mail varchar(250) unique, pass text, primary key (id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })
        con.query('CREATE TABLE IF NOT EXISTS administradores (id int auto_increment, name text, lastname text, mail varchar(250) unique, pass text, primary key (id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })
        con.query('CREATE TABLE IF NOT EXISTS padres (id int auto_increment, id_coordinador int, name text, primary key (id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })
        con.query('CREATE TABLE IF NOT EXISTS alumnos(id int auto_increment, id_coordinador int, id_grupo text, name text, primary key (id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })
        con.query('CREATE TABLE IF NOT EXISTS asignacion_grupos(id_maestro int, id_grupo int)', async (err) => {
            if (err) return console.log(err)
        })
        con.query('CREATE TABLE IF NOT EXISTS asignacion_padres(id_padre int, id_alumno int)', async (err) => {
            if (err) return console.log(err)
        })
        con.query('CREATE TABLE IF NOT EXISTS materias(id int auto_increment, id_maestro int, name text, primary key (id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })
        con.query('CREATE TABLE IF NOT EXISTS temas(id int auto_increment, id_materia int, id_maestro int, materia text, name text, primary key (id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })
        con.query('CREATE TABLE IF NOT EXISTS registros (id int auto_increment, id_maestro int, id_alumno int, name text, materia text, tema text, date date, performance text, notes text, primary key(id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })
        con.query('CREATE TABLE IF NOT EXISTS grupos (id int auto_increment, id_coordinador int, nombre text, primary key (id))', async (err) => {
            if (err) return console.log("Error: " + err)
        })

        con.query('SELECT * FROM maestros WHERE mail = ?', [mail], async (err, results) => {
            con.query('SELECT * FROM coordinadores WHERE mail = ?', [mail], async (err2, results2) => {
                if (results.length == 0 && results2 == 0) {
                    if (rol === "maestro") {
                        con.query('INSERT INTO maestros SET ?', { name: name, lastname: lastname, mail: mail, pass: passwordHaash }, async (err) => {
                            res.render('register', {
                                alert: true,
                                alertTitle: "Registro",
                                alertMessage: "Registro exitoso!",
                                alertIcon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                                ruta: 'login'
                            })
                        })
                    } else if (rol === "coordinador") {
                        con.query('INSERT INTO coordinadores SET ?', { name: name, lastname: lastname, mail: mail, pass: passwordHaash }, async (err, results) => {
                            res.render('register', {
                                alert: true,
                                alertTitle: "Registro",
                                alertMessage: "Registro exitoso!",
                                alertIcon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                                ruta: 'login'
                            })
                        })
                    }
                } else {
                    res.render('register', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Este correo ya fue registrado! Comunicate con nosotros si crees que se trata de un error",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'register'
                    })
                }
            })
        })
    }
})

//GOOGLE ACCESS
app.post('/google-access', async (req, res) => {
    res.send('Hola')
})

//AUTENTICACION
app.post('/auth', [
    body('mail', 'Ingresa un mail valido')
        .notEmpty()
        .trim(),
    body('pass', 'Ingresa una contraseña valida')
        .exists()
        .isLength({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const valores = req.body
        const validaciones = errors.array()
        res.render('login', {
            validaciones: validaciones,
            valores: valores
        })
    } else {
        const mail = req.body.mail
        const pass = req.body.pass
        con.query('SELECT * FROM maestros WHERE mail = ?', [mail], async (err, maestro) => {
            if (maestro.length == 0 || !(await bcryptjs.compare(pass, maestro[0].pass))) {
                con.query('SELECT * FROM coordinadores WHERE mail = ?', [mail], async (err, coordinador) => {
                    if (coordinador.length == 0 || !(await bcryptjs.compare(pass, coordinador[0].pass))) {
                        con.query('SELECT * FROM administradores WHERE mail = ? AND pass = ?', [mail, pass], async (err, admin) => {
                            if (admin.length == 0) {
                                con.query('SELECT * FROM padres WHERE name = ? AND id = ?', [mail, pass], async (err, padre) => {
                                    if (padre.length == 0) {
                                        res.render('login', {
                                            alert: true,
                                            alertTitle: "Error",
                                            alertMessage: "Correo o contraseña incorrectos",
                                            alertIcon: 'error',
                                            showConfirmButton: true,
                                            timer: false,
                                            ruta: 'login'
                                        })
                                    } else {
                                        req.session.loggedin4 = true
                                        req.session.name = padre[0].name
                                        res.render('login', {
                                            alert: true,
                                            alertTitle: "Hecho!",
                                            alertMessage: "Login correcto!",
                                            alertIcon: 'success',
                                            showConfirmButton: false,
                                            timer: 1500,
                                            ruta: 'ver_hijos'
                                        })
                                    }
                                })

                            } else {
                                req.session.loggedin3 = true
                                req.session.name = admin[0].name
                                req.session.lastname = admin[0].lastname
                                req.session.mail = admin[0].mail
                                res.render('login', {
                                    alert: true,
                                    alertTitle: "Hecho!",
                                    alertMessage: "Login correcto!",
                                    alertIcon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    ruta: 'inicio-admins'
                                })
                            }
                        })

                    } else {
                        req.session.loggedin2 = true
                        req.session.name = coordinador[0].name
                        req.session.lastname = coordinador[0].lastname
                        req.session.mail = coordinador[0].mail
                        res.render('login', {
                            alert: true,
                            alertTitle: "Hecho!",
                            alertMessage: "Login correcto!",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'inicio-coordinadores'
                        })
                    }
                })
            } else {
                req.session.loggedin = true
                req.session.name = maestro[0].name
                req.session.lastname = maestro[0].lastname
                req.session.mail = maestro[0].mail
                res.render('login', {
                    alert: true,
                    alertTitle: "Hecho!",
                    alertMessage: "Login correcto!",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'inicio',
                })
            }
        })
    }
})

//AÑADIR (PAGE)
app.get('/add_objects', async (req, res) => {
    var mail = req.session.mail
    con.query('SELECT * FROM coordinadores WHERE mail = ?', [mail], async (err, coordinador) => {
        if (err) return console.log(err)
        if (coordinador.length == 0) return res.redirect('login')
        con.query('SELECT * FROM grupos', (err, grupos) => {
            if (err) return console.log(err)
            res.render('add', {
                grupos: grupos
            })
        })
    })
})

//ASIGNAR (PAGE)
app.get('/asignar', async (req, res) => {
    var mail = req.session.mail
    con.query('SELECT * FROM coordinadores WHERE mail = ?', [mail], async (err, coordinador) => {
        if (err) return console.log(err)
        if (coordinador.length == 0) return res.redirect('login')
        var id_coordinador = coordinador[0].id
        con.query('SELECT * FROM alumnos WHERE id_coordinador = ?', [id_coordinador], async (err, alumnos) => {
            con.query('SELECT * FROM maestros', async (err, maestros) => {
                con.query('SELECT * FROM padres WHERE id_coordinador = ?', [id_coordinador], async (err, padres) => {
                    con.query('SELECT * FROM grupos WHERE id_coordinador = ?', [id_coordinador], async (err, grupos) => {
                        res.render('to_assign', {
                            alumnos: alumnos,
                            padres: padres,
                            grupos: grupos,
                            maestros: maestros
                        })
                    })
                })
            })
        })
    })
})


//CREAR ALUMNO
app.post('/crear_alumno', [
    body('name', 'No es un nombre!')
        .exists()
        .custom((value, { req }) => {

        })
], async (req, res) => {
    const name = req.body.name
    const grupo = req.body.grupo
    const mail = req.session.mail
    con.query('SELECT * FROM coordinadores WHERE mail = ?', [mail], async (err, coordinador) => {
        if (err) return console.log(err)
        if (coordinador.length == 0) return res.redirect('login')
        var id_coordinador = coordinador[0].id
        if (err) return console.log("Error: " + err)
        if (typeof grupo == "number") {
            con.query('SELECT * FROM grupos WHERE id = ?', [grupo], async (err, grupo) => {
                if (err) return console.log(err)
                var id_grupo = grupo[0].id
                con.query('INSERT INTO alumnos SET ?', { id_coordinador: id_coordinador, id_grupo: id_grupo, name: name }, async (err) => {
                    if (err) console.log(err)
                    con.query('SELECT * FROM grupos WHERE id_coordinador = ?', [id_coordinador], async (err, grupos) => {
                        if (err) return console.log(err)
                        res.render('add', {
                            grupos: grupos
                        })
                    })
                })
            })
        } else {
            con.query('INSERT INTO alumnos SET ?', { id_coordinador: id_coordinador, id_grupo: grupo, name: name }, async (err) => {
                if (err) return console.log(err)
                con.query('SELECT * FROM grupos WHERE id_coordinador = ?', [id_coordinador], async (err, grupos) => {
                    if (err) return console.log(err)
                    res.render('add', {
                        grupos: grupos
                    })
                })
            })
        }

    })

})

//CREAR GRUPO
app.post('/crear_grupo', async (req, res) => {
    var mail = req.session.mail
    var name = req.body.name
    con.query('SELECT * FROM coordinadores WHERE mail = ?', [mail], async (err, coordinador) => {
        if (coordinador.length == 0) return res.redirect('login')
        if (err) return console.log(err)
        const id_coordinador = coordinador[0].id
        con.query('SELECT * FROM grupos WHERE nombre = ?', [name], async (err, grupos) => {
            if (err) return console.log(err)
            if (grupos.length > 0) return res.render('add', {
                grupos: grupos
            })
            con.query('INSERT INTO grupos SET ?', { id_coordinador: id_coordinador, nombre: name }, async (err) => {
                if (err) return console.log(err)
                con.query('SELECT * FROM grupos WHERE id_coordinador = ?', [id_coordinador], async (err, grupos) => {
                    if (err) return console.log(err)
                    res.render('add', {
                        grupos: grupos
                    })
                })
            })
        })
    })
})

//CREAR PADRE
app.post('/crear_padre', async (req, res) => {
    const name = req.body.name
    const mail = req.session.mail
    con.query('SELECT * FROM coordinadores WHERE mail = ?', [mail], (err, coordinador) => {
        if (err) return console.log(err)
        const id_coordinador = coordinador[0].id
        con.query('INSERT INTO padres SET ?', { id_coordinador: id_coordinador, name: name }, async (err) => {
            if (err) return console.log(err)
            con.query('SELECT * FROM grupos WHERE id_coordinador = ?', [id_coordinador], async (err, grupos) => {
                if (err) return console.log(err)
                res.render('add', {
                    grupos: grupos
                })
            })
        })

    })
})

//ASIGNAR ALUMNOS 
app.post('/asignar_alumnos', (req, res) => {
    var alumnos = req.body.alumnos
    var grupo = req.body.grupo
    var mail = req.session.mail

    if (typeof alumnos == "string") {
        con.query('UPDATE alumnos SET id_grupo = ? WHERE id = ?', [grupo, alumnos], async (err) => {
            if (err) return console.log(err)
        })
        res.redirect('/asignar')
    } else {
        alumnos.forEach(id =>
            con.query('UPDATE alumnos SET id_grupo = ? WHERE id = ?', [grupo, id], async (err) => {
                if (err) return console.log(err)
            }))
        res.redirect('/asignar')
    }
})

//ASIGNAR HIJOS 
app.post('/asignar_hijos', (req, res) => {
    var hijos = req.body.hijos
    var padre = req.body.padre

    if (typeof hijos == "string") {
        con.query('SELECT * FROM asignacion_padres WHERE id_padre = ? AND id_alumno = ?', [padre, hijos], async (err, as) => {
            if (err) return console.log(err)
            if (as.length > 0) return res.redirect('/asignar')
            con.query('INSERT INTO asignacion_padres SET ?', { id_padre: padre, id_alumno: hijos }, async (err) => {
                if (err) return console.log(err)
                res.redirect('/asignar')
            })
        })
    } else {
        hijos.forEach(id =>
            con.query('SELECT * FROM asignacion_padres WHERE id_padre = ? AND id_alumno = ?', [padre, id], async (err, as) => {
                if (err) return console.log(err)
                if (as.length == 0) {
                    con.query('INSERT INTO asignacion_padres SET ?', { id_padre: padre, id_alumno: id }, async (err) => {
                        if (err) return console.log(err)
                    })
                }
            })
        )
        res.redirect('/asignar')
    }
})

//ASIGNAR MAESTROS 
app.post('/asignar_grupos', (req, res) => {
    var grupos = req.body.grupos
    var maestro = req.body.maestro

    if (typeof grupos == "string") {
        con.query('SELECT * FROM asignacion_grupos WHERE id_maestro = ? AND id_grupo = ?', [maestro, grupos], async (err, as) => {
            if (err) return console.log(err)
            if (as.length > 0) return res.redirect('/asignar')
            con.query('INSERT INTO asignacion_grupos SET ?', { id_maestro: maestro, id_grupo: grupos }, async (err) => {
                if (err) return console.log(err)
                res.redirect('/asignar')
            })
        })
    } else {
        grupos.forEach(id =>
            con.query('SELECT * FROM asignacion_grupos WHERE id_maestro = ? AND id_grupo = ?', [maestro, id], async (err, as) => {
                if (err) return console.log(err)
                if (as.length == 0) {
                    con.query('INSERT INTO asignacion_grupos SET ?', { id_maestro: maestro, id_grupo: id }, async (err) => {
                        if (err) return console.log(err)
                    })
                }
            })
        )
        res.redirect('/asignar')
    }
})

//CREAR (PAGE)
app.get('/crear_page', async (req, res) => {
    const mail = req.session.mail

    con.query('SELECT * FROM maestros WHERE mail = ?', [mail], async (err, maestro) => {
        if (err) return console.log(err)
        if (maestro.length == 0) return res.redirect('login')
        var id_maestro = maestro[0].id
        con.query('SELECT * FROM materias WHERE id_maestro = ?', [id_maestro], async (err, materias) => {
            if (err) return console.log(err)
            res.render('crear', {
                materias: materias
            })
        })
    })
})

//CREAR MATERIA
app.post('/crear_materia', async (req, res) => {
    const name = req.body.name
    const mail_maestro = req.session.mail

    con.query('SELECT * FROM maestros WHERE mail = ?', [mail_maestro], (err, maestro) => {
        if (err) return console.log(err)
        const id_maestro = maestro[0].id
        con.query('SELECT * FROM materias WHERE name = ? AND id_maestro = ?', [name, id_maestro], async (err, materia) => {
            if (err) {
                console.log(err)
            } else if (materia.length > 0) {
                res.redirect('/crear_page')
            } else {
                con.query('INSERT INTO materias SET ?', { name: name, id_maestro: id_maestro }, async (err) => {
                    if (err) return console.log(err)
                    res.redirect('/crear_page')
                })
            }
        })
    })
})

//CREAR TEMA
app.post('/crear_tema', async (req, res) => {
    const name = req.body.name
    const materia = req.body.materias
    const mail_maestro = req.session.mail

    con.query('SELECT * FROM maestros WHERE mail = ?', [mail_maestro], (err, maestro) => {
        if (err) return console.log(err)
        const id_maestro = maestro[0].id
        con.query('SELECT * FROM materias WHERE id_maestro = ? AND id = ?', [id_maestro, materia], async (err, materia) => {
            if (err) {
                console.log(err)
            } else if (materia.length == 0) {
                res.redirect('/crear_page')
            } else {
                con.query('SELECT * FROM temas WHERE name = ? AND id_materia', [name, materia], async (err, tema) => {
                    if (err) {
                        console.log(err)
                    } else if (tema.length > 0) {
                        res.redirect('/crear_page')
                    } else {
                        const id_materia = materia[0].id
                        const nombre_materia = materia[0].name
                        con.query('INSERT INTO temas SET ?', { id_materia: id_materia, id_maestro: id_maestro, materia: nombre_materia, name: name }, async (err, results) => {
                            if (err) return console.log(err)
                            res.redirect('/crear_page')
                        })
                    }
                })
            }
        })
    })
})


//GENERAR REGISTRO (PAGE)
app.get('/generar_registro', (req, res) => {
    var mail = req.session.mail
    con.query('SELECT * FROM maestros WHERE mail = ?', [mail], async (err, maestro) => {
        if (err) return console.log(err)
        if (maestro.length == 0) {
            res.redirect('login')
        } else {
            const id_maestro = maestro[0].id
            con.query('SELECT id_grupo FROM asignacion_grupos WHERE id_maestro = ?', [id_maestro], async (err, grupos) => {
                if (err) return console.log(err)
                if (grupos.length == 0) {
                    con.query('SELECT * FROM alumnos WHERE id_grupo = ? ', [0], async (err, alumnos) => {
                        if (err) return console.log(err)
                        con.query('SELECT * FROM materias WHERE id_maestro = ?', [id_maestro], async (err, materias) => {
                            if (err) return console.log(err)
                            con.query('SELECT * FROM temas WHERE id_maestro = ?', [id_maestro], async (err, temas) => {
                                if (err) return console.log(err)
                                if (err) return console.log(err)
                                res.render('registration', {
                                    alumnos: alumnos,
                                    materias: materias,
                                    temas: temas,
                                })
                            })
                        })
                    })
                } else {
                    if (grupos.length > 1) {
                        var ids = []
                        for (let i = 0; i < grupos.length; i++) {
                            ids.push(grupos[i].id_grupo)
                        }
                        con.query('SELECT * FROM alumnos WHERE id_grupo IN (' + ids + ')', async (err, alumnos) => {
                            if (err) return console.log(err)
                            con.query('SELECT * FROM materias WHERE id_maestro = ?', [id_maestro], async (err, materias) => {
                                if (err) return console.log(err)
                                con.query('SELECT * FROM temas WHERE id_maestro = ?', [id_maestro], async (err, temas) => {
                                    if (err) return console.log(err)
                                    if (err) return console.log(err)
                                    res.render('registration', {
                                        alumnos: alumnos,
                                        materias: materias,
                                        temas: temas,
                                    })
                                })
                            })
                        })
                    } else {
                        const id_grupo = grupos[0].id_grupo
                        con.query('SELECT * FROM alumnos WHERE id_grupo = ? ', [id_grupo], async (err, alumnos) => {
                            if (err) return console.log(err)
                            con.query('SELECT * FROM materias WHERE id_maestro = ?', [id_maestro], async (err, materias) => {
                                if (err) return console.log(err)
                                con.query('SELECT * FROM temas WHERE id_maestro = ?', [id_maestro], async (err, temas) => {
                                    if (err) return console.log(err)
                                    if (err) return console.log(err)
                                    res.render('registration', {
                                        alumnos: alumnos,
                                        materias: materias,
                                        temas: temas,
                                    })
                                })
                            })
                        })
                    }
                }
            })
        }
    })
})

//REGISTRO
app.post('/add_registration', (req, res) => {
    var mail = req.session.mail
    var id = req.body.alumnos
    var materia = req.body.materias
    var tema = req.body.temas
    var date = req.body.date
    var performance = req.body.rating
    var notes = req.body.notes
    if (notes.length == 0) {
        notes = "Sin especificaciones"
    }
    con.query('SELECT * FROM maestros WHERE mail = ?', [mail], async (err, maestro) => {
        if (err) return console.log(err)
        if (maestro.length == 0) return res.redirect('login')
        const id_maestro = maestro[0].id
        con.query('SELECT * FROM alumnos WHERE id = ?', [id], async (err, alumno) => {
            var name = alumno[0].name
            con.query('INSERT INTO registros SET ?', { id_maestro: id_maestro, id_alumno: id, name: name, materia: materia, tema: tema, date: date, performance: performance, notes: notes }, async (err) => {
                if (err) return console.log(err)
                res.redirect('generar_registro')
            })
        })
    })

})


//VER TODO
app.get('/ver_todo', (req, res) => {
    var mail = req.session.mail
    con.query('SELECT * FROM maestros WHERE mail = ?', [mail], async (err, maestro) => {
        if (maestro.length == 0) {
            res.redirect('login')
        } else {
            const id = maestro[0].id
            con.query('SELECT id_grupo FROM asignacion_grupos WHERE id_maestro = ?', [id], async (err, grupos) => {
                if (err) return console.log(err)
                if (grupos.length == 0) {
                    con.query('SELECT * FROM alumnos WHERE id_grupo = ? ', [0], async (err, alumnos) => {
                        if (err) return console.log(err)
                        con.query('SELECT * FROM materias WHERE id_maestro = ?', [id], async (err, materias) => {
                            if (err) return console.log(err)
                            con.query('SELECT * FROM temas WHERE id_maestro = ?', [id], async (err, temas) => {
                                if (err) return console.log(err)
                                con.query('SELECT * FROM registros WHERE id_maestro = ?', [id], async (err, registros) => {
                                    if (err) return console.log(err)
                                    res.render('ver', {
                                        alumnos: alumnos,
                                        materias: materias,
                                        temas: temas,
                                        registros: registros
                                    })
                                })
                            })
                        })
                    })
                } else {
                    if (grupos.length > 1) {
                        var ids = []
                        for (let i = 0; i < grupos.length; i++) {
                            ids.push(grupos[i].id_grupo)
                        }
                        con.query('SELECT * FROM alumnos WHERE id_grupo IN (' + ids + ')', async (err, alumnos) => {
                            if (err) return console.log(err)
                            con.query('SELECT * FROM materias WHERE id_maestro = ?', [id], async (err, materias) => {
                                if (err) return console.log(err)
                                con.query('SELECT * FROM temas WHERE id_maestro = ?', [id], async (err, temas) => {
                                    if (err) return console.log(err)
                                    con.query('SELECT * FROM grupos WHERE id = ?', [id_grupo], async (err, grupos) => {
                                        if (err) return console.log(err)
                                        con.query('SELECT * FROM registros WHERE id_maestro = ?', [id], async (err, registros) => {
                                            if (err) return console.log(err)
                                            res.render('ver', {
                                                alumnos: alumnos,
                                                materias: materias,
                                                temas: temas,
                                                registros: registros
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    } else {
                        const id_grupo = grupos[0].id_grupo
                        con.query('SELECT * FROM alumnos WHERE id_grupo = ?', [id_grupo], async (err, alumnos) => {
                            if (err) return console.log(err)
                            con.query('SELECT * FROM materias WHERE id_maestro = ?', [id], async (err, materias) => {
                                if (err) return console.log(err)
                                con.query('SELECT * FROM temas WHERE id_maestro = ?', [id], async (err, temas) => {
                                    if (err) return console.log(err)
                                    con.query('SELECT * FROM grupos WHERE id = ?', [id_grupo], async (err, grupos) => {
                                        if (err) return console.log(err)
                                        con.query('SELECT * FROM registros WHERE id_maestro = ?', [id], async (err, registros) => {
                                            if (err) return console.log(err)
                                            res.render('ver', {
                                                alumnos: alumnos,
                                                materias: materias,
                                                temas: temas,
                                                registros: registros
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    }
                }
            })
        }

    })
})

//ADMIN
app.get('/admin', (req, res) => {
    const mail = req.session.mail
    con.query('SELECT * FROM administradores WHERE mail = ?', [mail], async (err, admin) => {
        if (err) return console.log(err)
        if (admin.length == 0) return res.redirect('login')
        con.query('SELECT * FROM maestros', async (err, maestros) => {
            if (err) return console.log(err)
            con.query('SELECT * FROM coordinadores', async (err, coordinadores) => {
                if (err) return console.log(err)
                con.query('SELECT * FROM padres', async (err, padres) => {
                    if (err) return console.log(err)
                    con.query('SELECT * FROM administradores', async (err, admins) => {
                        if (err) return console.log(err)
                        res.render('ver_todo_admin', {
                            mail: mail,
                            maestros: maestros,
                            coordinadores: coordinadores,
                            padres: padres,
                            admins: admins
                        })
                    })
                })
            })
        })
    })
})

//HIJOS 
app.get('/ver_hijos', (req, res) => {
    var name = req.session.name
    con.query('SELECT * FROM padres WHERE name = ?', [name], async (err, padre) => {
        if (err) return console.log(err)
        if (padre.length == 0) return res.redirect('login')
        var id = padre[0].id
        con.query('SELECT id_alumno FROM asignacion_padres WHERE id_padre = ?', [id], async (err, alumnos_id) => {
            if (err) return console.log(err)
            if (alumnos_id.length == 0) {
                con.query('SELECT * FROM alumnos WHERE id = ?', [0], async (err, alumnos) => {
                    con.query('SELECT * FROM registros WHERE id_alumno = ?', [0], async (err, registros) => {
                        res.render('inicio-padres', {
                            alumnos: alumnos,
                            registros: registros
                        })
                    })
                })
            } else if (alumnos_id.length > 1) {
                var ids = []
                for (let i = 0; i < alumnos_id.length; i++) {
                    ids.push(alumnos_id[i].id_alumno)
                }
                con.query('SELECT * FROM alumnos WHERE id IN (' + ids + ')', async (err, alumnos) => {
                    if (err) return console.log(err)
                    con.query('SELECT * FROM registros WHERE id_alumno IN (' + ids + ')', async (err, registros) => {
                        res.render('inicio-padres', {
                            alumnos: alumnos,
                            registros: registros
                        })
                    })
                })
            }
            else {
                var id_hijo = alumnos_id[0].id_alumno
                con.query('SELECT * FROM alumnos WHERE id = ?', [id_hijo], async (err, alumnos) => {
                    con.query('SELECT * FROM registros WHERE id_alumno = ?', [id_hijo], async (err, registros) => {
                        res.render('inicio-padres', {
                            alumnos: alumnos,
                            registros: registros
                        })
                    })
                })
            }
        })
    })
})

//ELIMINAR ALUMNO
app.get('/eliminar_alumno/:id', (req, res) => {
    const id = req.params.id
    con.query('DELETE FROM alumnos WHERE id = ?', [id], async (err, results) => {
        if (err) return console.log(err)
        res.redirect('/ver_todo')
    })
})

app.get('/editar_alumno/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    con.query('UPDATE alumnos SET name = ? WHERE id = ?', [name, id], async (err, results) => {
        if (err) return console.log(err)
        res.redirect('/ver_todo')
    })
})


//ELIMINAR MATERIA 
app.get('/eliminar_materia/:id', (req, res) => {
    const id = req.params.id
    con.query('DELETE FROM materias WHERE id = ?', [id], async (err) => {
        if (err) return console.log(err)
        con.query('DELETE FROM temas WHERE id_materia = ?', [id], async (err) => {
            if (err) return console.log(err)
            res.redirect('/ver_todo')
        })
    })
})

app.get('/editar_materia/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    const mail = req.session.mail
    con.query('SELECT * FROM maestros WHERE mail = ?', [mail], async (err, maestro) => {
        if (err) return console.log(err)
        if (maestro.length == 0) res.redirect('login')
        var id_maestro = maestro[0].id
        con.query('SELECT * FROM materias WHERE name = ? AND id_maestro', [name, id_maestro], async (err, materia) => {
            if (materia.length > 0) return res.redirect('/ver_todo')
            con.query('UPDATE materias SET name = ? WHERE id = ?', [name, id], async (err) => {
                if (err) return console.log(err)
                con.query('UPDATE temas SET materia = ? WHERE id_materia = ?', [name, id], async (err) => {
                    res.redirect('/ver_todo')
                })
            })
        })
    })

})

//ELIMINAR TEMA
app.get('/eliminar_tema/:id', (req, res) => {
    const id = req.params.id
    con.query('DELETE FROM temas WHERE id = ?', [id], async (err) => {
        if (err) return console.log(err)
        res.redirect('/ver_todo')
    })
})

app.get('/editar_tema/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    con.query('UPDATE temas SET name = ? WHERE id = ?', [name, id], async (err) => {
        if (err) return console.log(err)
        res.redirect('/ver_todo')
    })
})

//ELIMINAR MAESTRO
app.get('/eliminar_maestro/:id', (req, res) => {
    const id = req.params.id
    con.query('DELETE FROM maestros WHERE id = ?', [id], async (err, results) => {
        if (err) return console.log(err)
        res.redirect('/admin')
    })
})

app.get('/editar_maestro/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    con.query('UPDATE maestros SET name = ? WHERE id = ?', [name, id], async (err, results) => {
        if (err) return console.log(err)
        con.query('UPDATE maestros SET lastname = ? WHERE id = ?', ['', id], async (err) => {
            if (err) return console.log(err)
            res.redirect('/admin')
        })

    })
})

//ELIMINAR COORDINADOR
app.get('/eliminar_coord/:id', (req, res) => {
    const id = req.params.id
    con.query('DELETE FROM coordinadores WHERE id = ?', [id], async (err, results) => {
        if (err) return console.log(err)
        res.redirect('/admin')
    })
})

app.get('/editar_coord/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    con.query('UPDATE coordinadores SET name = ? WHERE id = ?', [name, id], async (err, results) => {
        if (err) return console.log(err)
        con.query('UPDATE coordinadores SET lastname = ? WHERE id = ?', ['', id], async (err) => {
            if (err) return console.log(err)
            res.redirect('/admin')
        })
    })
})

//ELIMINAR PADRE
app.get('/eliminar_padre/:id', (req, res) => {
    const id = req.params.id
    con.query('DELETE FROM padres WHERE id = ?', [id], async (err, results) => {
        if (err) return console.log(err)
        res.redirect('/admin')
    })
})

app.get('/editar_padre/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    con.query('UPDATE padres SET name = ? WHERE id = ?', [name, id], async (err, results) => {
        if (err) return console.log(err)
        res.redirect('/admin')
    })
})

//ELIMINAR ADMIN
app.get('/eliminar_admin/:id', (req, res) => {
    const id = req.params.id
    con.query('DELETE FROM administradores WHERE id = ?', [id], async (err, results) => {
        if (err) return console.log(err)
        res.redirect('/admin')
    })
})

app.get('/editar_admin/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    con.query('UPDATE administradores SET name = ? WHERE id = ?', [name, id], async (err, results) => {
        if (err) return console.log(err)
        con.query('UPDATE administradores SET lastname = ? WHERE id = ?', ['', id], async (err) => {
            if (err) return console.log(err)
            res.redirect('/admin')
        })
    })
})

//AUTH PAGES
app.get('/', (req, res) => {
    if (req.session.loggedin2) {
        res.render('index', {
            login: true,
            name: req.session.name,
            lastname: req.session.lastname
        })
    } else {
        res.render('index', {
            login: false,
        })
    }
})

app.get('/inicio', (req, res) => {
    if (req.session.loggedin) {
        res.render('inicio', {
            login: true,
            name: req.session.name,
            lastname: req.session.lastname,
            mail: req.session.mail,
        })
    } else {
        res.redirect('login')
    }
})

app.get('/inicio-coordinadores', (req, res) => {
    if (req.session.loggedin2) {
        res.render('inicio-coordinadores', {
            login: true,
            name: req.session.name,
            lastname: req.session.lastname,
            mail: req.session.mail,
        })
    } else {
        res.redirect('login')
    }
})

app.get('/inicio-admins', (req, res) => {
    if (req.session.loggedin3) {
        res.render('inicio-admins', {
            name: req.session.name,
            lastname: req.session.lastname,
            mail: req.session.mail,
        })
    } else {
        res.redirect('login')
    }
})

app.get('/ver_todo_admins', (req, res) => {
    if (req.session.loggedin3) {
        res.render('ver_todo_admins', {
            name: req.session.name,
            lastname: req.session.lastname,
            mail: req.session.mail,
        })
    } else {
        res.redirect('login')
    }
})

app.get('/inicio-padres', (req, res) => {
    if (req.session.loggedin4) {
        res.render('inicio-padres', {
            name: req.session.name,
        })
    } else {
        res.redirect('login')
    }
})

app.get('/ver', (req, res) => {
    if (req.session.loggedin) {
        res.render('ver', {
            login: true,
        })
    } else {
        res.redirect('login')
    }
})

app.get('/crear', (req, res) => {
    if (req.session.loggedin) {
        res.render('crear')
    } else {
        res.redirect('login')
    }
})

app.get('/add', (req, res) => {
    if (req.session.loggedin2) {
        res.render('add', {
            login: true
        })
    } else {
        res.redirect('login')
    }
})

app.get('/to_assign', (req, res) => {
    if (req.session.loggedin2) {
        res.render('to_assign', {
            login: true
        })
    } else {
        res.redirect('login')
    }
})

app.get('/report', (req, res) => {
    if (req.session.loggedin) {
        res.render('report', {
            login: true
        })
    } else {
        res.redirect('login')
    }
})

app.get('/registration', (req, res) => {
    if (req.session.loggedin) {
        res.render('registration', {
            login: true
        })
    } else {
        res.redirect('login')
    }
})

app.get('/myaccountM', (req, res) => {
    if (req.session.loggedin) {
        res.render('myaccountM', {
            login: true,
            name: req.session.name,
            lastname: req.session.lastname,
            mail: req.session.mail,
            tel: req.session.tel
        })
    } else {
        res.redirect('login')
    }
})

app.get('/myaccountC', (req, res) => {
    if (req.session.loggedin2) {
        res.render('myaccountC', {
            login: true,
            name: req.session.name,
            lastname: req.session.lastname,
            mail: req.session.mail,
            tel: req.session.tel
        })
    } else {
        res.redirect('login')
    }
})

//LOG OUT
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})
//DELETE MAESTRO
app.get('/deleteM', (req, res) => {
    var mail = req.session.mail
    con.query('SELECT * FROM maestros WHERE mail = ?', [mail], async (err, maestro) => {
        if (err) return console.log(err)
        if (maestro.length == 0) {
            res.redirect('login')
        } else {
            const id = maestro[0].id
            con.query('DELETE FROM alumnos WHERE id_maestro = ?', [id], async (err) => {
                if (err) return console.log('alumnos' + err)
                con.query('DELETE FROM maestros WHERE mail = ?', [mail], async (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        req.session.destroy(() => {
                            res.render('index', {
                                login: false
                            })
                        })
                    }
                })
            })
        }
    })
})

//DELETE COORDINADOR
app.get('/deleteC', (req, res) => {
    var mail = req.session.mail
    con.query('DELETE FROM coordinadores WHERE mail = ?', [mail], async (err, results) => {
        if (err) return console.log(err)
        return req.session.destroy(() => {
            res.redirect('/')
        })
    })
})

//RECUPERAR CONTRASEÑA
app.post('/password', (req, res) => {
    con.query('CREATE TABLE IF NOT EXISTS codigos(code varchar(4), primary key(code))', (err) => {
        if (err) return console.log(err)
    })

    var mail = req.body.mail
    var code = Math.floor(Math.random() * 100) + 3522

    con.query('INSERT INTO codigos SET ?', {
        code: code
    }, async (err) => {
        if (err) {
            console.log(err)
        } else {
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'tlahuel.mendez.samuel.oswaldo@gmail.com',
                    pass: 'ltrvgaecpocdbzpi'
                }
            })

            var mailOptions = {
                from: 'Edukatec',
                to: mail,
                subject: 'Recuperar contraseña',
                html: `
                <table style="max-width: 600px padding: 10px margin:0 auto border-collapse: collapse">
                    <tr>
                        <td style="background-color: #ABEBC6">
                            <div style="color: #34495e margin: 4% 10% 2% text-align: justifyfont-family: sans-serif">
                                <h2 style="color: #F1C40F margin: 0 0 7px">Solicitud de recuperacion de contraseña</h2>
                                <p style="margin: 2px font-size: 15px">
                                    Se ha solicitado un codigo de recuperación de contraseña para este correo en nuestros
                                    servicios de Edukatec. Si no fuiste tu ignora este correo o <a> comunicate con nostros </a>
                                    <br>                            
                                    A continuacion digita el siguiente codigo en nuestra pagina para que podamos
                                    proceder al cambio de contraseña 
                                    <br>                         
                                    Tu codigo de recuperacion es: ` + "EDK-" + code + `                                                     
                                    <h3>No compartas este codigo con nadie </h3>
                                    </p>                                                                                               
                                <p style="color: #b3b3b3 font-size: 12px text-align: centermargin: 30px 0 0">Edukatec Mexico S.C.</p>
                            </div>
                        </td>
                    </tr>
                </table>  
                                   
                `,
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    res.redirect('forgot')
                }
            })
        }

    })

})

//PAGES
app.get('/abtus', (req, res) => {
    res.render('abtus')
})
app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/inicio', (req, res) => {
    res.render('inicio')
})

app.get('/inicio-coordinadores', (req, res) => {
    res.render('inicio-coordinadores')
})

app.get('/inicio-padres', (req, res) => {
    res.render('inicio-padres')
})

app.get('/inicio-admins', (req, res) => {
    res.render('inicio-admins')
})

app.get('/ver_todo_admins', (req, res) => {
    res.render('ver_todo_admins')
})


app.get('/myaccountM', (req, res) => {
    res.render('myaccountM')
})

app.get('/myaccountC', (req, res) => {
    res.render('myaccountC')
})

app.get('/ver', (req, res) => {
    res.render('ver')
})

app.get('/materias', (req, res) => {
    res.render('materias')
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.get('/to_asign', (req, res) => {
    res.render('to_asign')
})

app.get('/report', (req, res) => {
    res.render('report')
})

app.get('/registration', (req, res) => {
    res.render('registration')
})

app.get('/forgot', (req, res) => {
    res.render('forgot')
})