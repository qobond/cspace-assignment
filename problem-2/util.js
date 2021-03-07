/** @format */

const catImageCount = 120;

const populateCatImages = (row) => {
  for (let i = 1; i <= catImageCount; i++) {
    row.innerHTML += `<div class="img-container"><p>cat-image-${i}.jpg</p><img src="./images/cat-image-${i}.jpg"></div>`;
  }
};

window.addEventListener("DOMContentLoaded", (e) => {
  // Get elements needed for js
  const imageShowcase = document.querySelector(".img-showcase");
  const row = document.querySelector(".row");

  // Populate cat images
  populateCatImages(row);

  // Add cat image to "showcase" when user clicks
  const catImages = document.querySelectorAll(".img-container");
  catImages.forEach((element) => {
    element.addEventListener("click", (e) => {
      imageShowcase.innerHTML = element.innerHTML;
    });
  });
});

// Minimize image showcase on scroll
window.addEventListener("scroll", (e) => {
  const imageShowcase = document.querySelector(".img-showcase");
  const showcaseImage = imageShowcase.querySelector("img");

  // Only adds the scrolled classname if there is a showcase image
  if (showcaseImage) {
    if (window.scrollY > 1) {
      imageShowcase.className = "img-showcase scrolled";
    } else {
      imageShowcase.className = "img-showcase";
    }
  }
});
