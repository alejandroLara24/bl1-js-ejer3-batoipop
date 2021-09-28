'use strict'
products.forEach(producto => {
    let newProduct = document.createElement('div')
    newProduct.className='col mb-5'
    newProduct.innerHTML=`
        <div class="card h-100">
            <!-- Sale badge, sólo si está vendido-->
            ${producto.sale?'<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>':''}
            <!-- Product image-->
            ${(producto.img == null)?'<img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Imagen de _nombre_del_producto_" />':`<img class="card-img-top" src="media/photos/${producto.img}" alt="Imagen de _nombre_del_producto_" />`}
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
                    ${!(producto.discount_price == null)?`<span class="text-muted text-decoration-line-through">${producto.original_price} €</span>
                    ${producto.discount_price} €`:`${producto.original_price} €`}
                    <!-- Product details -->
                    <p>
                        ${tipoDeCombustible(producto.fuel)}<br>
                        ${producto.manual_gear?'Manual':'Automático'}
                        <br>${producto.km} km
                    </p>
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Mostrar</a></div>
            </div>
        </div>
        `
    document.getElementById('products').appendChild(newProduct)
});