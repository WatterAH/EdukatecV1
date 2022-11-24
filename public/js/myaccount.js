function confirmarM() {
    Swal.fire({
        title: '¿Seguro que deseas eliminar tu cuenta?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Si deseo elimnarla',
        denyButtonText: `No, cambie de opinion`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Lamentamos que te vayas',
                text: 'Cuenta eliminada',
                showConfirmButton: false,
                timer: 2000,
                icon: 'success'
            }).then(() => {
                window.location = '/deleteM'
            })
        } else if (result.isDenied) {
            Swal.fire('Nos alegramos de que te quedaras!', '', 'info')
        }
    })
}
function confirmarC() {
    Swal.fire({
        title: '¿Seguro que deseas eliminar tu cuenta?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Si deseo elimnarla',
        denyButtonText: `No, cambie de opinion`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Lamentamos que te vayas',
                text: 'Cuenta eliminada',
                showConfirmButton: false,
                timer: 2000,
                icon: 'success'
            }).then(() => {
                window.location = '/deleteC'
            })
        } else if (result.isDenied) {
            Swal.fire('Nos alegramos de que te quedaras!', '', 'info')
        }
    })
}

function changeMail(mail) {

}