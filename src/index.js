document.addEventListener('DOMContentLoaded', function () {
});

function renderFrontPage() {
    fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6')
        .then(response => response.json())
        .then(data => {
            displayProducts(data.items, true);
        })
        .catch(error => console.error('Error:', error));
    fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/categories?limit=12')
        .then(response => response.json())
        .then(data => {
            displayCategories(data.items);
        })
        .catch(error => console.error('Error:', error));
    }

function displayProducts(products, headingText, buttonBool) {
    const container = document.getElementById('product-container');
    const buttonDiv = document.getElementById('buttonDiv')
    const button = document.createElement('button');
    button.type = "button";
    button.id = "search-button";
    button.innerHTML = `<a href="/?categories">Skoða alla flokka</a>`
    button.onClick = "location.href='/?categories'";
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('box');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
            <h3>${product.title}</h3>
            <p>${product.category_title}</p>
            <p>${product.price} kr.-</p>
            <a href="/products/${product.id}">View Product</a>
        `;
        container.appendChild(productDiv);
    });

    if (headingText) {
        const heading = document.createElement('h2');
        heading.innerText = headingText;
        content.insertBefore(heading, container);
    }
    if (buttonBool) {
        buttonDiv.appendChild(button);
    }
}

function displayCategories(categories) {
    const content = document.getElementById('content');
    const container = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('box');
        categoryDiv.innerHTML = `
            <a href="/?category=${category.id}">${category.title}</a>
        `;
        container.appendChild(categoryDiv);
    });
}

function displayCategoryProducts(category, limit, from) {
    fetch(`https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?offset=${from}&category=${category}&limit=99`)
    .then(response => response.json())
    .then(data => {
        const products = data.items;
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
    })
}

function displayProduct(productInfo) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('productBlock');
    productDiv.innerHTML = `
        <img src="${productInfo.image}"></img>
        <div class="productDesc">
            <h3>${productInfo.image}"></h3>
            <div class="productTags">
                <p>Flokkur: ${productInfo.category_title}</p>
                <p>Verð: ${productInfo.price} kr.-</p>
            </div>
            <p>
                ${productInfo.description}
            </p>
        </div>
    `
    displayCategoryProducts(`Meira úr ${productInfo.category_title}`, productInfo.category_id, 3)
}

renderFrontPage()

