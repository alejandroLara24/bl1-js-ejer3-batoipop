'use strict'

function tipoDeCombustible(id) {
    return typesOfFuel.find(item => item.id === id).fuel
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
