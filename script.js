document.getElementById("lecturerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const responseMessage = document.getElementById("responseMessage");

    // Check for duplicate email
    const email = formData.get("email");
    const checkResponse = await fetch(`https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec?email=${email}`);
    const checkData = await checkResponse.json();

    if (checkData.exists) {
        responseMessage.innerText = "Error: This email is already registered.";
        return;
    }

    // Send data to Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    responseMessage.innerText = data.message;
});

// Function to add more colleges
function addCollege() {
    let div = document.createElement("div");
    div.innerHTML = `<label>College: <input type="text" name="colleges[]" required></label>`;
    document.getElementById("colleges").appendChild(div);
}

// Function to add more courses
function addCourse() {
    let div = document.createElement("div");
    div.innerHTML = `<label>Course: <input type="text" name="courses[]" required></label>`;
    document.getElementById("courses").appendChild(div);
}

// Function to add more Bachelor qualifications
function addBachelor() {
    let div = document.createElement("div");
    div.innerHTML = `
        <label>University: <input type="text" name="bachelor_university[]" required></label>
        <label>City: <input type="text" name="bachelor_city[]" required></label>
        <label>Country: <input type="text" name="bachelor_country[]" required></label>
        <label>Upload Certificate: <input type="file" name="bachelor_certificate[]" required></label>
    `;
    document.getElementById("qualifications").appendChild(div);
}

