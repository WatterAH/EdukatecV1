
const change_pupil = () => {
    var div = document.getElementById("div-crear-alumno")
    var div2 = document.getElementById("div-crear-padre")
    var div3 = document.getElementById("div-crear-grupo")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
}
const change_group = () => {
    var div = document.getElementById("div-crear-grupo")
    var div2 = document.getElementById("div-crear-alumno")
    var div3 = document.getElementById("div-crear-padre")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
}
const change_tutor = () => {
    var div = document.getElementById("div-crear-padre")
    var div2 = document.getElementById("div-crear-alumno")
    var div3 = document.getElementById("div-crear-grupo")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
}
const change_alumn = () => {
    var div = document.getElementById("div-asignar-grupos")
    var div2 = document.getElementById("div-asignar-hijos")
    var div3 = document.getElementById("div-asignar-maestros")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
}
const change_son = () => {
    var div = document.getElementById("div-asignar-hijos")
    var div2 = document.getElementById("div-asignar-grupos")
    var div3 = document.getElementById("div-asignar-maestros")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
}

const change_teacher = () => {
    var div = document.getElementById("div-asignar-maestros")
    var div2 = document.getElementById("div-asignar-hijos")
    var div3 = document.getElementById("div-asignar-grupos")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
}

const change_alumns = () => {
    var div = document.getElementById("alumnos")
    var div2 = document.getElementById("materias")
    var div3 = document.getElementById("temas")
    var div4 = document.getElementById("registros")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
    div4.style.display = "none"
}

const change_subjects = () => {
    var div = document.getElementById("materias")
    var div2 = document.getElementById("alumnos")
    var div3 = document.getElementById("temas")
    var div4 = document.getElementById("registros")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
    div4.style.display = "none"
}

const change_topics = () => {
    var div = document.getElementById("temas")
    var div2 = document.getElementById("materias")
    var div3 = document.getElementById("alumnos")
    var div4 = document.getElementById("registros")

    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
    div4.style.display = "none"
}

const change_regs = () => {
    var div = document.getElementById("registros")
    var div2 = document.getElementById("materias")
    var div3 = document.getElementById("temas")
    var div4 = document.getElementById("alumnos")
    
    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
    div4.style.display = "none"
}

const change_subject = () => {
    var div = document.getElementById("div-crear-materia")
    var div2 = document.getElementById("div-crear-tema")

    div.style.display = "block"
    div2.style.display = "none"
}

const change_topic = () => {
    var div = document.getElementById("div-crear-tema")
    var div2 = document.getElementById("div-crear-materia")

    div.style.display = "block"
    div2.style.display = "none"
}

const ad_maestro = () => {
    var div = document.getElementById("maestros")
    var div2 = document.getElementById("coordinadores")
    var div3 = document.getElementById("padres")
    var div4 = document.getElementById("admins")
    
    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
    div4.style.display = "none"
}

const ad_coord = () => {
    var div = document.getElementById("coordinadores")
    var div2 = document.getElementById("maestros")
    var div3 = document.getElementById("padres")
    var div4 = document.getElementById("admins")
    
    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
    div4.style.display = "none"
}

const ad_padre = () => {
    var div = document.getElementById("padres")
    var div2 = document.getElementById("coordinadores")
    var div3 = document.getElementById("maestros")
    var div4 = document.getElementById("admins")
    
    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
    div4.style.display = "none"
}

const ad_ad = () => {
    var div = document.getElementById("admins")
    var div2 = document.getElementById("coordinadores")
    var div3 = document.getElementById("padres")
    var div4 = document.getElementById("maestros")
    
    div.style.display = "block"
    div2.style.display = "none"
    div3.style.display = "none"
    div4.style.display = "none"
}

const change_hijos = () => {
    var div = document.getElementById("alumnos")
    var div2 = document.getElementById("registros")

    div.style.display = "block"
    div2.style.display = "none"
}

const change_regs_hijos = () => {
    var div = document.getElementById("registros")
    var div2 = document.getElementById("alumnos")

    div.style.display = "block"
    div2.style.display = "none"
}