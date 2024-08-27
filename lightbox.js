document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    var lightbox = document.getElementById('lightbox');
    console.log('Lightbox element:', lightbox);
    var lightboxImg = document.getElementById('lightbox-img');
    console.log('Lightbox image element:', lightboxImg);
    var closeBtn = document.querySelector('.lightbox .close');
    console.log('Close button:', closeBtn);

    // Get all images with class 'lucrare-img'
    var images = document.getElementsByClassName('lucrare-img');
    console.log('Number of images found:', images.length);

    // Function to open lightbox
    function openLightbox(src) {
        console.log('Opening lightbox with image:', src);
        lightbox.style.display = 'block';
        lightboxImg.src = src;
    }

    // Add click event to all images
    for (var i = 0; i < images.length; i++) {
        images[i].onclick = function() {
            openLightbox(this.src);
        }
        // Add touch event for mobile devices
        images[i].addEventListener('touchend', function(e) {
            e.preventDefault();
            openLightbox(this.src);
        });
    }

    // Close lightbox when clicking on 'x'
    if (closeBtn) {
        closeBtn.onclick = function() {
            console.log('Close button clicked');
            lightbox.style.display = 'none';
        }
    }

    // Close lightbox when clicking outside the image
    lightbox.onclick = function(event) {
        if (event.target == lightbox) {
            console.log('Clicked outside image');
            lightbox.style.display = 'none';
        }
    }

    // Add swipe down to close for touch devices
    var touchStartY = 0;
    lightbox.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, false);

    lightbox.addEventListener('touchend', function(e) {
        var touchEndY = e.changedTouches[0].clientY;
        if (touchEndY - touchStartY > 50) {
            console.log('Swiped down');
            lightbox.style.display = 'none';
        }
    }, false);
});