// Inline editing and CRUD operations
document.addEventListener("DOMContentLoaded", () => {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const modal = document.getElementById("modal");
    const addBtn = document.getElementById("addBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const addForm = document.getElementById("addForm");

    addBtn.addEventListener("click", () => modal.classList.remove("hidden"));
    cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

    // Add student
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch("/students/add/", {
            method: "POST",
            headers: { "X-CSRFToken": csrftoken },
            body: new FormData(addForm)
        })
        .then(r => r.json())
        .then(data => {
            if (data.success) window.location.reload();
            else alert("Error: " + JSON.stringify(data.errors));
        });
    });

    // Inline edit
    document.querySelectorAll(".editable").forEach(cell => {
        cell.addEventListener("blur", () => {
            const tr = cell.closest("tr");
            const id = tr.dataset.id;
            const field = cell.dataset.field;
            const value = cell.textContent.trim();

            fetch(`/students/${id}/update/`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded", "X-CSRFToken": csrftoken },
                body: new URLSearchParams({ field, value })
            });
        });
        cell.setAttribute("contenteditable", "true");
    });

    // Delete
    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.closest("tr").dataset.id;
            if (!confirm("Delete this student?")) return;
            fetch(`/students/${id}/delete/`, {
                method: "POST",
                headers: { "X-CSRFToken": csrftoken },
            })
            .then(() => window.location.reload());
        });
    });
});
