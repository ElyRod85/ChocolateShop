const productsPerPage = 15; // Number of products to display per page
let currentPage = 1; // Initial current page
let productsData = []; // Array to store all the product data

fetch('products/marroc.json')
    .then(response => response.json())
    .then(data => {
        productsData = data; // Store all the product data in the array

        const productList = document.getElementById('product-list');
        const loadMoreButton = document.getElementById('load-more');
        const toggleSoldOutButton = document.getElementById('toggle-sold-out');
        let showSoldOutProducts = true; // Flag to keep track of whether to show sold out products or not

        // Function to display products for the current page
        const displayProducts = (page) => {
            const startIndex = (page - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const currentPageProducts = productsData.slice(startIndex, endIndex);
        
            // Separate the available and sold-out products
            const availableProducts = currentPageProducts.filter(product => product.available);
            const soldOutProducts = currentPageProducts.filter(product => !product.available);
        
            const allProducts = [...availableProducts, ...soldOutProducts];
        
            allProducts.forEach(product => {
                // Create product element
                const productElement = document.createElement('div');
                productElement.classList.add('product-item');
        
                if (product.available) {
                    // Display available products
                    let priceHTML = `<p class="price">$${product.price}</p>`;
        
                    // Check if the product has a discount
                    if (product.discount > 0) {
                        const discountedPrice = product.price - (product.price * (product.discount / 100));
        
                        priceHTML = `
                            <p class="discount-tag">-${product.discount}%</p>
                            <div class="prices">
                                <p class="old-price">$${product.price}</p>
                                <p class="new-price">$${discountedPrice.toFixed(2)}</p>
                            </div>
                        `;
                    }
        
                    productElement.innerHTML = `
                        <p class="product-title">${product.name}</p>
                        <p class="cantidad">${product.quantity}</p>
                        <img src="${product.image}" alt="${product.name}">
                        ${priceHTML}
                        <a href="#" class="product-details" data-toggle="modal" data-target="#modalDetalles-${product.name}">Detalles <i class="fa-solid fa-chevron-right"></i></a>
                        <a href="#" class="add-to-cart">Agregar al carrito</a>

                        <div class="modal fade details-modal" id="modalDetalles-${product.name}" tabindex="-1" role="dialog" aria-labelledby="Reservar" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="Detalles">${product.name}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                        <div class="product-detail">
                                            <div class="details">
                                                <p>${product.description}</p>
                                                <p>Este producto contiene ${product.quantity}.</p>
                                                <p class="price">Precio: ${priceHTML}</p>
                                            </div>
                                            <div class="main-img">
                                                <img src="${product.image}" alt="${product.name}">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary close-button" data-dismiss="modal">Cerrar</button>
                                        <button type="button" class="btn btn-primary add-to-cart" data-dismiss="modal">Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    `;
                } else {
                    // Display sold-out products
                    productElement.classList.add('sold-out');
        
                    productElement.innerHTML = `
                        <p class="product-title">${product.name}</p>
                        <p class="cantidad">${product.quantity}</p>
                        <img src="${product.image}" alt="${product.name}" class="sold-out-img">
                        <p class="price">$${product.price}</p>
                        <p class="sold-out">Agotado</p>
                        <a href="#" class="add-to-cart" data-toggle="modal" data-target="#modalReservas-${product.name}">Reservar <i class="fa-regular fa-clock"></i></a>

                        <div class="modal fade reservations-modal" id="modalReservas-${product.name}" tabindex="-1" role="dialog" aria-labelledby="Reservar" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="Reservar">Reservar ${product.name}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"><i class="fa-solid fa-xmark"></i></span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Ingrese su e-mail para recibir una notificación cuando este producto se encuentre disponible nuevamente:</p>
                                        <form class="reservas">
                                            <input type="email" placeholder="Ingrese su e-mail" name="email">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                                <label class="form-check-label" for="defaultCheck1">
                                                    Deseo suscribirme a la newsletter de Felfort
                                                </label>
                                                </div>
                                            <button type="submit">Notificarme</button>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    `;
                }
        
                productList.appendChild(productElement);
            });
        };
        
        // Function to load more products
        const loadMoreProducts = () => {
            currentPage++;
            displayProducts(currentPage);
        
            // Hide the load more button if all products have been displayed
            if (currentPage >= Math.ceil(productsData.length / productsPerPage)) {
                loadMoreButton.style.display = 'none';
            }
        };
        
        // Function to toggle the display of sold out products
        const toggleSoldOutProducts = () => {
            const soldOutProducts = document.querySelectorAll('.product-item.sold-out');
        
            showSoldOutProducts = !showSoldOutProducts; // Toggle the flag
        
            soldOutProducts.forEach(product => {
                product.style.display = showSoldOutProducts ? 'flex' : 'none';
            });
        
            // Toggle button text
            toggleSoldOutButton.innerHTML = showSoldOutProducts ? 'Ocultar agotados <i class="fa-solid fa-eye-slash"></i>' : 'Mostrar agotados <i class="fa-solid fa-eye"></i>';
        };
        
        loadMoreButton.addEventListener('click', loadMoreProducts);
        toggleSoldOutButton.addEventListener('click', toggleSoldOutProducts);
        
        // Display initial products
        displayProducts(currentPage);
    });
