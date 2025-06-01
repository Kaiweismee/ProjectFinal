 // JavaScript 自動輪播並且讓圖片可以點擊
        let slideIndex = 0;
        
        function showSlides() {
            const slides = document.querySelector(".slides");
            const totalSlides = slides.children.length;
        
            slideIndex = (slideIndex + 1) % totalSlides;
            const offset = -slideIndex * 100;
            slides.style.transform = `translateX(${offset}%)`;
        }
        
        // 每3秒自動播放幻燈片
        setInterval(showSlides, 3000);