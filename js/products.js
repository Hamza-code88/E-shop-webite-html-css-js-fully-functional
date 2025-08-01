
const products = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        category: 'electronics',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MTyRGOeT3mAln-kz6dwSthu1Jpi0dcG77A&s',
        rating: 4.5,
        stock: 15,
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJdIzTd6KDwGlkFhOqfga_-_agcTlfj9TvsNQRWvlBPJIIR1yfXGojFIOkNkAOjQ1qJDo&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2Sq8gccPnsslS8LCw5hmkkO21rMip1ikfXFW6_HTU59OfqqusABl3MVDbj6XcRj1BrE&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWCXyoCDYMjG2KcorW2M0DxfU2sZb6H-_ZdxRLQlv2Q838lifNPRQ8Y829Y6KVljIGswk&usqp=CAU'
        ]
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 199.99,
        description: 'Feature-rich smartwatch with health monitoring and smartphone notifications.',
        category: 'electronics',
        image: 'https://fonepro.pk/wp-content/uploads/Starmax-Product-Range-Summer-2024-2.png',
        rating: 4.2,
        stock: 8,
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz5qG3kMW46bXtj3oMeHHgQI54xbKqxko6rcA01kH_55hhRYIuBXnSCT_PSD-t4Hl6R-I&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR22Jh-Eg_vaLKKdhYoyWjMgI3vsdv7-cV4R-xEdNmPuXiP2BuByy6x8Mea-vdf9Guiku0&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSQSkV4eD2l1gNcd_Rod2vnWZvEkoQ02vchg&s'
        ]
    },
    {
        id: '3',
        name: 'Cotton T-Shirt',
        price: 24.99,
        description: 'Comfortable 100% cotton t-shirt available in multiple colors.',
        category: 'clothing',
        image: 'https://i.pinimg.com/236x/a1/7e/23/a17e23192907c8bfed8d6cb6923107e0.jpg',
        rating: 4.0,
        stock: 42,
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFy1lLwEXwnGTBCPMYNuHJ_UXS5O6oJGQUdiQLKrpSuzjw99PMs4nFPAFrSZxpVFZFYFE&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzcDBKFogMSeBsy-eeTx9loBIYbcv7AkDvGnZL0STmPgx9FZsKZaB6YXGr-jQ7i0nVp4&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOvJUy7D0R4zWMgtisJQiucdM2kx11g7A8-Q&s'
        ]
    },
    {
        id: '4',
        name: 'Blender',
        price: 49.99,
        description: 'Powerful blender for smoothies, soups, and more with easy-clean design.',
        category: 'home',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvgCIZ6RvUUfbeVtWmJTKWDwTesPIfQFmPeA&s',
        rating: 4.3,
        stock: 12,
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFN-1SAHkCqot4z3szkgAQcaQu8Tv-KkJaOg&s',
            'https://images.olx.com.pk/thumbnails/554968085-600x450.jpeg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQL_54ISna-dBYSn-jmMXNKz4rF7czCgCbPw&s'
        ]
    },
    {
        id: '5',
        name: 'Running Shoes',
        price: 89.99,
        description: 'Lightweight running shoes with cushioned soles for maximum comfort.',
        category: 'clothing',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgIxGE9s8f65fL8tYB8-jZJ94eC7HXXtcOVg&s',

        rating: 4.7,
        stock: 20,
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD7cGfNSIcpvXwB0EjY26dTLeqNwrg6nJdOw&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzNZGVhyWHjlOtU_pVjAE8lW3sZlhTjO79JpGvEKC5Dy6SMUgim8Bge4SpukXx03uy8A8&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzNZGVhyWHjlOtU_pVjAE8lW3sZlhTjO79JpGvEKC5Dy6SMUgim8Bge4SpukXx03uy8A8&usqp=CAU'
        ]
    },
    {
        id: '6',
        name: 'Coffee Maker',
        price: 79.99,
        description: 'Programmable coffee maker with thermal carafe and built-in grinder.',
        category: 'home',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3pMfpVcNaoDnBgtk2G9z3cjPTSktjs18J9g&s',

        rating: 4.4,
        stock: 7,
        images: [
           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8iMbwEtSmS9xa8VIk6EeVP5fPHS-gBY60GWpSs_eePDRIG-KRguHtJkBauFyrNSeEdLI&usqp=CAU',
           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vdeztDTvvS8gU25L-BdD3ZCZHh_1T-CmGBVLoHt-qfl1YaTUcJuqXg0tw7F9DyBP404&usqp=CAU',
           'https://static-01.daraz.pk/p/7958e77e8df281b184149015951db175.jpg'
        ]
    }
];

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">${formatPrice(product.price)}</div>
                <div class="rating">${renderRatingStars(product.rating)}</div>
            </a>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');
    
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-id');
            addToCart(productId, 1);
            updateCartCount();
            alert('Product added to cart!');
        });
    });
}


function loadAllProducts() {
    const productsContainer = document.getElementById('products-grid');
    if (!productsContainer) return;
    
   
    const categoryFilter = document.getElementById('category-filter').value;
    const sortBy = document.getElementById('sort-by').value;
    
 
    let filteredProducts = [...products];
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }
    
    
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            
            break;
    }
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p>No products found in this category.</p>';
        return;
    }
    
    productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">${formatPrice(product.price)}</div>
                <div class="rating">${renderRatingStars(product.rating)}</div>
            </a>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');
    
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-id');
            addToCart(productId, 1);
            updateCartCount();
            alert('Product added to cart!');
        });
    });
}


function loadProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
 
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = formatPrice(product.price);
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('product-stock').textContent = product.stock > 0 ? 'In Stock' : 'Out of Stock';
    

    const ratingElement = document.getElementById('product-rating');
    ratingElement.innerHTML = renderRatingStars(product.rating) + ` <span>(${product.rating})</span>`;
    

    const imagesContainer = document.getElementById('product-images');
    imagesContainer.innerHTML = product.images.map((img, index) => `
        <img src="${img}" alt="${product.name} ${index + 1}" class="${index === 0 ? 'active' : ''}">
    `).join('');
}


function loadRelatedProducts(productId) {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;
    
    const currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    

    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== productId)
        .slice(0, 3);
    
    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }
    
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">${formatPrice(product.price)}</div>
                <div class="rating">${renderRatingStars(product.rating)}</div>
            </a>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');
    
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-id');
            addToCart(productId, 1);
            updateCartCount();
            alert('Product added to cart!');
        });
    });
}


function renderRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star full">★</span>';
    }
    
    
    if (hasHalfStar) {
        stars += '<span class="star half">★</span>';
    }
    
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="star empty">★</span>';
    }
    
    return stars;
}


function getProductById(id) {
    return products.find(p => p.id === id);
}