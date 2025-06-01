document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.getElementById('add-to-cart-btn');
    const cartStatus = document.getElementById('cart-status');
    const sizeSelect = document.getElementById('size');
    const quantityInput = document.getElementById('quantity');
    const priceDisplay = document.getElementById('price');

    // 原始價額
    const basePrice = 1500;

    // 處理數量改變更新價額
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 1; // 防止空輸入
        const totalPrice = basePrice * quantity;
        priceDisplay.textContent = totalPrice;
    });

    // 加入購物車功能
    addToCartButton.addEventListener('click', () => {
        const selectedSize = sizeSelect.value;
        const selectedQuantity = parseInt(quantityInput.value) || 1;

        if (addToCartButton.classList.contains('added')) {
            // 如果已加入購物車，執行取消邏輯
            addToCartButton.classList.remove('added');
            addToCartButton.textContent = '加入購物車';
            cartStatus.style.display = 'none';
        } else {
            // 如果未加入購物車，執行加入邏輯
            addToCartButton.classList.add('added');
            addToCartButton.textContent = '取消加入';
            cartStatus.style.display = 'block';

            // 顯示加入的細節
            alert(`加入購物車：
                商品：富邦悍將球衣
                尺寸：${selectedSize}
                數量：${selectedQuantity}
                總價：${basePrice * selectedQuantity} 元
            `);
        }
    });
});
