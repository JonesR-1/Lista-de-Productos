// let datos = [
//     {
//         nombre: "Pepito Perez",
//         cargo: "Psicologo",
//         salario: 5000000
//     },
//     {
//         nombre: "Ana Alvarez",
//         cargo: "Programadora",
//         salario: 7000000
//     },
//     {
//         nombre: "Rolando Casas",
//         cargo: "Ingeniero Civil",
//         salario: 5500000
//     }
// ];

// //Guardar información en localStorage
// localStorage.setItem("empleados", JSON.stringify(datos));
// alert("Datos guardados con éxito 👍");

//Extraer la información de localStorage
// let empleados = JSON.parse(localStorage.getItem("empleados"));
// empleados.forEach((empleado)=>{
//     document.write(
//         `
//         <p>Nombre: ${empleado.nombre}</p>
//         <p>Cargo: ${empleado.cargo}</p>
//         <p>Salario: ${empleado.salario}</p>
//         <hr>
        
//         `
//     )
// });

// //Borrar datos
// localStorage.removeItem("empleados");
// alert("Lista de empleados borrada con éxito");

//Variables Globales
let nombrePro = document.querySelector(".nombre-pro");
let precioPro = document.querySelector(".precio-pro");
let descripcionPro = document.querySelector(".descripcion-pro");
let imagenPro = document.querySelector(".imagen-pro");
let btnGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table tbody");

//Agregarle evento al btn
btnGuardar.addEventListener("click", ()=>{
    // alert("Diste clic al boton");
    let datos = validarFormulario();
    if ( datos != null ){
        guardarDatos(datos);
    }
    borrarTabla();
    mostrarDatos();

});

//Función para validar los campos de texto y tomar los datos del formulario
function validarFormulario(){
    let datosForm;
    //Validar formulario
    if(nombrePro.value == "" || precioPro.value == "" || descripcionPro.value == "" || imagenPro.value == ""){
        alert("Todos los campos del formulario son obligatorios");
        return;
    }else{
        datosForm = {
            nombre: nombrePro.value,
            precio: precioPro.value,
            descripcion: descripcionPro.value,
            imagen: imagenPro.value
        }
    console.log(datosForm);

    nombrePro.value = "";
    precioPro.value = "";
    descripcionPro.value = "";
    imagenPro.value = "";

    return datosForm;
    }
}

//Función guardar datos en localStorage
const listadoPedidos = "Pedidos";
function guardarDatos(datos){
    let pedidos = [];
    //Extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //Validar los datos guardados previamente en el localStorage
    if (pedidosPrevios != null){
        pedidos = pedidosPrevios;
    }
    //Agregar el pedido nuevo al array
    pedidos.push(datos);
    //Guardar en localStorage
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    //Validar que los datos fueron guardados
    alert("Datos guardados con éxito");
}

//Función para guardar los datos en el localStorage
function mostrarDatos(){
    let pedidos = [];
    //Extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //Validar los datos guardados previamente en el localStorage
    if (pedidosPrevios != null){
        pedidos = pedidosPrevios;
    }

    // console.log(pedidos);
    //Mostrar los datos en la tabla
    pedidos.forEach((p,i)=>{
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${p.nombre} </td>
            <td> ${p.precio} </td>
            <td> ${p.descripcion} </td>
            <td> <img src=" ${p.imagen}" width="100px"> </td>
            <td>
                <span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning" title="Editar producto">📄</span>
                <span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger" title="Eliminar producto">✖️</span>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

//Quitar los datos de la tabla
function borrarTabla(){
    let filas = document.querySelectorAll(".table tbody tr");
    // console.log(filas);
    filas.forEach((f)=>{
        f.remove();
    });
}

//Función eliminar un pedido de la tabla
function eliminarPedido(pos){
    let pedidos = [];
    //Extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //Validar los datos guardados previamente en el localStorage
    if (pedidosPrevios != null){
        pedidos = pedidosPrevios;
    }
    
    //Confirmar pedido a eliminar
    let confirmar = confirm("¿Deseas eliminar el producto " +pedidos[pos].nombre+ "?");
    if(confirmar){
        // alert("Eliminaste el pedido");
        pedidos.splice(pos, 1);
        alert("Producto eliminado con éxito");
        //Guardar los datos que quedaron en localStorage
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
    }
}

//Actualizar pedido de localStorage
function actualizarPedido(pos) {
    let pedidos = [];
    //Extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //Validar los datos guardados previamente en el localStorage
    if (pedidosPrevios != null){
        pedidos = pedidosPrevios;
    }
    
    //Pasar los pedido al formulario para editarlos
    nombrePro.value = pedidos[pos].nombre;
    precioPro.value = pedidos[pos].precio;
    descripcionPro.value = pedidos[pos].descripcion;
    //Seleccionar el boton de actualziar
    let btnActualizar = document.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");
    //Agregar un evento al boton de actualizar
    btnActualizar.addEventListener("click", function(){
        pedidos[pos].nombre = nombrePro.value;
        pedidos[pos].precio = precioPro.value;
        pedidos[pos].descripcion = descripcionPro.value;
        //Guardar los datos editados en el localStorage
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        alert("¡El dato fue actualizado con éxito!");

        nombrePro.value = "";
        precioPro.value = "";
        descripcionPro.value = "";
        imagenPro.value = "";

        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none");

        borrarTabla();
        mostrarDatos();
    });
}

//Mostrar los datos de localStorage al recargar la página
document.addEventListener("DOMContentLoaded", function(){
    borrarTabla();
    mostrarDatos();
});

// Mostrar los datos de localStorage al recargar la página
document.addEventListener("DOMContentLoaded", function() {
    borrarTabla();
    mostrarDatos();

    // Evento para exportar a PDF
document.getElementById("exportarPDF").addEventListener("click", function() {
    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definir los datos para la tabla (obtenidos desde el localStorage)
    let pedidos = JSON.parse(localStorage.getItem(listadoPedidos)) || [];

    // Título del PDF
    doc.text("Listado de Productos", 14, 10);

    // Establecer las posiciones iniciales y el tamaño de la fuente
    let yPos = 20; // Posición vertical inicial
    doc.setFontSize(10);

    // Encabezados de la tabla
    doc.text('#', 10, yPos);
    doc.text('Nombre', 20, yPos);
    doc.text('Precio', 80, yPos);
    doc.text('Descripción', 120, yPos);
    doc.text('Imagen', 180, yPos);

    yPos += 10; // Aumentar la posición para la siguiente fila

    // Recorrer los productos y añadirlos a la tabla
    pedidos.forEach((p, index) => {
        doc.text((index + 1).toString(), 10, yPos);
        doc.text(p.nombre, 20, yPos);
        doc.text(p.precio.toString(), 80, yPos);
        doc.text(p.descripcion, 120, yPos);
        doc.text(p.imagen, 180, yPos); // Puede ser una URL de imagen, dependiendo de lo que quieras mostrar
        yPos += 10; // Avanzar a la siguiente línea
    });

    // Descargar el PDF
    doc.save('productos.pdf');
});

});


//Buscar producto
let filtrar = document.querySelector("#buscarProducto");

filtrar.addEventListener("keyup",()=>{
    let consulta = filtrar .value.toLowerCase();
    buscarProducto(consulta);
});

//Función para buscar productos
function buscarProducto(consulta) {
    borrarTabla(); //Limpia la tabla antes de mostrar los resultados
    let pedidos = JSON.parse(localStorage.getItem(listadoPedidos)) || [];
    
    //Filtra los productos que coinciden con la búsqueda
    let resultados = pedidos.filter(p => 
        p.nombre.toLowerCase().includes(consulta) || p.descripcion.toLowerCase().includes(consulta));

    //Muestra los resultados filtrados
    resultados.forEach((p, i)=>{
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${p.nombre} </td>
            <td> ${p.precio} </td>
            <td> ${p.descripcion} </td>
            <td> <img src="${p.imagen}" width="100px"> </td>
            <td>
                <span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning" title="Editar producto">📄</span>
                <span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger" title="Eliminar producto">✖️</span>
            </td>
        `;
        tabla.appendChild(fila);
    });
}