document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.getElementById('add-to-cart-btn');
    const cartStatus = document.getElementById('cart-status');
    const sizeSelect = document.getElementById('size');
    const quantityInput = document.getElementById('quantity');
    const priceDisplay = document.getElementById('price');

    const productId = document.getElementById('productId').value; // 假設有隱藏欄位存 productId
    const basePrice = 1500;

    // 數量變動時更新價格
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 1;
        const totalPrice = basePrice * quantity;
        priceDisplay.textContent = totalPrice;
    });

    // 點擊加入購物車
    addToCartButton.addEventListener('click', () => {
        const selectedSize = sizeSelect.value;
        const selectedQuantity = parseInt(quantityInput.value) || 1;

        // 先做前端基本驗證
        if (!selectedSize) {
            alert("請選擇尺寸");
            return;
        }
        if (selectedQuantity <= 0) {
            alert("數量必須大於 0");
            return;
        }

        // 送 AJAX 請求到 add_to_cart.jsp
        fetch('add_to_cart.jsp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: `productId=${encodeURIComponent(productId)}&size=${encodeURIComponent(selectedSize)}&quantity=${encodeURIComponent(selectedQuantity)}`
        })
        .then(response => response.text())
        .then(result => {
            if (result.trim() === "success") {
                addToCartButton.classList.add('added');
                addToCartButton.textContent = '已加入購物車';
                cartStatus.style.display = 'block';
                cartStatus.textContent = `已加入：${selectedQuantity} 件，尺寸：${selectedSize}，總價：${basePrice * selectedQuantity} 元`;
            } else {
                alert("加入購物車失敗：" + result);
            }
        })
        .catch(err => {
            alert("網路錯誤，請稍後再試");
            console.error(err);
        });
    });
});
