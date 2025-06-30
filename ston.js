const products = [
   {
    name: "آمیتیست سفید",
    image: "Ametist.jpg",
    price: "200,000 تومان",
  },
  {
    name: "عقیق سلیمانی",
    image: "Solymani2.jpg",
    price: "200,000 تومان",
  },
  {
    name: "عقیق سلیمانی گل دار",
    image: "Solymani1.jpg",
    price: "300,000تومان",
  },
   {
    name: "پک اقتصادی عقیق",
    image: "Pak.jpg",
    price: "600,000تومان",
  },
];

const productList = document.querySelector(".product-list");

products.forEach((product) => {
  const div = document.createElement("div");
  div.classList.add("product");

  const imageUrl = product.image || "https://via.placeholder.com/320?text=No+Image";

  div.innerHTML = `
    <img src="${imageUrl}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>قیمت: ${product.price}</p>
    <button class="buy-btn">خرید</button>
  `;

  div.querySelector(".buy-btn").addEventListener("click", () => {
    alert(`برای خرید ${product.name} داخل تلگرام پیام دهید : ageteston@`);
  });

  productList.appendChild(div);
});

