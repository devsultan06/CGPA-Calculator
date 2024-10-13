const courseInput = document.getElementById("course");
const unitsSelect = document.getElementById("units");
const scoreInput = document.getElementById("score");
const form = document.querySelector("form");
const tableBody = document.getElementById("table");
const progressCircle = document.getElementById("progressCircle");
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editCourseInput = document.getElementById("editCourse");
const editUnitsSelect = document.getElementById("editUnits");
const editScoreInput = document.getElementById("editScore");
const closeModal = document.querySelector(".close");
const cancelButton = document.getElementById("cancelButton");
const calculateButton = document.getElementById("calculateButton"); // Add this line

let editingRow = null;
let totalPoints = 0;
let totalUnits = 0;

courseInput.addEventListener("input", (event) => {
  event.target.value = event.target.value.toUpperCase();
});

document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("icon");

  // Change the icon after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    icon.className = "fa-solid fa-face-grin-beam-sweat"; // Change to a different icon class
  }, 5000);
});
// Wait 4 seconds before showing the CGPA calculator container
setTimeout(() => {
  document.getElementById("loader").style.display = "none";
  const messageContainer = document.getElementById("messageBox");
  messageContainer.classList.add("show");
}, 2000);
// Wait 4 seconds before showing the CGPA calculator container
setTimeout(() => {
  document.getElementById("messageBox").style.display = "none";
  const calculatorContainer = document.getElementById("calculatorContainer");
  calculatorContainer.classList.add("show");
}, 8000);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const course = formData.get("course");
  const units = parseInt(formData.get("units"), 10);
  const score = parseInt(formData.get("score"), 10);

  // Check if the course already exists
  const existingRows = tableBody.getElementsByTagName("tr");
  for (let row of existingRows) {
    if (row.cells[0].textContent === course) {
      alert("Course already exists!");
      // Clear the input fields
      courseInput.value = "";
      unitsSelect.value = "";
      scoreInput.value = "";
      return;
    }
  }

  // Calculate points based on the score
  let points;
  if (score >= 70) {
    points = 4;
  } else if (score >= 60) {
    points = 3;
  } else if (score >= 50) {
    points = 2;
  } else if (score >= 45) {
    points = 1;
  } else {
    points = 0;
  }

  // Multiply points by the unit
  const coursePoints = points * units;

  // Update total points and units
  totalPoints += coursePoints;
  totalUnits += units;

  // Compute CGPA
  const cgpa = totalPoints / totalUnits;

  // Create a new row and cells
  const newRow = document.createElement("tr");
  const courseCell = document.createElement("td");
  const unitsCell = document.createElement("td");
  const scoreCell = document.createElement("td");
  const pointsCell = document.createElement("td");
  const actionCell = document.createElement("td");

  // Set the text content of the cells
  courseCell.textContent = course;
  unitsCell.textContent = units;
  scoreCell.textContent = score;
  pointsCell.textContent = coursePoints;

  // Create Edit and Delete buttons
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit");
  editButton.addEventListener("click", () => {
    // Populate the input fields with the current row's data
    editCourseInput.value = courseCell.textContent;
    editUnitsSelect.value = unitsCell.textContent;
    editScoreInput.value = scoreCell.textContent;
    editingRow = newRow;
    editModal.style.display = "block";
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => {
    // Show confirmation dialog
    const confirmed = confirm("Are you sure you want to delete this course?");
    if (confirmed) {
      // Update total points and units
      totalPoints -= coursePoints;
      totalUnits -= units;

      // Compute CGPA
      const cgpa = totalPoints / totalUnits;

      // Remove the row from the table
      tableBody.removeChild(newRow);
      alert(`Course ${course} has been deleted!`);

      // Update the progress circle
      calculatePercentage(cgpa);
    }
  });

  // Append buttons to the action cell
  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);

  // Append the cells to the row
  newRow.appendChild(courseCell);
  newRow.appendChild(unitsCell);
  newRow.appendChild(scoreCell);
  newRow.appendChild(pointsCell);
  newRow.appendChild(actionCell);

  // Append the row to the table body
  tableBody.appendChild(newRow);

  // Clear the input fields
  courseInput.value = "";
  unitsSelect.value = "";
  scoreInput.value = "";
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(editForm);
  const course = formData.get("course");
  const units = parseInt(formData.get("units"), 10);
  const score = parseInt(formData.get("score"), 10);

  // Calculate points based on the score
  let points;
  if (score >= 70) {
    points = 4;
  } else if (score >= 60) {
    points = 3;
  } else if (score >= 50) {
    points = 2;
  } else if (score >= 45) {
    points = 1;
  } else {
    points = 0;
  }

  // Multiply points by the unit
  const coursePoints = points * units;

  // Update the existing row
  if (editingRow) {
    // Update total points and units
    const oldUnits = parseInt(editingRow.cells[1].textContent, 10);
    const oldPoints = parseInt(editingRow.cells[3].textContent, 10);
    totalPoints = totalPoints - oldPoints + coursePoints;
    totalUnits = totalUnits - oldUnits + units;

    // Compute CGPA
    const cgpa = totalPoints / totalUnits;

    editingRow.cells[0].textContent = course;
    editingRow.cells[1].textContent = units;
    editingRow.cells[2].textContent = score;
    editingRow.cells[3].textContent = coursePoints;
    editingRow = null;

    // Update the progress circle
    calculatePercentage(cgpa);
  }

  // Close the modal
  editModal.style.display = "none";
  alert(`Course ${course} is successfully updated!`);
});

closeModal.addEventListener("click", () => {
  editModal.style.display = "none";
});

cancelButton.addEventListener("click", () => {
  editModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
});

calculateButton.addEventListener("click", () => {
  const cgpa = totalPoints / totalUnits;
  calculatePercentage(cgpa);
});

function calculatePercentage(cgpa) {
  const totalCgpa = 4.0;
  const circle = document.querySelector(".progress");
  const percentageText = document.getElementById("percentageText");
  const resultText = document.getElementById("resultText");
  const progressCircle = document.getElementById("progressCircle");

  if (cgpa > 0 && cgpa <= totalCgpa) {
    const percentage = (cgpa / totalCgpa) * 100;
    const radius = 70; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    // Show the progress circle and reset it before animation
    progressCircle.style.display = "flex"; // Make it visible
    resultText.style.display = "block";
    circle.style.strokeDashoffset = circumference; // Reset the progress circle

    // Update the percentage text immediately
    percentageText.textContent = "0%";

    // Wait a tiny bit and then animate the progress fill
    setTimeout(() => {
      circle.style.strokeDashoffset = offset; // Animate the progress
      percentageText.textContent = percentage.toFixed(1) + "%"; // Update the percentage text
    }, 100); // Small delay for the animation

    resultText.textContent = `CGPA: ${cgpa.toFixed(2)}`;
  } else {
    // Hide the progress circle and result text
    progressCircle.style.display = "none";
    resultText.style.display = "none";
  }
}
