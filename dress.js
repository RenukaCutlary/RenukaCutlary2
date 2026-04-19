function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      image: image,
      quantity: 1
    });
  }

  const email = localStorage.getItem("customerEmail");
localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
  alert(name + " added to cart");
}


/* PRODUCT IMAGE SLIDER */

document.querySelectorAll(".slider").forEach(slider => {

  const images = slider.querySelectorAll(".product-img");
  let index = 0;

  // show first image
  images[index].classList.add("active");

  const rightBtn = slider.querySelector(".right");
  const leftBtn = slider.querySelector(".left");

  rightBtn.addEventListener("click", () => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  });

  leftBtn.addEventListener("click", () => {
    images[index].classList.remove("active");
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add("active");
  });

});
document.querySelectorAll(".slider").forEach(slider => {

  const images = slider.querySelectorAll(".product-img");
  let index = 0;

  const right = slider.querySelector(".right");
  const left = slider.querySelector(".left");

  right.addEventListener("click", () => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  });

  left.addEventListener("click", () => {
    images[index].classList.remove("active");
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add("active");
  });

});
const cards = document.querySelectorAll(".dress-card");
const mainImg = document.querySelector(".product-img");

cards.forEach(card=>{
card.addEventListener("click", ()=>{

cards.forEach(c=>c.classList.remove("active"));
card.classList.add("active");

let img = card.getAttribute("data-img");
mainImg.src = img;

});
});