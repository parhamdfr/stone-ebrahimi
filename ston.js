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

// تلگرام
const telegramBotToken = "7719287590:AAFaofMH8kER_f7L2hPZYNkVIBImlwWJOmA";
const telegramChatId = "6844751821";

// ساخت لیست محصولات
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

// ارسال سفارش به تلگرام
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(orderForm);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const product = formData.get("product");

  const message = `
🛒 سفارش جدید:
📦 محصول: ${product}
👤 نام: ${name}
📱 تلفن: ${phone}
📍 آدرس: ${address}
  `;

  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text: message })
    });

    if (!response.ok) throw new Error("خطا در ارسال پیام");

    alert("✅ سفارش شما ثبت شد. با شما تماس خواهیم گرفت.");
    orderForm.reset();
    popup.classList.add("hidden");

  } catch (error) {
    alert("❌ ارسال سفارش با خطا مواجه شد. لطفاً از فیلترشکن استفاده کنید.");
    console.error(error);
  }
});