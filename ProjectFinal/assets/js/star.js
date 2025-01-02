//星星評分
document.getElementById('rating-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    let selectedRating = document.querySelector('input[name="rating"]:checked');
    let reviewText = document.querySelector('textarea[name="review"]').value.trim(); // Get the review text
    
   
    if (selectedRating) {
        let ratingValue = selectedRating.value;
        let feedbackMessage = `您已給予 ${ratingValue} 顆星的評價！`;

        
        let feedbackElement = document.getElementById('rating-feedback');
        feedbackElement.textContent = feedbackMessage;
        
        
        if (reviewText) {
            let reviewMessage = ` 內容：${reviewText}`;
            
            let reviewElement = document.createElement('p');
            reviewElement.textContent = reviewMessage;
            feedbackElement.appendChild(reviewElement);
        }
        
        
        feedbackElement.style.display = 'block';
    } else {
        alert("請選擇評價星數！");
    }
});
