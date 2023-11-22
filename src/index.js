document.addEventListener('DOMContentLoaded', function () {
});

function renderFrontPage() {
    fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6')
        .then(response => response.json())
        .then(data => {
            displayProducts(data.items);
        })
        .catch(error => console.error('Error:', error));
    fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/categories?limit=6')
        .then(response => response.json())
        .then(data => {
            displayCategories(data.items);
        })
        .catch(error => console.error('Error:', error));
    }

function displayProducts(products) {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('box');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
            <h3>${product.title}</h3>
            <p>${product.category_title}</p>
            <p>${product.price} kr.-</p>
            <a href="/product/${product.id}">View Product</a>
        `;
        container.appendChild(productDiv);
    });
}

function displayCategories(categories) {
    const container = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoriesDiv = document.createElement('div');
        categoriesDiv.classList.add('box');
        categoriesDiv.innerHTML = `
            <a href="/categories/${category.id}"><h3>${category.title}</h3></a>
        `;
        container.appendChild(categoriesDiv);
    })
}

renderFrontPage()
