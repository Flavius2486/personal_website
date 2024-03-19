const usernameInput = document.querySelector(".username-input");
const currentPasswordInput = document.querySelector(".password-input");
const usernamePlaceholder = document.querySelector(".username-placeholder");
const passwordPlaceholder = document.querySelector(".password-placeholder");
const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (currentPasswordInput.value.length === 0) {
    currentPasswordInput.style.borderColor = "red";
    passwordPlaceholder.style.color = "red";
  }
  if (usernameInput.value.length === 0) {
    usernameInput.style.borderColor = "red";
    usernamePlaceholder.style.color = "red";
  } else {
    fetch("/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        username: usernameInput.value,
        password: currentPasswordInput.value,
       }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        if (data.login === true) {
          location.href = "/admin";
          errorMessage.style.opacity = 0;
        }else{
          usernameInput.style.borderColor = "red";
          usernamePlaceholder.style.color = "red";
          currentPasswordInput.style.borderColor = "red";
          passwordPlaceholder.style.color = "red";
          usernameInput.value = "";
          currentPasswordInput.value = "";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

currentPasswordInput.addEventListener("click", () => {
  currentPasswordInput.style.borderColor = "#fff";
  passwordPlaceholder.style.color = "#fff";
});

usernameInput.addEventListener("click", () => {
  usernameInput.style.borderColor = "#fff";
  usernamePlaceholder.style.color = "#fff";
});
