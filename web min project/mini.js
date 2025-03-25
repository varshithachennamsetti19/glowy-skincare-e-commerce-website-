  // Smooth scrolling for navigation links
  document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Handle Home link to scroll to top
        if(targetId === '#') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset for fixed navbar
            behavior: 'smooth'
          });
        }
      });
    });
  });
  
  let cart = [];
  let wishlist = [];
  let products = [
    { name: 'Hydrating Serum', price: 19.44, imgSrc: 'https://i.pinimg.com/736x/16/41/e7/1641e7a483cc676a7357264eab033153.jpg', description: 'Deeply hydrates and plumps your skin for a youthful glow.' },
    { name: 'Vitamin C Cream', price: 15.40, imgSrc: 'https://i.pinimg.com/736x/37/1b/7f/371b7f3f6b15d7fa43cee8f936cb14e1.jpg', description: 'Brightens and evens skin tone with powerful antioxidants.' },
    { name: 'Night Repair Oil', price: 19.63, imgSrc: 'https://i.pinimg.com/474x/22/71/d0/2271d08ef52b888028d51f271e7bef30.jpg', description: 'Deeply hydrates and plumps your skin for a youthful glow.' },
    { name: 'Moisturizer', price: 11.21, imgSrc: 'https://i.pinimg.com/474x/22/33/92/223392834c288825654bdd4124d0193d.jpg', description: 'Helps prevent dry skin by increasing the skin\'s water content and restoring its protective barrier.' },
    { name: 'Sunscreen', price: 18.6, imgSrc: 'https://i.pinimg.com/736x/d3/4c/09/d34c09b773ca1f1512a02b72e460573c.jpg', description: 'Protects your skin from the sun\'s ultraviolet (UV) radiation.' },
    { name: 'Toner', price: 9.89, imgSrc: 'https://i.pinimg.com/736x/39/e1/8b/39e18b985bc0b545b9017248872eef9b.jpg', description: 'Helps cleanse and balance the skin\'s pH.' },
    { name: 'Lip Balm', price: 6.61, imgSrc: 'https://i.pinimg.com/736x/b3/32/34/b33234c1d564526e716febd8c4430924.jpg', description: 'It hydrates the lip for long period and makes the lip look pink.' },
    { name: 'Cleanser', price: 10.44, imgSrc: 'https://i.pinimg.com/736x/77/03/ef/7703efd0b34495fa24df970aca6f93b2.jpg', description: 'Removes dirt, makeup, oil, sweat, and dead skin cells from your skin.' },
    { name: 'Mattifying Moisturizer', price: 9.44, imgSrc: 'https://i.pinimg.com/474x/89/45/dd/8945dd5878ed716a6fd1b8d618e03f8c.jpg', description: 'Fights Pimples | Controls Excess Oil | Mattifies Skin' },
    { name: '1% Niacinamide Sunscreen with SPF 50++ PA(50g)', price: 10.54, imgSrc: 'https://i.pinimg.com/474x/d7/ac/56/d7ac56f649cd58b56b20d4af78fdc2fe.jpg', description: 'Brightens, No White Cast and Dermat-Tested.' },
    { name: 'Vitamin c Sunscreen with SPF 50++ PA(50g)', price: 11.54, imgSrc: 'https://i.pinimg.com/474x/75/ae/d2/75aed20c6d86d75b804a060ec3a4e3bd.jpg', description: 'For Oily, Combination & Dry Skin Type(50g)' },
    { name: 'RiceWater Toner', price: 5.34, imgSrc: 'https://i.pinimg.com/474x/65/32/4b/65324be0e8f6938397fac5def7aab123.jpg', description: 'Fights Pimples | Controls Excess Oil | Mattifies Skin' },
    { name: 'Hydralouric Acid Infused Serum', price: 16.44, imgSrc: 'https://m.media-amazon.com/images/I/51dyKxcQAaL._SL1300_.jpg', description: 'It Brigthens the skin' },
    { name: 'Azelic Acid Serum', price: 15.44, imgSrc: 'https://i.pinimg.com/736x/b9/74/85/b974850593ff481fb28f1c3d435773ed.jpg', description: 'Its clears the skin and even\'s the tone.' },
    { name: 'Niacinamide Serum', price: 10.44, imgSrc: 'https://i.pinimg.com/474x/f2/9c/63/f29c633c42c7931a4ec66280876c84c9.jpg', description: 'Reduces dark spots and best for acne-prone skin.' },
    { name: 'Glycolic Acid Toner', price: 17.44, imgSrc: 'https://i.pinimg.com/736x/3c/ab/63/3cab63d61e1d02e0fe935638e361de92.jpg', description: 'it brightens your skin and helps you for the glow' },
    { name: 'LipBalm', price: 5.68, imgSrc: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTEJRRjIIB_hIjz92KdG4wXWCxjj8X1qQqhThdDK0OtJh0QbuBHQOl4PDaJkAfPJ0QLgr4AhewcZiBUM0MmhDC0sn9-AkqYYzBn14RF5wGlzAn0pKb4XMYsJ38b', description: 'It gives Radiant Skin, Brightening, Exfoliation.' },
    { name: 'Body Lotion', price: 15.03, imgSrc: 'https://i.pinimg.com/474x/5a/1b/06/5a1b068d02e1d4c2513dd290e7930857.jpg', description: 'nourishes the lips with removes hyperpigmentation' },
    { name: 'Glow Serum', price: 14.82, imgSrc: 'https://i.pinimg.com/736x/c2/0f/91/c20f910cf9c355e95916d4c416a42fd0.jpg', description: 'It Reduces Dark Spots,Brightens the skin and hydrates the skin' },
    { name: 'Combo Pack', price: 40.04, imgSrc: 'https://i.pinimg.com/736x/39/ea/ec/39eaec6021f27c2ef48b5d051f1fc201.jpg', description: '(Cleanser,Toner,Serum,Moisturizer,Sunscreen)' }

  ];

  // Carousel functionality
  let slideIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  function showSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    
    setTimeout(showSlides, 5000); // Change slide every 5 seconds
  }
  
  function currentSlide(index) {
    slideIndex = index;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
  }
  
  // Back to top button functionality
  window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Function to render all products
  function renderProducts(productsList) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';
    
    productsList.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <span class="heart-icon" onclick="toggleLike(this, '${product.name}', ${product.price}, '${product.imgSrc}')">♥</span>
        <img src="${product.imgSrc}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h4>$${product.price.toFixed(2)}</h4>
        <button class="btn" onclick="addToCart('${product.name}', ${product.price}, '${product.imgSrc}')">Add to Cart</button>
      `;
      productsContainer.appendChild(productDiv);
    });
  }
  
  // Sort products functionality
  function sortProducts(sortType) {
    let sortedProducts = [...products];
    
    if (sortType === 'low-to-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-to-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } 
    
    // Get the products section
    renderProducts(sortedProducts);
    
    // Check if any products are in the wishlist and mark them as liked
    document.querySelectorAll('.heart-icon').forEach(heartIcon => {
      const productName = heartIcon.nextElementSibling.nextElementSibling.textContent;
      if (wishlist.some(item => item.name === productName)) {
        heartIcon.classList.add('liked');
      }
    });
  }
  
  // Cart and wishlist functions - moved outside of renderProducts
  function addToCart(name, price, imgSrc) {
    cart.push({ name, price, imgSrc });
    updateCartCount();
    
    // Show a brief notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${name} added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 2000);
  }

  function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
  }

  function updateWishlistCount() {
    document.getElementById('wishlist-count').innerText = wishlist.length;
  }

  function toggleLike(element, name, price, imgSrc) {
    element.classList.toggle('liked');
    
    const index = wishlist.findIndex(item => item.name === name);

    if (element.classList.contains('liked')) {
      if (index === -1) wishlist.push({ name, price, imgSrc });
    } else {
      if (index !== -1) wishlist.splice(index, 1);
    }
    updateWishlistCount();
  }

  function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    const wishlistContainer = document.getElementById('wishlist-container');
    wishlistContainer.style.display = 'none';
    cartContainer.style.display = (cartContainer.style.display === 'flex') ? 'none' : 'flex';
    renderCartItems();
  }

  function toggleWishlist() {
    const cartContainer = document.getElementById('cart-container');
    const wishlistContainer = document.getElementById('wishlist-container');
    cartContainer.style.display = 'none';
    wishlistContainer.style.display = (wishlistContainer.style.display === 'flex') ? 'none' : 'flex';
    renderWishlistItems();
  }

  function renderCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p style="text-align:center;">Your cart is empty!</p>';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');

      itemDiv.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}" />
        <div class="cart-item-details">
          <h4 style="margin:0;">${item.name}</h4>
          <p style="margin:0;">$${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });

    // Total Price
    const totalDiv = document.createElement('div');
    totalDiv.style.textAlign = "center";
    totalDiv.style.padding = "10px";
    totalDiv.style.fontWeight = "bold";
    totalDiv.innerText = `Total: $${total.toFixed(2)}`;
    cartItemsDiv.appendChild(totalDiv);
    
    // Checkout button
    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'btn';
    checkoutBtn.style.width = '100%';
    checkoutBtn.style.marginTop = '15px';
    checkoutBtn.innerText = 'Proceed to Checkout';
    checkoutBtn.onclick = function() {
      alert('Thank you for your purchase!');
      cart = [];
      updateCartCount();
      toggleCart();
    };
    cartItemsDiv.appendChild(checkoutBtn);
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();
  }

  function renderWishlistItems() {
    const wishlistItemsDiv = document.getElementById('wishlist-items');
    wishlistItemsDiv.innerHTML = '';

    if (wishlist.length === 0) {
      wishlistItemsDiv.innerHTML = '<p style="text-align:center;">Your wishlist is empty!</p>';
      return;
    }

    wishlist.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');

      itemDiv.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}" />
        <div class="cart-item-details">
          <h4 style="margin:0;">${item.name}</h4>
          <p style="margin:0;">$${item.price.toFixed(2)}</p>
        </div>
        <button class="btn" style="margin-left:auto; padding: 5px 10px;" onclick="moveToCartFromWishlist(${index})">Add to Cart</button>
        <button class="remove-btn" onclick="removeFromWishlist(${index})">×</button>
      `;
      wishlistItemsDiv.appendChild(itemDiv);
    });
  }

  function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    updateWishlistCount();
    renderWishlistItems();
  }

  function moveToCartFromWishlist(index) {
    const item = wishlist[index];
    cart.push(item);
    wishlist.splice(index, 1);
    updateCartCount();
    updateWishlistCount();
    renderWishlistItems();
  }

  // Initialize everything on page load
  window.onload = function() {
    // Start the carousel
    setTimeout(showSlides, 5000);
    
    // Search functionality
  const searchInput = document.getElementById('search-input');
  
  document.getElementById('search-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('search-container').style.display = 'flex';
    searchInput.focus();
  });
  
  document.getElementById('close-search').addEventListener('click', function() {
    document.getElementById('search-container').style.display = 'none';
    searchInput.value = '';
    renderProducts(products);
  });
  
  // Add debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };
  
  // Update search input event listener
  searchInput.addEventListener('input', debounce(e => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
  }, 300));
  
  // Add event listeners for cart and wishlist buttons
    document.getElementById('view-cart-btn').addEventListener('click', function(e) {
      e.preventDefault();
      toggleCart();
    });
    document.getElementById('view-wishlist-btn').addEventListener('click', function(e) {
      e.preventDefault();
      toggleWishlist();
    });
    
    // Initialize counters
    updateCartCount();
    updateWishlistCount();
  };