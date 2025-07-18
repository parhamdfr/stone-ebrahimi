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

// ارسال سفارش با fetch (بدون فرم HTML)
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(orderForm);
  formData.append("_captcha", "false");
  formData.append("_template", "table");
  formData.append("_subject", "سفارش جدید از سایت سنگ‌ها");

  fetch("https://formsubmit.co/parhamebrahimi668@gmail.com", {
    method: "POST",
    body: formData
  })
    .then(response => {
      if (response.ok) {
        popup.classList.add("hidden");
        showSuccessToast("✅ سفارش شما با موفقیت ثبت شد!");
        orderForm.reset();
      } else {
        showErrorToast("❌ خطا در ارسال سفارش. لطفاً دوباره تلاش کنید.");
      }
    })
    .catch(error => {
      console.error("خطا در ارسال فرم:", error);
      showErrorToast("⚠️ مشکلی در ارتباط با سرور رخ داد.");
    });
});

// Toast موفقیت
function showSuccessToast(message) {
  showToast(message, "#d4edda", "#155724");
}

// Toast خطا
function showErrorToast(message) {
  showToast(message, "#f8d7da", "#721c24");
}

// تابع عمومی Toast
function showToast(message, bgColor, textColor) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = bgColor;
  toast.style.color = textColor;
  toast.style.padding = "12px 15px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  toast.style.fontWeight = "bold";
  toast.style.fontSize = "16px";
  toast.style.zIndex = "1000";
  toast.style.opacity = "1";
  toast.style.transition = "opacity 0.5s ease";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}