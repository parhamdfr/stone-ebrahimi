const products = [
  { name: "آمیتیست سفید", image: "Ametist.jpg", price: "50,000 تومان" },
  { name: "عقیق سلیمانی", image: "Solymani2.jpg", price: "70,000 تومان" },
  { name: "عقیق سلیمانی گل دار", image: "Solymani1.jpg", price: "120,000 تومان" },
  { name: "پک اقتصادی عقیق", image: "Pak.jpg", price: "300,000 تومان" },
];

const productList = document.querySelector(".product-list");
const popup = document.getElementById("popup-form");
const closeBtn = document.querySelector(".close-btn");
const orderForm = document.getElementById("order-form");
const productNameInput = document.getElementById("product-name");

// ساخت لیست محصولات و دکمه خرید
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
    productNameInput.value = product.name;
    popup.classList.remove("hidden");
  });

  productList.appendChild(div);
});

// بستن فرم
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// ارسال سفارش به Webhook (در Make.com)
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(orderForm);
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    product: formData.get("product")
  };

  try {
    const response = await fetch("https://hook.us1.make.com/3t6gylh1ctxlxyeeuxr8se8vvmeb80r9@hook.eu2.make.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("خطا در ارسال اطلاعات");

    alert("✅ سفارش شما با موفقیت ثبت شد.");
    orderForm.reset();
    popup.classList.add("hidden");
  } catch (error) {
    alert("❌ ثبت سفارش ناموفق بود. لطفاً دوباره تلاش کنید.");
    console.error(error);
  }
});
