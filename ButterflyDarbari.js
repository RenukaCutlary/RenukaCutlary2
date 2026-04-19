// ================= FIREBASE IMPORT =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 YOUR CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDtWPGZedQ2gwGYGDyJNc4-rM3LbWUsMtY",
  authDomain: "renukacutlary.firebaseapp.com",
  projectId: "renukacutlary",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================= IMAGE LOGIC =================
const images = [
  "butterflu darbari.jpeg",
  "butterflu darbari2.jpeg",
  "butterflu darbari3.jpeg",
  "butterflu darbari4.jpeg",
  "butterflu darbari5.jpeg",
  "butterflu darbari6.jpeg",
  "butterflu darbari7.jpeg",
  "butterflu darbari8.jpeg",
  "butterflu darbari9.jpeg",
  "butterflu darbari10.jpeg",
];

let currentIndex = 0;

function showImage(){
  document.getElementById("mainImage").src = images[currentIndex];
}

window.nextImage = function(){
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

window.prevImage = function(){
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}

window.changeImage = function(element){
  let mainImage = document.getElementById("mainImage");
  mainImage.src = element.src;
  currentIndex = images.indexOf(element.src.split('/').pop());
}

// ================= ✅ FIXED ADD TO CART =================
window.addCurrentImageToCart = async function () {
  try {

    const user = auth.currentUser;

    // 🔥 CHECK LOGIN
    if (!user) {
      alert("Please login first!");
      window.location.href = "login.html";
      return;
    }

    const product = {
      name: "Butterfly Darbari",
      price: 819,
      image: document.getElementById("mainImage").src,
      userId: user.uid
    };

    // ✅ UNIQUE ID (so items don't overwrite)
    const productId = Date.now().toString();

    await setDoc(doc(db, "cart", user.uid, "items", productId), product);

    alert("Added to cart successfully");
    window.location.href = "cart.html";

  } catch (error) {
    console.error("Add to cart error:", error);
    alert(error.message); // 🔥 SHOW REAL ERROR
  }
};