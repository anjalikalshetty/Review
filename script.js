let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

if (darkMode) {
    document.body.classList.add("dark");
}

function addReview() {
    const username = document.getElementById("username").value;
    const comment = document.getElementById("comment").value;
    const rating = document.getElementById("rating").value;

    if (!username || !comment || !rating) {
        alert("Please fill all fields");
        return;
    }

    const review = {
        username,
        comment,
        rating,
        time: new Date().toLocaleString()
    };

    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayReviews();

    document.getElementById("username").value = "";
    document.getElementById("comment").value = "";
    document.getElementById("rating").value = "";
}

function displayReviews() {
    const reviewsDiv = document.getElementById("reviews");
    reviewsDiv.innerHTML = "";

    reviews.forEach((r, index) => {
        const div = document.createElement("div");
        div.classList.add("review-box");

        div.innerHTML = `
            <span class="delete-btn" onclick="deleteReview(${index})">❌</span>
            <h4>${r.username} ${r.rating}</h4>
            <small>${r.time}</small>
            <p>${r.comment}</p>
        `;

        reviewsDiv.appendChild(div);
    });
}

function deleteReview(index) {
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    displayReviews();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

displayReviews();
