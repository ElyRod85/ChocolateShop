const productsPerPage = 15; // Number of products to display per page
let currentPage = 1; // Initial current page
let productsData = []; // Array to store all the product data

fetch('products/bombones.json')
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
                        <a href="producto.html" class="product-details">Detalles <i class="fa-solid fa-chevron-right"></i></a>
                        <a href="#" class="add-to-cart">Agregar al carrito</a>
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
                        <a href="reservar.html" class="add-to-cart">Reservar <i class="fa-regular fa-clock"></i></a>
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
