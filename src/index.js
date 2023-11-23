document.addEventListener('DOMContentLoaded', function () {
});

function renderFrontPage() {
    fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6')
        .then(response => response.json())
        .then(data => {
            displayProducts(data.items);
        })
        .catch(error => console.error('Error:', error));
    fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/categories?limit=12')
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
        // @ts-ignore
        container.appendChild(productDiv);
    });
}

function displayCategories(categories) {
    const container = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoriesDiv = document.createElement('div');
        categoriesDiv.classList.add('box1');
        categoriesDiv.innerHTML = `
            <a href="/categories/${category.id}"><h3>${category.title}</h3></a>
        `;
        // @ts-ignore
        container.appendChild(categoriesDiv);
    })
}

function displayCategoryProducts(headingText, category, limit, from) {
    fetch(`https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?offset=${from}&category=${category}&limit=99`)
    .then(response => response.json())
    .then(data => {
        const products = data.items;
        const content = document.getElementById('content');
        const container = document.getElementById('product-container');
        let counter = 0;
        products.forEach(product => { if (counter < limit) {
            const productDiv = document.createElement('div');
            productDiv.classList.add('box');
            productDiv.innerHTML = `
                
                <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
                <h3>${product.title}</h3>
                <p>${product.category_title}</p>
                <p>${product.price} kr.-</p>
                <a href="/?product=${product.id}">View Product</a>
            `;
            container.append(productDiv);
            counter++;
        }});
        if (headingText) {
            const heading = document.createElement('h2');
            heading.innerText = headingText;
            content.insertBefore(heading, container);
        }
    })
}

function displayProduct(ProductInfo) {
    const content = document.getElementById('content');
    const productDiv = document.createElement('div');
    productDiv.classList.add('productBlock');
    productDiv.innerHTML = `
        <img src="${ProductInfo.image}"></img>
        <div class="productDesc">
            <h3>${productInfo.image}"></h3>
            <div class="productTags">
                <p>Flokkur: ${productInfo.category_title}</p>
                <p>Verð: ${productInfo.price} kr.-</p>
            </div>
            <p>
                ${productInfo.descripction}
            </p>
        </div>
    `
    content.insertBefore(productDiv, document.getElementById('product-container'));
}

renderFrontPage()
