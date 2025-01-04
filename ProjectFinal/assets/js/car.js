/* 更新商品小計及總計金額 */
function updateTotal() {
    // 商品A的計算
    var quantityA = document.getElementById("quantityA").value;
    var priceA = 1500;
    var subtotalA = quantityA * priceA;
    document.getElementById("subtotalA").textContent = "NT$" + subtotalA;

    // 商品B的計算
    var quantityB = document.getElementById("quantityB").value;
    var priceB = 1500;
    var subtotalB = quantityB * priceB;
    document.getElementById("subtotalB").textContent = "NT$" + subtotalB;

    // 總計計算
    var total = subtotalA + subtotalB;
    document.getElementById("totalPrice").textContent = "NT$" + total;
}

/* 顯示付款方式相關表單 */
function showPaymentForm() {
    var paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    var form = document.getElementById("paymentForm");
    var creditCardDetails = document.getElementById("creditCardDetails");

    form.style.display = 'block';

    if (paymentMethod === "creditCard") {
        creditCardDetails.style.display = 'block';
    } else {
        creditCardDetails.style.display = 'none';
    }
}

// 更新商品小計及總計金額
function updateTotal() {
    var quantityA = document.getElementById("quantityA") ? document.getElementById("quantityA").value : 0;
    var quantityB = document.getElementById("quantityB") ? document.getElementById("quantityB").value : 0;

    var priceA = 1500;
    var priceB = 1500;

    var subtotalA = quantityA * priceA;
    var subtotalB = quantityB * priceB;

    document.getElementById("subtotalA") ? document.getElementById("subtotalA").textContent = "NT$" + subtotalA : null;
    document.getElementById("subtotalB") ? document.getElementById("subtotalB").textContent = "NT$" + subtotalB : null;

    var total = subtotalA + subtotalB;
    document.getElementById("totalPrice").textContent = "NT$" + total;
}


// 刪除商品功能
function removeProduct(productId) {
    var productRow = document.getElementById(productId);
    if (productRow) {
        productRow.remove();
        updateTotal();
    } else {
        alert("找不到該商品！");
    }
}



/* 處理結帳流程 */
function checkout() {
    var total = document.getElementById("totalPrice").textContent.replace("NT$", "");
    var name = document.getElementById("name").value.trim();
    var address = document.getElementById("address").value.trim();
    var email = document.getElementById("email").value.trim();

    // 驗證必填欄位
    if (!name || !address || !email) {
        alert("請填寫所有必填欄位！");
        return;
    }

    // 驗證付款方式
    var paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethod) {
        alert("請選擇付款方式！");
        return;
    }

    var paymentMethodText = paymentMethod.value === "cash" ? "貨到付款" : "線上付款";

    // 收集結帳資訊
    var checkoutDetails = `您選擇的商品總計為 NT$${total}。\n付款方式: ${paymentMethodText}\n姓名: ${name}\n地址: ${address}\n信箱: ${email}\n`;

    if (paymentMethod.value === "creditCard") {
        var cardNumber = document.getElementById("cardNumber").value.trim();
        var expiryDate = document.getElementById("expiryDate").value.trim();

        if (!cardNumber || !expiryDate) {
            alert("請填寫完整的信用卡資訊！");
            return;
        }

        checkoutDetails += `信用卡號: ${cardNumber}\n到期月/年: ${expiryDate}\n`;
    }

    // 顯示結帳訊息
    alert(checkoutDetails);

    // 顯示成功訊息並滾動至頂部
    var successMessage = document.getElementById("successMessage");
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: "smooth" });
    }

    
}
