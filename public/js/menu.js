$(document).ready(main)

var cont = 1

function main() {
    $('.menu-bar').click(function () {
        if (cont === 1) {
            $('nav').animate({
                left: '0'
            })
            cont = 0
        } else {
            $('nav').animate({
                left: '-100%'
            })
            cont = 1
        }
    })
}

const logout = () => {
    Swal.fire({
        title: '¿Seguro que deseas cerrar sesión?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Adios!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Cerrando sesion...',
                text: 'Hasta la proxima!',
                showConfirmButton: false,
                timer: 1500,
                icon: 'success'
            }).then(() => {
                window.location = '/logout'
            })
        } 
    })
}