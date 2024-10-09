const courseInput = document.getElementById("course");
const unitsSelect = document.getElementById("units");
const scoreInput = document.getElementById("score");
const form = document.querySelector("form");
const tableBody = document.getElementById("table");

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editCourseInput = document.getElementById("editCourse");
const editUnitsSelect = document.getElementById("editUnits");
const editScoreInput = document.getElementById("editScore");
const closeModal = document.querySelector(".close");
const cancelButton = document.getElementById("cancelButton");
const resetButton = document.getElementById("reset");

let editingRow = null;

courseInput.addEventListener("input", (event) => {
  event.target.value = event.target.value.toUpperCase();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const course = formData.get("course");
  const units = formData.get("units");
  const score = formData.get("score");

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

  console.log(`Course: ${course}, Units: ${units}, Score: ${score}`);

  // Create a new row and cells
  const newRow = document.createElement("tr");
  const courseCell = document.createElement("td");
  const unitsCell = document.createElement("td");
  const scoreCell = document.createElement("td");
  const actionCell = document.createElement("td");

  // Set the text content of the cells
  courseCell.textContent = course;
  unitsCell.textContent = units;
  scoreCell.textContent = score;

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
      // Remove the row from the table
      tableBody.removeChild(newRow);
      console.log(`Delete ${course}`);
      alert(`Course ${course} has been deleted!`);
    }
  });

  // Append buttons to the action cell
  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);

  // Append the cells to the row
  newRow.appendChild(courseCell);
  newRow.appendChild(unitsCell);
  newRow.appendChild(scoreCell);
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
  const units = formData.get("units");
  const score = formData.get("score");

  // Update the existing row
  if (editingRow) {
    editingRow.cells[0].textContent = course;
    editingRow.cells[1].textContent = units;
    editingRow.cells[2].textContent = score;
    editingRow = null;
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

resetButton.addEventListener("click", () => {
  // Clear all rows in the table body
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
});
