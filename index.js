const courseInput = document.getElementById("course");
const form = document.querySelector("form");
courseInput.addEventListener("input", (event) => {
  event.target.value = event.target.value.toUpperCase();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Add your logic to handle the form submission here
  console.log("Form submitted");
});
