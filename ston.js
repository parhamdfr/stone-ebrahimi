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

// ساخت پیام موفقیت (در ابتدا مخفی)
const successMessage = document.createElement("div");
successMessage.id = "success-message";
successMessage.style.display = "none";
successMessage.style.color = "green";
successMessage.style.marginTop = "10px";
successMessage.style.textAlign = "center";
successMessage.style.fontWeight = "bold";
successMessage.textContent = "✅ سفارش شما با موفقیت ثبت شد!";
document.body.appendChild(successMessage);

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