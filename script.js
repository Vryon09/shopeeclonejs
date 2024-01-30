const logoEl = document.querySelector(".logo");
const cartNavEl = document.querySelector(".fa-cart-shopping");
const contentEl = document.querySelector(".content");
const heroSectionEl = document.querySelector(".hero-section");
const footerEl = document.querySelector("footer");

//CONTAINER VARIABLES
const showItemContainer = document.querySelector(".show-item-container");
const shopItemContainer = document.querySelector(".shop-item-container");
const cartContainer = document.querySelector(".cart-container");

//ITEMS
const item1 = {
  itemName: "VETEMENTS MAN BLACK SWEATSHIRTS",
  itemNumber: "item-1",
  itemImage: "item-1.jpg",
  itemPrice: 3800,
  itemSold: 0,
};

const item2 = {
  itemName: "Prada Moonlith pouch-detail leather boots",
  itemNumber: "item-2",
  itemImage: "item-2.jpg",
  itemPrice: 97386,
  itemSold: 0,
};

const item3 = {
  itemName: "Balenciaga - Wide-Leg Distressed Jeans - Blue",
  itemNumber: "item-3",
  itemImage: "item-3.jpg",
  itemPrice: 94510,
  itemSold: 0,
};

const items = [item1, item2, item3];

//SHOW DAILY DISCOVERIES
const showDailyItem = (items) => {
  items.forEach((item) => {
    const price = item.itemPrice.toLocaleString("en-US", { style: "decimal" });

    const html = `<div class="${item.itemNumber} shop-item">
      <img src="${item.itemImage}" alt="item-1" />
      <p class="label-item-name">${item.itemName}</p>
      <div class="price-sold-container">
        <p class="label-price">₱${price}</p>
        <p class="label-sold">${item.itemSold} sold</p>
      </div>
    </div>`;

    shopItemContainer.insertAdjacentHTML("beforeend", html);
  });
};

showDailyItem(items);

//declared this variable here because shopItem will be empty if the showDailyItem function in under this variable
const itemEL = document.querySelectorAll(".shop-item");

//SHOW SELECTED ITEM
const showSelectedItem = (selectedItem, price) => {
  const html = `<div class="show-item">
        <div class="item-image-container">
          <img src="${selectedItem.itemImage}" alt="${selectedItem.itemName}" />
        </div>
        <div class="item-showed-right">
          <div class="item-info">
            <p class="item-name-showed">${selectedItem.itemName}</p>
            <p class="item-price-showed">₱${price}</p>
          </div>
          <div class="item-user-options">
            <button class="${selectedItem.itemNumber} add-to-cart">Add to Cart</button>
            <button class="buy-now">Buy Now</button>
          </div>
        </div>
      </div>`;

  showItemContainer.insertAdjacentHTML("afterbegin", html);
};

//UPDATE SELECTED ITEM UI
const selectedItemUI = () => {
  contentEl.style.display = "none";
  heroSectionEl.style.display = "none";
  footerEl.style.display = "none";
  showItemContainer.style.display = "flex";
};

//SHOW ITEM
itemEL.forEach((item) => {
  item.addEventListener("click", function () {
    const itemNum = this.classList[0];

    const selectedItem = items.find((item) => item.itemNumber === itemNum);

    if (selectedItem) {
      const price = selectedItem.itemPrice.toLocaleString("en-US", {
        style: "decimal",
      });

      //SHOW SELECTED ITEM
      showSelectedItem(selectedItem, price);
      //UPDATE SELECTED ITEM UI
      selectedItemUI();
    } else {
      return;
    }
  });
});

//ADD TO CART
const itemsInCart = [];
showItemContainer.addEventListener("click", function (event) {
  const itemNum = event.target.classList[0];
  console.log(itemNum);
  const selectedItem = items.find((item) => item.itemNumber === itemNum);
  const price = selectedItem.itemPrice.toLocaleString("en-US", {
    style: "decimal",
  });
  const addToCartBtn = event.target.closest(".add-to-cart");

  if (addToCartBtn) {
    const html = `<div class="${selectedItem.itemNumber} cart-item">
      <input type="checkbox" name="" id="" class="${selectedItem.itemNumber} check-item" />
      <img src="${selectedItem.itemImage}" alt="${selectedItem.itemName}" />
      <p class="added-item-name-1">${selectedItem.itemName}</p>
      <p class="added-item-price">₱${price}</p>
      <div class="quantity-container">
          <button class="quantity-minus">-</button>
          <input type="number" class="added-quantity" value="1" />
          <button class="quantity-plus">+</button>
        </div>
      <p class="total-item-price">₱${price}</p>
    </div>`;

    cartContainer.insertAdjacentHTML("afterbegin", html);

    itemsInCart.push(selectedItem.itemNumber);
  }

  console.log(itemsInCart.reverse());
});

//ADD TO CART FUNCTIONALITIES
cartContainer.addEventListener("click", function (event) {
  const cartItem = event.target.closest(".cart-item");
  const totalPrice = document.querySelector(".total-price");
  if (cartItem) {
    const quantityContainer = cartItem.querySelector(".quantity-container");
    const quantityAdded = quantityContainer.querySelector(".added-quantity");
    const itemPrice = cartItem.querySelector(".added-item-price");
    const totalItemPrice = cartItem.querySelector(".total-item-price");
    const checkedItems = document.querySelectorAll(".check-item:checked");

    const numTotalItemPrice = +itemPrice.textContent
      .replace("₱", "")
      .replace(",", "");

    totalPrice.textContent = `₱${0}`;

    if (
      event.target.classList[0] === "quantity-minus" &&
      quantityAdded.value > 1
    ) {
      quantityAdded.value = +quantityAdded.value - 1;
      totalItemPrice.textContent = `₱${(
        numTotalItemPrice * quantityAdded.value
      ).toLocaleString("en-US", { style: "decimal" })}`;
    }

    if (event.target.classList[0] === "quantity-plus") {
      quantityAdded.value = +quantityAdded.value + 1;
      totalItemPrice.textContent = `₱${(
        numTotalItemPrice * quantityAdded.value
      ).toLocaleString("en-US", { style: "decimal" })}`;
    }

    let total = 0;
    let itemsChecked = [];
    checkedItems.forEach((checkedItem) => {
      const checkedCartItem = checkedItem.closest(".cart-item");
      const checkedPriceLabel =
        checkedCartItem.querySelector(".total-item-price");
      const checkedPriceNum = +checkedPriceLabel.textContent
        .replace("₱", "")
        .replace(",", "");

      total += checkedPriceNum;

      itemsChecked.push(checkedItem.classList[0]);
    });
    const totalItem = document.querySelector(".total-item");
    totalItem.textContent = `Total (${
      itemsChecked.length > 1
        ? `${itemsChecked.length} items`
        : `${itemsChecked.length} item`
    }):`;
    console.log(itemsChecked.length);

    totalPrice.textContent = `₱${total.toLocaleString("en-US", {
      style: "decimal",
    })}`;
  }
});

//SHOW CART
cartNavEl.addEventListener("click", () => {
  contentEl.style.display = "none";
  heroSectionEl.style.display = "none";
  footerEl.style.display = "none";
  showItemContainer.style.display = "none";
  cartContainer.style.display = "flex";
});

//BACK TO HOME PAGE
logoEl.addEventListener("click", (event) => {
  contentEl.style.display = "flex";
  heroSectionEl.style.display = "flex";
  footerEl.style.display = "flex";
  showItemContainer.style.display = "none";
  cartContainer.style.display = "none";
  showItemContainer.firstChild.remove();
});
