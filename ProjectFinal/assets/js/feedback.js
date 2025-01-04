// JavaScript: 顯示感謝訊息並清空表單
document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止預設表單提交行為

    // 顯示感謝訊息
    const feedbackMessage = document.getElementById("feedbackMessage");
    feedbackMessage.style.display = "block";

    // 清空表單
    this.reset();
});
