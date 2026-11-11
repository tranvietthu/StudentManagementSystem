
const API_URL = "/api/students";

let students = [];
let toastTimer;

const $ = (id) => document.getElementById(id);

// Display notification
function showToast(message, isError = false) {
    const toast = $("toast");

    clearTimeout(toastTimer);

    toast.textContent = message;
    toast.className = isError
        ? "toast show error"
        : "toast show";

    toastTimer = setTimeout(() => {
        toast.className = "toast";
    }, 3500);
}

// Send an API request
async function apiRequest(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        let message = `HTTP Error ${response.status}`;

        try {
            const data = await response.json();

            if (data.errors) {
                message = Object.values(data.errors)
                    .flat()
                    .join("; ");
            } else {
                message = data.message
                    || data.title
                    || message;
            }
        } catch {
            // Response may not contain JSON.
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// Load students from SQL Server through API
async function loadStudents() {
    try {
        students = await apiRequest(API_URL);

        renderStudents();
        updateStatistics();
    } catch (error) {
        students = [];

        renderStudents();
        updateStatistics();

        showToast(error.message, true);
    }
}

// Update dashboard statistics
function updateStatistics() {
    $("totalStudents").textContent = students.length;

    const average = students.length
        ? students.reduce(
            (sum, student) => sum + student.gpa, 0
        ) / students.length
        : 0;

    $("averageGpa").textContent = average.toFixed(2);

    const majors = new Set(
        students.map(s => s.major.trim().toLowerCase())
    );

    $("totalMajors").textContent = majors.size;
}

// Render students table
function renderStudents() {
    const tbody = $("studentsTable");
    const keyword = $("searchInput")
        .value.trim().toLowerCase();

    tbody.replaceChildren();

    const filtered = students.filter(student => {
        return [
            student.studentCode,
            student.fullName,
            student.email,
            student.major
        ].some(value =>
            String(value ?? "")
                .toLowerCase()
                .includes(keyword)
        );
    });

    if (filtered.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 8;
        td.textContent = "Không tìm thấy sinh viên.";

        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    filtered.forEach(student => {
        const tr = document.createElement("tr");

        const values = [
            student.id,
            student.studentCode,
            student.fullName,
            student.age,
            student.email,
            student.major,
            Number(student.gpa).toFixed(2)
        ];

        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });

        const actionCell = document.createElement("td");
        const actions = document.createElement("div");

        actions.className = "action-buttons";

        const editButton = document.createElement("button");
        editButton.textContent = "Sửa";
        editButton.className =
            "btn btn-secondary btn-small";

        editButton.addEventListener("click", () => {
            openEditForm(student.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Xóa";
        deleteButton.className =
            "btn btn-danger btn-small";

        deleteButton.addEventListener("click", () => {
            deleteStudent(student.id);
        });

        actions.append(editButton, deleteButton);
        actionCell.appendChild(actions);
        tr.appendChild(actionCell);

        tbody.appendChild(tr);
    });
}

// Open form for creating student
function openAddForm() {
    $("studentForm").reset();
    $("studentId").value = "";
    $("formTitle").textContent = "Thêm sinh viên";

    $("studentDialog").showModal();
}

// Open form for editing student
function openEditForm(id) {
    const student = students.find(s => s.id === id);

    if (!student) {
        showToast("Không tìm thấy sinh viên.", true);
        return;
    }

    $("studentId").value = student.id;
    $("studentCode").value = student.studentCode;
    $("fullName").value = student.fullName;
    $("age").value = student.age;
    $("email").value = student.email;
    $("major").value = student.major;
    $("gpa").value = student.gpa;

    $("formTitle").textContent = "Cập nhật sinh viên";
    $("studentDialog").showModal();
}

// Save student by POST or PUT
async function saveStudent(event) {
    event.preventDefault();

    const id = $("studentId").value;
    const isEdit = id !== "";

    const student = {
        studentCode: $("studentCode").value.trim(),
        fullName: $("fullName").value.trim(),
        age: Number($("age").value),
        email: $("email").value.trim(),
        major: $("major").value.trim(),
        gpa: Number($("gpa").value)
    };

    // Client-side validation
    if (!student.studentCode ||
        !student.fullName ||
        !student.email ||
        !student.major ||
        !Number.isInteger(student.age) ||
        student.age < 16 ||
        student.age > 100 ||
        !Number.isFinite(student.gpa) ||
        student.gpa < 0 ||
        student.gpa > 4) {

        showToast("Dữ liệu nhập không hợp lệ.", true);
        return;
    }

    const url = isEdit
        ? `${API_URL}/${id}`
        : API_URL;

    const method = isEdit ? "PUT" : "POST";

    $("saveBtn").disabled = true;

    try {
        await apiRequest(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        $("studentDialog").close();

        showToast(
            isEdit
                ? "Cập nhật sinh viên thành công!"
                : "Thêm sinh viên thành công!"
        );

        await loadStudents();
    } catch (error) {
        showToast(error.message, true);
    } finally {
        $("saveBtn").disabled = false;
    }
}

// Delete student
async function deleteStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) {
        return;
    }

    const confirmed = confirm(
        `Bạn có chắc muốn xóa ${student.fullName}?`
    );

    if (!confirmed) {
        return;
    }

    try {
        await apiRequest(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        showToast("Xóa sinh viên thành công!");
        await loadStudents();
    } catch (error) {
        showToast(error.message, true);
    }
}

// Initialize events
document.addEventListener("DOMContentLoaded", () => {
    $("addStudentBtn").addEventListener(
        "click", openAddForm
    );

    $("studentForm").addEventListener(
        "submit", saveStudent
    );

    $("searchInput").addEventListener(
        "input", renderStudents
    );

    $("closeDialogBtn").addEventListener("click", () => {
        $("studentDialog").close();
    });

    $("cancelBtn").addEventListener("click", () => {
        $("studentDialog").close();
    });

    loadStudents();
});
