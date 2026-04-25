 // ✅ Firebase CDN imports
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { 
            getAuth, 
            signInWithEmailAndPassword, 
            onAuthStateChanged, 
            GoogleAuthProvider, 
            signInWithPopup 
        } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

        // ✅ YOUR CONFIG
        const firebaseConfig = {
            apiKey: "AIzaSyDtWPGZedQ2gwGYGDyJNc4-rM3LbWUsMtY",
            authDomain: "renukacutlary.firebaseapp.com",
            projectId: "renukacutlary",
            storageBucket: "renukacutlary.firebasestorage.app",
            messagingSenderId: "822608333582",
            appId: "1:822608333582:web:044c9635805ba5125fa55f"
        };

        // ✅ Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        // ✅ Make auth and provider available globally for inline handlers
        window.auth = auth;
        window.provider = provider;
        window.signInWithPopup = signInWithPopup;

        // ✅ CHECK LOGIN STATE
        onAuthStateChanged(auth, (user) => {
            console.log(user ? "User logged in" : "User not logged in");
        });

        // ✅ GOOGLE LOGIN FUNCTION
        window.googleLogin = function () {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    localStorage.setItem("customerName", user.displayName);
                    localStorage.setItem("customerEmail", user.email);
                    localStorage.setItem("isLoggedIn", "true");
                    window.location.href = "profile.html";
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.message);
                });
        };

        // ✅ LOGOUT FUNCTION
        window.logout = function () {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("customerName");
            localStorage.removeItem("customerEmail");
            window.location.href = "login.html";
        };

        // ✅ PROTECT PROFILE PAGE
        if (window.location.pathname.includes("profile.html")) {
            if (localStorage.getItem("isLoggedIn") !== "true") {
                window.location.href = "login.html";
            }
        }

        // ✅ DOM CONTENT AND EVENT LISTENERS
        document.addEventListener("DOMContentLoaded", () => {
            console.log("DOM fully loaded");

            // 🔥 HERO IMAGE SLIDER (Updated selector to match your HTML)
            const hero = document.querySelector('.hero1');
            if (hero) {
                const images = [
                    'url("https://placehold.co/1920x600/f9f3ec/8b5a2b?text=Banner+1")',
                    'url("https://placehold.co/1920x600/fefaf7/b1624b?text=Banner+2")',
                    'url("https://placehold.co/1920x600/f8f0e5/8b4513?text=Banner+3")'
                ];
                let index = 0;
                setInterval(() => {
                    index = (index + 1) % images.length;
                    hero.style.backgroundImage = images[index];
                }, 2500);
            }

            // 🔥 SCROLL ANIMATION
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle('show', entry.isIntersecting);
                });
            }, { threshold: 0.2 });

            document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

            // 🔥 PROFILE ICON CLICK (Updated ID to match your HTML)
            const profileIcon = document.getElementById("profileIcon");
            if (profileIcon) {
                profileIcon.addEventListener("click", () => {
                    const isLoggedIn = localStorage.getItem("isLoggedIn");
                    window.location.href = isLoggedIn === "true" ? "profile.html" : "login.html";
                });
            }

            // 🔥 EMAIL LOGIN (if on login page)
            const loginForm = document.getElementById("loginForm");
            if (loginForm) {
                loginForm.addEventListener("submit", function(e) {
                    e.preventDefault();
                    const email = document.getElementById("email").value;
                    const pass = document.getElementById("password").value;
                    signInWithEmailAndPassword(auth, email, pass)
                        .then(() => {
                            alert("Login successful!");
                            localStorage.setItem("isLoggedIn", "true");
                            localStorage.setItem("customerEmail", email);
                            window.location.href = "profile.html";
                        })
                        .catch(err => alert(err.message));
                });
            }

            // 🔥 GOOGLE BUTTON (if on login page)
            const googleBtn = document.getElementById("googleBtn");
            if (googleBtn) {
                googleBtn.addEventListener("click", () => {
                    signInWithPopup(auth, provider)
                        .then((result) => {
                            const user = result.user;
                            localStorage.setItem("customerName", user.displayName);
                            localStorage.setItem("customerEmail", user.email);
                            localStorage.setItem("isLoggedIn", "true");
                            window.location.href = "Profile.html";
                        })
                        .catch((error) => {
                            console.error(error);
                            alert(error.message);
                        });
                });
            }
        });
         function handleProfileClick() {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        window.location.href = isLoggedIn === "true" ? "Profile.html" : "login.html";
    } 