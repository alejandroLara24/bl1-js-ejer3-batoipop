'use strict'

function tipoDeCombustible(id) {
    const item = typesOfFuel.find(item => item.id === id)
    return item ? item.fuel : "Desconocido"
}

function getImg(file) {
    return file ? 'media/photos/' + file : 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
}
function estrellas(numero) {
    let estrellasAMostrar = ''
    if (numero !== undefined) {
        for (let numeroEstrella = 0; numeroEstrella < numero; numeroEstrella++) {
            estrellasAMostrar+='<div class="bi-star-fill"></div>'
        }
        for (let numeroEstrella = 0; numeroEstrella < (5-numero); numeroEstrella++) {
            estrellasAMostrar+='<div class="bi-star"></div>'
            
        }
    } else {
        estrellasAMostrar = 
        '<div class="bi-star"></div>' +
         '<div class="bi-star"></div>' +
         '<div class="bi-star"></div>' +
         '<div class="bi-star"></div>' +
         '<div class="bi-star"></div>'
    }
    return estrellasAMostrar
}

function showPrice(price, discount_price) {
    if(discount_price) {
        return `<span class="text-muted text-decoration-line-through">${toCurrency(price)}</span>${toCurrency(discount_price)}`
    } else {
        return toCurrency(price)
    }
}

function toCurrency(price) {
    return price.toLocaleString() + ' €'
}

function showProduct(producto) {
    return console.log(producto)
}