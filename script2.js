// ===============================
// Dark Mode
// ===============================

const darkBtn = document.getElementById("darkBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkBtn.innerHTML = "☀️";
}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        darkBtn.innerHTML = "☀️";

    } else {

        localStorage.setItem("theme", "light");
        darkBtn.innerHTML = "🌙";

    }

});


// ===============================
// Live Resume Preview
// ===============================

const fields = [

    { input: "name", preview: "pname" },
    { input: "email", preview: "pemail" },
    { input: "phone", preview: "pphone" },
    { input: "address", preview: "paddress" },
    { input: "summary", preview: "psummary" },
    { input: "skills", preview: "pskills" },
    { input: "project", preview: "pproject" },
    { input: "github", preview: "pgithub" },
    { input: "linkedin", preview: "plinkedin" }

];

fields.forEach(item => {

    const input = document.getElementById(item.input);
    const preview = document.getElementById(item.preview);

    input.addEventListener("input", () => {

        preview.innerText = input.value;

    });

});


// ===============================
// Education
// ===============================

const college = document.getElementById("college");
const degree = document.getElementById("degree");

college.addEventListener("input", updateEducation);
degree.addEventListener("input", updateEducation);

function updateEducation() {

    document.getElementById("peducation").innerText =
        degree.value + " - " + college.value;

}

// ===============================
// Generate Resume Button
// ===============================

document.getElementById("previewBtn").addEventListener("click", () => {

    alert("✅ Resume Generated Successfully!");

});


// ===============================
// Profile Photo Upload
// ===============================

const photo = document.getElementById("photo");
const profilePreview = document.getElementById("profilePreview");

photo.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        profilePreview.src = e.target.result;

        localStorage.setItem("profilePhoto", e.target.result);

    };

    reader.readAsDataURL(file);

});


// ===============================
// Auto Save Form Data
// ===============================

document.querySelectorAll("input, textarea").forEach(input => {

    input.addEventListener("input", () => {

        if (input.type !== "file") {

            localStorage.setItem(input.id, input.value);

        }

    });

});


// ===============================
// Load Saved Data
// ===============================

window.addEventListener("load", () => {

    document.querySelectorAll("input, textarea").forEach(input => {

        if (input.type !== "file") {

            const value = localStorage.getItem(input.id);

            if (value) {

                input.value = value;

            }

        }

    });

    fields.forEach(item => {

        const value = localStorage.getItem(item.input);

        if (value) {

            document.getElementById(item.preview).innerText = value;

        }

    });

    updateEducation();

    const savedPhoto = localStorage.getItem("profilePhoto");

    if (savedPhoto) {

        profilePreview.src = savedPhoto;

    }

});


// ===============================
// Download Resume PDF
// ===============================

document.getElementById("downloadBtn").addEventListener("click", () => {

    const resume = document.getElementById("resume");

    const options = {

        margin: 0.5,
        filename: "My_Resume.pdf",
        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2
        },

        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }

    };

    html2pdf().set(options).from(resume).save();

});