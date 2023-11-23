document.addEventListener('DOMContentLoaded', function () {

});



function renderFrontpage() {
    fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6')
        .then(response => response.json())
        .then(data => {
            displayProducts(data.items, "Nýjar vörur", true);
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
    const content = document.getElementById('content');
    const container = document.getElementById('product-container');
    const buttonDiv = document.getElementById('buttonDiv')
    const button = document.createElement('button');
    button.type = "button";
    button.id = "search-button";
    button.innerHTML = `<a href="/?categories">Skoða alla flokka</a>`
    button.onClick = "location.href='/?categories'";
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('box-product');
        productDiv.innerHTML = `

            <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
            <h3>${product.title}</h3>
            <p>${product.category_title}</p>
            <p>${product.price} kr.-</p>
            <a href="/?product=${product.id}">View Product</a>
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
    const heading = document.createElement('h2');
    heading.innerText = "Skoðaðu vöruflokkana okkar";
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('box-cat');
        categoryDiv.innerHTML = `
            <a href="/?category=${category.id}">${category.title}</a>
        `;
        container.appendChild(categoryDiv);
    });
    content.insertBefore(heading, container);
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
            productDiv.classList.add('box-product');
            productDiv.innerHTML = `
                
                <img src="${product.image}" alt="${product.title}" style="max-width: 100px">
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

function displayProduct(productInfo) {
    const content = document.getElementById('content');
    const productDiv = document.createElement('div');
    productDiv.classList.add('productBlock');
    productDiv.innerHTML = `
        <img src="${productInfo.image}"></img>
        <div class="productDesc">
            <h3>${productInfo.title}</h3>
            <div class="productTags">
                <p>Flokkur: ${productInfo.category_title}</p>
                <p>Verð: ${productInfo.price} kr.-</p>
            </div>
            <p>
                ${productInfo.description}
            </p>
        </div>
    `
    content.insertBefore(productDiv, document.getElementById('product-container'));
    displayCategoryProducts(`Meira úr ${productInfo.category_title}`, productInfo.category_id, 3)
}

function forward(category, from) {
    window.location.href = `/?category=${category}&from=${from + 6}`
}

function backward(category, from) {
    window.location.href = `/?category=${category}&from=${from - 6}`
}

function pageButtons(category, items, from) {
    const buttonDiv = document.getElementById('buttonDiv');
    const backLink = document.createElement('a');
    const forwardLink = document.createElement('a');
    backLink.innerText = "Til baka";
    forwardLink.href = `/?category=${category}&from=${from + 6}`
    forwardLink.innerText = "Áfram";
    if (from == null) {
        buttonDiv.appendChild(forwardLink);
    }
    else if (from + 6 > items.length) {
        if (from == 6) {
            backLink.href = `/?category=${category}`
        }
        else {
            backLink.href = `/?category=${category}&from=${from - 6}`
        }
        buttonDiv.appendChild(backLink);
    }
}

function route() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const categories = params.has('categories');
    const products = params.has('products');
    const product = params.get('product');
    const query = params.get('query');
    const from = params.get('from');

    if (category) {
        fetch(`https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?&category=${category}&limit=99`)
        .then(response => response.json())
        .then(data => {
            displayCategoryProducts(`${data.items[0].category_title}`, category, 6, from);
            pageButtons(category, data.items, from);
        })
        if (query) {

        }

    } 
    else if (categories) {
        fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/categories?limit=12')
        .then(response => response.json())
        .then(data => {
            displayCategories(data.items);
        })
    }
    else if (products) {
        fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6')
        .then(response => response.json())
        .then(data => {
            displayProducts(data.items, "Nýjar vörur");
        })
        .catch(error => console.error('Error:', error));
    }
    else if (product) {
        fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=100')
        .then(response => response.json())
        .then(data => {
            displayProduct(data.items[100 - product]);
        })
    }
    else {
      renderFrontpage();
    }
  }

window.onpopstate = () => {
    empty(document.body);
    route();
};

route();

