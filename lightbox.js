document.addEventListener('DOMContentLoaded', function() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var closeBtn = document.querySelector('.lightbox .close');
    var prevBtn = document.createElement('div');
    var nextBtn = document.createElement('div');

    // Inițializare lightbox (ar trebui să fie ascuns la început)
    lightbox.style.display = 'none';

    // Creare butoane de navigare
    prevBtn.classList.add('prev');
    prevBtn.innerHTML = '&#10094;'; // Săgeată spre stânga
    nextBtn.classList.add('next');
    nextBtn.innerHTML = '&#10095;'; // Săgeată spre dreapta

    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);

    // Get all images with class 'lucrare-img'
    var images = document.getElementsByClassName('lucrare-img');
    var currentIndex = 0;
    var touchStartTime = 0;
    var touchDelay = 200; // Delay de 200ms

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightbox.style.display = 'flex';
    }

    function showImage(index) {
        if (index >= 0 && index < images.length) {
            lightboxImg.src = images[index].src;
            currentIndex = index;
        }
    }

    // Add click and touch events to all images
    for (var i = 0; i < images.length; i++) {
        (function(index) {
            images[index].onclick = function() {
                openLightbox(index);
            };

            // Add touch event for mobile devices with delay
            images[index].addEventListener('touchstart', function() {
                touchStartTime = Date.now();
            });

            images[index].addEventListener('touchend', function(e) {
                e.preventDefault();
                var touchDuration = Date.now() - touchStartTime;
                if (touchDuration < touchDelay) {
                    openLightbox(index);
                }
            });
        })(i);
    }

    // Close lightbox when clicking on 'x'
    if (closeBtn) {
        closeBtn.onclick = function() {
            lightbox.style.display = 'none';
        };
    }

    // Close lightbox when clicking outside the image
    lightbox.onclick = function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    };

    // Show previous image
    prevBtn.onclick = function() {
        showImage(currentIndex - 1);
    };

    // Show next image
    nextBtn.onclick = function() {
        showImage(currentIndex + 1);
    };

    // Add swipe functionality for touch devices
    var touchStartX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, false);

    lightbox.addEventListener('touchend', function(e) {
        var touchEndX = e.changedTouches[0].clientX;
        if (touchEndX - touchStartX > 50) {
            showImage(currentIndex - 1);
        } else if (touchStartX - touchEndX > 50) {
            showImage(currentIndex + 1);
        }
    }, false);
});
