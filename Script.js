const ProductNames = [
    "Sekiro: Shadows Die Twice", 
    "Elden Ring", 
    "Dark Souls III", 
    "The Witcher 3: Wild Hunt", 
    "God of War", 
    "Horizon Zero Dawn", 
    "Assassin's Creed Valhalla", 
    "Final Fantasy VII Remake", 
    "Animal Crossing: New Horizons"
];

const ProductDescriptions = [
    "Un juego de acción y aventuras en tercera persona que sigue a un guerrero solitario en su búsqueda de venganza.", 
    "Un juego de rol de acción en un mundo abierto, donde los jugadores exploran tierras llenas de misterios y enemigos desafiantes.", 
    "Un juego de rol de acción con un alto nivel de dificultad, donde los jugadores deben enfrentarse a poderosos jefes y explorar un mundo oscuro.", 
    "Un RPG de acción donde juegas como Geralt de Rivia, un cazador de monstruos en busca de su hija adoptiva.", 
    "Un juego de acción y aventuras que sigue la historia de Kratos, mientras entrena a su hijo y se enfrenta a dioses nórdicos.", 
    "Un RPG de acción en un mundo post-apocalíptico, donde los jugadores deben cazar máquinas en un entorno impresionante.", 
    "Un juego de rol de acción que sigue a Eivor, un vikingo en su viaje para establecer un nuevo hogar en Inglaterra.", 
    "Un remake del clásico RPG que narra la historia de Cloud Strife y su lucha contra la corporación Shinra.", 
    "Un simulador de vida donde los jugadores pueden crear su propia isla y interactuar con encantadores personajes."
];

const ProductPrices = [
    59.99, 
    69.99, 
    49.99, 
    39.99, 
    49.99, 
    44.99, 
    59.99, 
    69.99, 
    59.99
];  


$(document).ready(function(){
    $('#generarFacturaButton').on('click', function() {
        generarFactura();
    });
    //Modificar Datos de las tarjetas existentes----------
    const tarjetas = $(".Tarjetas");
    tarjetas.each(function(index){
        if (index < ProductNames.length){
            $(this).find("#miEncabezado").text(ProductNames[index]);
            $(this).find("p:nth-of-type(1)").text(ProductDescriptions[index]);
            $(this).find("p:nth-of-type(2) span").text(ProductPrices[index]);
        }
    })

    $(".BuyButton").on("click", function() {
        const productName = $(this).data("name");
        const productPrice = $(this).data("price");
        Comprar(productName, productPrice);
    });
});


function Comprar(productName, productPrice) {
    let nuevoElemento = document.createElement('p');
    nuevoElemento.textContent = `${productName} - Precio: ${productPrice.toFixed(2)} $`; 

    // Crear el botón de eliminar
    const eliminarBoton = document.createElement('button');
    eliminarBoton.textContent = "Eliminar";
    eliminarBoton.className = "BuyButton boton-eliminar"; 
    eliminarBoton.onclick = function() {
        eliminarProducto(nuevoElemento, productPrice);
    };

    // Agregar el botón de eliminar al nuevo elemento
    nuevoElemento.appendChild(eliminarBoton);

    // Agregar el nuevo elemento antes del total
    const container = document.getElementById('Container');
    const totalElement = document.getElementById('total');
    container.insertBefore(nuevoElemento, totalElement);  // Insertar antes del total

    // Actualizar el total
    actualizarTotal(productPrice);
}

function eliminarProducto(elemento, productPrice) {
    // Actualizar el total
    actualizarTotal(-productPrice);  // Restar el precio del total
    elemento.remove();  // Eliminar el elemento del carrito
}
function actualizarTotal(price) {
    const totalElement = document.getElementById('total');
    let currentTotal = parseFloat(totalElement.textContent.split(': ')[1]);  // Obtener el total actual
    currentTotal += price;  // Sumar el nuevo precio
    totalElement.textContent = `Total: ${currentTotal.toFixed(2)} $`;  // Mostrar el nuevo total con dos decimales
    
}
// Función para calcular el descuento y generar la factura
function generarFactura() {
    const totalElement = document.getElementById('total');
    let currentTotal = parseFloat(totalElement.textContent.split(': ')[1]);

    // Calcular el descuento: 5% por cada $1000
    let descuento = Math.floor(currentTotal / 1000) * 0.05 * currentTotal;
    let totalConDescuento = currentTotal - descuento;

    // Generar la factura con los valores originales y con descuento
    alert(`Factura:
    Total original: ${currentTotal.toFixed(2)} $
    Descuento aplicado: ${descuento.toFixed(2)} $
    Total final: ${totalConDescuento.toFixed(2)} $`);
}
