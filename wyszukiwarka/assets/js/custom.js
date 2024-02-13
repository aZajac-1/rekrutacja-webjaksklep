        const searchInput = document.getElementById('search-input');
        const productsPanel = document.getElementById('products');
        const searchIcon = document.getElementById('search-icon');
        const urlBase = 'https://dummyjson.com/products/search?q=';
        searchIcon.addEventListener("click", function() {

            const input = searchInput.value;
            productsPanel.innerHTML = '';
            if (input) {
                productsPanel.style.display = 'block';
                var url = urlBase + input;

                getApi(url);

            } else {
                productsPanel.style.display = 'none';
            }
        });

        async function getApi(url) {

            const response = await fetch(url);
            var data = await response.json();
            show(data);
        }

        function show(data) {
            var products_data = data.products;
            products_data.forEach(function(product) {
                const div = document.createElement('div');
                div.innerHTML = '<p>' + product.title + '</p>' + '<p> $' + product.price + '</p>';
                div.className = 'search-item';
                div.onclick = function() {
                    searchInput.value = product + 'cena';
                    productsPanel.style.display = 'none';
                };
                productsPanel.appendChild(div);
            });
            if (products_data.length === 0) {
                productsPanel.style.display = 'none';
            }

        }

        document.addEventListener('click', function(event) {
            if (event.target.closest('.search-box')) return;
            productsPanel.style.display = 'none';
        });