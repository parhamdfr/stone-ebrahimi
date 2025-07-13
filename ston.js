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

// نمایش پیام موفقیت بعد از برگشت به سایت
window.addEventListener("load", () => {
  if (window.location.hash === "#order-success") {
    const message = document.createElement("div");
    message.textContent = "✅ سفارش شما با موفقیت ثبت شد!";
    message.style.position = "fixed";
    message.style.top = "20px";
    message.style.left = "50%";
    message.style.transform = "translateX(-50%)";
    message.style.background = "#d4edda";
    message.style.color = "#155724";
    message.style.padding = "12px 20px";
    message.style.borderRadius = "10px";
    message.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    message.style.fontWeight = "bold";
    message.style.fontSize = "16px";
    message.style.zIndex = "1000";

    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 5000); // بعد از ۵ ثانیه پاک می‌شه

    history.replaceState(null, null, window.location.pathname);
  }
});

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

// ارسال سفارش به ایمیل با فرم مخفی بدون ترک صفحه
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(orderForm);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const product = formData.get("product");

  const emailForm = document.createElement("form");
  emailForm.action = "https://formsubmit.co/parhamebrahimi668@gmail.com";
  emailForm.method = "POST";
  emailForm.style.display = "none";

  const fields = {
    name,
    phone,
    address,
    product,
    _captcha: "false",
    _subject: "سفارش جدید از سایت سنگ‌ها",
    _template: "table",
    _next: window.location.href + "#order-success"
  };

  for (const key in fields) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = fields[key];
    emailForm.appendChild(input);
  }

  document.body.appendChild(emailForm);
  emailForm.submit();
});

// نمایش پیام موفقیت در صورت بازگشت از FormSubmit
window.addEventListener("load", () => {
  if (window.location.hash === "#order-success") {
    successMessage.style.display = "block";
    history.replaceState(null, null, window.location.pathname);
  }
});