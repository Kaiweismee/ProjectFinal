     
       /* 計算並更新商品小計及總計金額 */
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

        /* 顯示付款方式的相關表單，根據選擇的付款方式顯示信用卡資料欄位 */
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


        /* 執行結帳操作，並顯示結帳成功訊息 */
        function checkout() {
            var total = document.getElementById("totalPrice").textContent;
            var name = document.getElementById("name").value;
            var address = document.getElementById("address").value;
            var email = document.getElementById("email").value;

            if (!name || !address || !email) {
                alert("請填寫所有必填欄位！");
                return;
            }

            var paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            if (!paymentMethod) {
                alert("請選擇付款方式！");
                return;
            }

            var paymentMethodText = paymentMethod.value === "cash" ? "貨到付款" : "線上付款";

            var checkoutDetails = "您選擇的商品總計為 " + total + "。\n";
            checkoutDetails += "付款方式: " + paymentMethodText + "\n";
            checkoutDetails += "姓名: " + name + "\n";
            checkoutDetails += "地址: " + address + "\n";
            checkoutDetails += "信箱: " + email + "\n";

            if (paymentMethod.value === "creditCard") {
                var cardNumber = document.getElementById("cardNumber").value;
                var expiryDate = document.getElementById("expiryDate").value;
                checkoutDetails += "信用卡號: " + cardNumber + "\n";
                checkoutDetails += "到期月/年: " + expiryDate + "\n";
            }

            alert(checkoutDetails);
            
            // 顯示結帳成功訊息
            document.getElementById("successMessage").style.display = 'block';
            

        // 延遲返回首頁
        setTimeout(function() {
            window.location.href = "../one/index.html"; // 跳轉到 index.html
            }, 2000); // 延遲 2 秒後執行
        }    

        /* 載入頁面時顯示歷史購物紀錄 */
        window.onload = function() {
            loadHistory();
        };