// Fungsi pencarian
function search() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.style.display = 'none';
    document.querySelector('header').appendChild(searchInput);

    searchIcon.addEventListener('click', () => {
        searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            // Implementasi logika pencarian di sini
            console.log('Searching for:', searchInput.value);
        }
    });
}

// Fungsi slider produk
function productSlider() {
    const productGrid = document.querySelector('.produk-grid');
    let currentIndex = 0;

    function showProducts(startIndex) {
        const products = productGrid.querySelectorAll('.produk-container');
        products.forEach((product, index) => {
            product.style.display = (index >= startIndex && index < startIndex + 3) ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 3) % productGrid.children.length;
        showProducts(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 3 + productGrid.children.length) % productGrid.children.length;
        showProducts(currentIndex);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', nextSlide);

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Prev';
    prevButton.addEventListener('click', prevSlide);

    productGrid.parentNode.insertBefore(prevButton, productGrid);
    productGrid.parentNode.insertBefore(nextButton, productGrid.nextSibling);

    showProducts(currentIndex);
}

// Fungsi modal detail produk
function productModal() {
    const buyButtons = document.querySelectorAll('.buy-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.closest('.produk-container');
            const title = product.querySelector('.produk-title').textContent;
            const price = product.querySelector('.produk-price').textContent;

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h2>${title}</h2>
                    <p>${price}</p>
                    <button class="close-modal">Close</button>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
    });
}

// Fungsi wishlist
function wishlistFeature() {
    const products = document.querySelectorAll('.produk-container');
    const wishlist = [];

    products.forEach(product => {
        const wishlistButton = document.createElement('button');
        wishlistButton.textContent = '♡';
        wishlistButton.className = 'wishlist-button';
        product.appendChild(wishlistButton);

        wishlistButton.addEventListener('click', () => {
            const productTitle = product.querySelector('.produk-title').textContent;
            if (wishlist.includes(productTitle)) {
                const index = wishlist.indexOf(productTitle);
                wishlist.splice(index, 1);
                wishlistButton.textContent = '♡';
            } else {
                wishlist.push(productTitle);
                wishlistButton.textContent = '♥';
            }
            console.log('Wishlist:', wishlist);
        });
    });
}

// Inisialisasi semua fitur
document.addEventListener('DOMContentLoaded', () => {
    search();
    productSlider();
    productModal();
    wishlistFeature();
});
