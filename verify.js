document.getElementById("sendOtpBtn").addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    if (!email) {
        alert("Enter email!");
        return;
    }

    const res = await fetch("https://my-backend1-2-zz2k.onrender.com/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const data = await res.json();
    document.getElementById("message").innerText = data.message;

    if (data.success) {
        document.getElementById("otpSection").style.display = "block";
    }
});

document.getElementById("verifyOtpBtn").addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const otp = document.getElementById("otpInput").value;

    const res = await fetch("https://my-backend1-2-zz2k.onrender.com/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
    });

    const data = await res.json();
    document.getElementById("message").innerText = data.message;
// after successful verification
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("userEmail", verifiedEmail); // optional but useful

window.location.href = "index.html";
});
function verificationSuccess() {
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "index.html"; // or profile.html
}
// AFTER OTP IS VERIFIED SUCCESSFULLY
localStorage.setItem("isLoggedIn", "true");

// (optional but recommended)
localStorage.setItem("userVerified", "true");

// Redirect after login
window.location.href = "index.html"; // or Profile.html
then(data => {
  if (data.success) {
    const email = localStorage.getItem("email");

    // ✅ THIS IS THE LOGIN FLAG
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    window.location.href = "index.html";
  } else {
    alert("Invalid OTP");
  }
});
