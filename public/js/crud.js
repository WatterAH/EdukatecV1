function confirmar_alumno(id, name) {
    Swal.fire({
        title: '¿Eliminar registro?',
        text: 'Alumno: ' + name,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Eliminalo!',
        denyButtonText: 'No eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/eliminar_alumno/' + id
        }
    })
}

function editar_alumno(id, name) {
    Swal.fire({
        title: 'Editar',
        text: 'Registro numero: ' + id,
        input: "text",
        inputValue: name,
        showCancelButton: true,
        confirmButtonText: 'Editar!',
        inputValidator: (value) => {
            if (!value) {
                return 'Escribe algo!'
            } else {
                console.log(value, id)
                window.location = '/editar_alumno/' + id + '/' + value

            }
        }
    })
}

function confirmar_materia(id, name) {
    Swal.fire({
        title: '¿Eliminar registro?',
        text: 'Materia: ' + name,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Eliminala!',
        denyButtonText: 'No eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/eliminar_materia/' + id
        }
    })
}

function editar_materia(id, name) {
    Swal.fire({
        title: 'Editar',
        text: 'Registro numero: ' + id,
        input: "text",
        inputValue: name,
        showCancelButton: true,
        confirmButtonText: 'Editar!',
        inputValidator: (value) => {
            if (!value) {
                return 'Escribe algo!'
            } else {
                console.log(value, id)
                window.location = '/editar_materia/' + id + '/' + value

            }
        }
    })
}

function confirmar_tema(id, name) {
    Swal.fire({
        title: '¿Eliminar registro?',
        text: 'Tema: ' + name,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Eliminalo!',
        denyButtonText: 'No eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/eliminar_tema/' + id
        }
    })
}

function editar_tema(id, name) {
    Swal.fire({
        title: 'Editar',
        text: 'Registro numero: ' + id,
        input: "text",
        inputValue: name,
        showCancelButton: true,
        confirmButtonText: 'Editar!',
        inputValidator: (value) => {
            if (!value) {
                return 'Escribe algo!'
            } else {
                console.log(value, id)
                window.location = '/editar_tema/' + id + '/' + value

            }
        }
    })
}

function confirmar_maestro(id, name) {
    Swal.fire({
        title: '¿Eliminar registro?',
        text: 'Maestro: ' + name,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Eliminalo!',
        denyButtonText: 'No eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/eliminar_maestro/' + id
        }
    })
}

function editar_maestro(id, name, lastname) {
    Swal.fire({
        title: 'Editar',
        text: 'Registro numero: ' + id,
        input: "text",
        inputValue: name + " " + lastname,
        showCancelButton: true,
        confirmButtonText: 'Editar!',
        inputValidator: (value) => {
            if (!value) {
                return 'Escribe algo!'
            } else {
                console.log(value, id)
                window.location = '/editar_maestro/' + id + '/' + value
            }
        }
    })
}

function confirmar_coord(id, name) {
    Swal.fire({
        title: '¿Eliminar registro?',
        text: 'Coordinador: ' + name,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Eliminalo!',
        denyButtonText: 'No eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/eliminar_coord/' + id
        }
    })
}

function editar_coord(id, name, lastname) {
    Swal.fire({
        title: 'Editar',
        text: 'Registro numero: ' + id,
        input: "text",
        inputValue: name + " " + lastname,
        showCancelButton: true,
        confirmButtonText: 'Editar!',
        inputValidator: (value) => {
            if (!value) {
                return 'Escribe algo!'
            } else {
                console.log(value, id)
                window.location = '/editar_coord/' + id + '/' + value
            }
        }
    })
}

function confirmar_padre(id, name) {
    Swal.fire({
        title: '¿Eliminar registro?',
        text: 'Padre: ' + name,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Eliminalo!',
        denyButtonText: 'No eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/eliminar_padre/' + id
        }
    })
}

function editar_padre(id, name, lastname) {
    Swal.fire({
        title: 'Editar',
        text: 'Registro numero: ' + id,
        input: "text",
        inputValue: name + " " + lastname,
        showCancelButton: true,
        confirmButtonText: 'Editar!',
        inputValidator: (value) => {
            if (!value) {
                return 'Escribe algo!'
            } else {
                console.log(value, id)
                window.location = '/editar_padre/' + id + '/' + value
            }
        }
    })
}

function confirmar_admin(id, name) {
    Swal.fire({
        title: '¿Eliminar registro?',
        text: 'Administrador: ' + name,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Eliminalo!',
        denyButtonText: 'No eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/eliminar_admin/' + id
        }
    })
}

function editar_admin(id, name, lastname) {
    Swal.fire({
        title: 'Editar',
        text: 'Registro numero: ' + id,
        input: "text",
        inputValue: name + " " + lastname,
        showCancelButton: true,
        confirmButtonText: 'Editar!',
        inputValidator: (value) => {
            if (!value) {
                return 'Escribe algo!'
            } else {
                console.log(value, id)
                window.location = '/editar_admin/' + id + '/' + value
            }
        }
    })
}