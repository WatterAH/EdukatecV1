/* Swal.fire({
    title: 'Advertencia',
    text: 'Llena todos los datos marcados con un *',
    confirmButtonText: 'Lo tengo',
    icon: 'warning'
}) */

const Comprobar = () => {
    var pass = document.getElementById("pass")
    var confirm = document.getElementById("pass-confirm")
    var send = document.getElementById("send")
    var err = document.getElementById("err")
    send.disabled = true
    if (pass.value.length === 0 || confirm.value.length === 0) {
        err.innerHTML = "Las contraseñas no coinciden"
        err.style.color = "#E74C3C"
    } else if (pass.value !== confirm.value) {
        err.innerHTML = "Las contraseñas no coinciden"
        err.style.color = "#E74C3C"
    } else if (pass.value.length < 7) {
        err.innerHTML = "Esta contraseña es demasiado corta!"
        err.style.color = "#E74C3C"
    } else {
        err.innerHTML = "Las contraseñas coinciden"
        err.style.color = "#7DCEA0"
        send.disabled = false
    }
}
const Mail = () => {
    var mail = document.getElementById("mail")
    if (mail.value.length > 59) {
        Swal.fire({
            title: 'Advertencia',
            text: 'El correo que escribiste es demasiado largo',
            confirmButtonText: 'De acuerdo',
            icon: 'warning'
        })
    }
}
const Ver = () => {
    var pass = document.getElementById("pass");
    var confirm = document.getElementById("pass-confirm");
    var button = document.querySelector("#ver");
    pass.setAttribute('type', 'text');
    confirm.setAttribute('type', 'text');
    button.setAttribute("onclick", "Ocultar()");
}
const Ocultar = () => {
    var pass = document.getElementById("pass");
    var confirm = document.getElementById("pass-confirm");
    var button = document.querySelector("#ver");
    pass.setAttribute('type', 'password');
    confirm.setAttribute('type', 'password');
    button.setAttribute("onclick", "Ver()");
}


