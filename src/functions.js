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
        return `<span class="text-muted text-decoration-line-through">${toCurrency(price)}</span> ${toCurrency(discount_price)}`
    } else {
        return toCurrency(price)
    }
}

function putFuelCategory() {
    document.getElementById('inputFuel').innerHTML =
        typesOfFuel.forEach(element => {
            `<option id='fuel-${element.id}'>${element.fuel}</option>`
        });
}

function toCurrency(price) {
    return price.toLocaleString() + ' €'
}

function showProduct(producto) {
    document.getElementById('formData').classList.remove('hide')
    document.getElementById('allProducts').classList.add('hide')
    const name = document.getElementById('inputName')
    const original_price = document.getElementById('inputOriginalPrice')
    const discount_price = document.getElementById('inputDiscountPrice')
    const km = document.getElementById('inputKm')
    const stars = document.getElementById('starsRange')
    name.setAttribute('value',producto.name)
    original_price.setAttribute('value',producto.original_price)
    discount_price.setAttribute('value',producto.discount_price)
    km.setAttribute('value',producto.km)
    if (producto.stars) {
        stars.setAttribute('value',producto.stars)
    } else {
        stars.setAttribute('value',0)
    }
    name.setAttribute('readonly',true)
    original_price.setAttribute('readonly',true)
    discount_price.setAttribute('readonly',true)
    km.setAttribute('readonly',true)
    stars.setAttribute('disabled',true)
}

function removeReadOnly() {
    const name = document.getElementById('inputName')
    const original_price = document.getElementById('inputOriginalPrice')
    const discount_price = document.getElementById('inputDiscountPrice')
    const km = document.getElementById('inputKm')
    const stars = document.getElementById('starsRange')
    name.setAttribute('value','')
    original_price.setAttribute('value','')
    discount_price.setAttribute('value','')
    km.setAttribute('value','')
    stars.setAttribute('value','')
    name.removeAttribute('readonly')
    original_price.removeAttribute('readonly')
    discount_price.removeAttribute('readonly')
    km.removeAttribute('readonly')
    stars.removeAttribute('disabled')
}

function renderFuel() {
    const select = document.getElementById('inputFuel')
    typesOfFuel.forEach(typeFuel => select.add(new Option(typeFuel.fuel,typeFuel.id)))
}

function setListeners() {
    const newProdForm = document.getElementById('product')
    const inputs = document.getElementsByTagName('input')
    newProdForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const nameInput = document.getElementById('inputName')
        checkInputValidation(nameInput)
        if (nameInput.checkValidity()) {
            if (isUsedName(nameInput.value)) {
                nameInput.setCustomValidity('Ese nombre ya está en uso')
                renderInputError(nameInput)
            }
        }
        checkInputValidation(document.getElementById('inputOriginalPrice'))
        checkInputValidation(document.getElementById('inputDiscountPrice'))
        checkInputValidation(document.getElementById('inputKm'))

        if (!newProdForm.checkValidity()) {
            return
        }

        var http = new XMLHttpRequest();
        let insertProduct = {
            "name": String(document.getElementById('inputName').value), 
            "km": Number(document.getElementById('inputKm').value), 
            "original_price": Number(document.getElementById('inputOriginalPrice').value), 
            "discount_price": Number(document.getElementById('inputDiscountPrice').value), 
            "stars": Number(document.getElementById('starsRange').value), 
            "sale": false, 
            "fuel": Number(document.getElementById('inputFuel').value), 
            "manual_gear": Boolean(document.querySelector('input[name=gear]:checked').value), 
            "img": String(document.getElementById('inputPhoto').value)
        }
        http.open('POST', 'http://localhost:3000/products');
        http.setRequestHeader('content-type', 'application/json');
        http.send(JSON.stringify(insertProduct));
        http.addEventListener('load', () => {
            if (http.status === 200) {
              console.log("Enviado con exito")
            } else {
              reject("Error " + this.status + " (" + this.statusText + ") en la petición");
            }
        })
        http.addEventListener('error', () => reject('Error en la petición HTTP'));
    
    })
    
    document.getElementById('inputName').addEventListener('blur', (event) => {
        event.preventDefault()
        document.getElementById('errorName').innerHTML = inputs[0].validationMessage
    }, true)
    document.getElementById('inputOriginalPrice').addEventListener('blur', (event) => {
        event.preventDefault()
        document.getElementById('errorOriginal').innerHTML = inputs[1].validationMessage
    }, true)
    document.getElementById('inputDiscountPrice').addEventListener('blur', (event) => {
        event.preventDefault()
        document.getElementById('errorDiscount').innerHTML = inputs[2].validationMessage
    }, true)
    document.getElementById('inputKm').addEventListener('blur', (event) => {
        event.preventDefault()
        document.getElementById('errorKm').innerHTML = inputs[7].validationMessage
    }, true)
}

function checkInputValidation(input) {
    input.setCustomValidity('')
    renderInputError(input)
}

function renderInputError(input) {
    const errorSpan = input.nextElementSibling
    errorSpan.innerHTML = input.validationMessage
}

function isUsedName(name) {
    const prodFinded = products.find((prod) => prod.name === name)
    return (prodFinded)
}