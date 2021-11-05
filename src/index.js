'use strict'

const SERVER = 'http://localhost:3000'
let typesOfFuel = []
let products = []

window.addEventListener('load', () => {
    getTypesOfFuel()

    document.getElementById('home').addEventListener('click', () => {
        document.getElementById('formData').classList.add('hide')
        document.getElementById('allProducts').classList.remove('hide')
    })
    document.getElementById('new-prod').addEventListener('click', () => {
        document.getElementById('formData').classList.remove('hide')
        document.getElementById('allProducts').classList.add('hide')
        removeReadOnly()
    })
    setListeners()
})

function getProducts() {
    const peticion = new XMLHttpRequest();
    peticion.open('GET', SERVER + '/products');
    peticion.send();
    peticion.addEventListener('load', () => {
      if (peticion.status === 200) {
        const datos = JSON.parse(peticion.responseText);
        products = datos
        renderProducts(datos)
      } else {
        reject("Error " + this.status + " (" + this.statusText + ") en la petición");
      }
    })
    peticion.addEventListener('error', () => reject('Error en la petición HTTP'));
}

function getTypesOfFuel() {
    const peticion = new XMLHttpRequest();
    peticion.open('GET', SERVER + '/typesOfFuel');
    peticion.send();
    peticion.addEventListener('load', () => {
      if (peticion.status === 200) {
        const datos = JSON.parse(peticion.responseText);
        typesOfFuel = datos
        getProducts()
        renderFuel()
      } else {
        reject("Error " + this.status + " (" + this.statusText + ") en la petición");
      }
    })
    peticion.addEventListener('error', () => reject('Error en la petición HTTP'));
}

function renderProducts(datos) {
    const productosDiv = document.getElementById('products')
    datos.forEach(producto => {
        let newProduct = document.createElement('div')
        newProduct.className='col mb-5'
        newProduct.innerHTML=`
            <div class="card h-100">
                <!-- Sale badge, sólo si está vendido-->
                ${producto.sale?'<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>':''}
                <!-- Product image-->
                <img class="card-img-top" src="${getImg(producto.img)}" alt="Imagen de _nombre_del_producto_" />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${producto.name}</h5>
                        <!-- Product reviews, un div bi-star para cada estrella a pintar-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            ${estrellas(producto.stars)}
                        </div>
                        <!-- Product price-->
                        ${showPrice(producto.original_price,producto.discount_price)}
                        <!-- Product details -->
                        <p>
                            ${tipoDeCombustible(producto.fuel)}<br>
                            ${producto.manual_gear?'Manual':'Automático'}
                            <br>${producto.km.toLocaleString()} km
                        </p>
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="mostrar btn btn-outline-dark mt-auto" href="#">Mostrar</a></div>
                </div>
            </div>
            `
        productosDiv.appendChild(newProduct)

        newProduct.querySelector('.mostrar').addEventListener('click', (event) => {
            event.preventDefault()
            showProduct(producto)
        })
    })
}
