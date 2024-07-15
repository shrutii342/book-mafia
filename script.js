document.addEventListener("DOMContentLoaded", () => {
    const moodButton = document.getElementById("moodButton");
    const moodSelection = document.getElementById("moodSelection");
    const recommendations = document.getElementById("recommendations");
    const bookList = document.getElementById("bookList");

    const books = {
        happy: ["The Happiness Project by Gretchen Rubin", "Eleanor Oliphant Is Completely Fine by Gail Honeyman"],
        sad: ["The Fault in Our Stars by John Green", "A Little Life by Hanya Yanagihara"],
        excited: ["The Martian by Andy Weir", "Ready Player One by Ernest Cline"],
        relaxed: ["The Alchemist by Paulo Coelho", "Where the Crawdads Sing by Delia Owens"]
    };

    moodButton.addEventListener("click", () => {
        moodSelection.classList.toggle("hidden");
    });

    document.querySelectorAll(".moodOption").forEach(button => {
        button.addEventListener("click", () => {
            const mood = button.getAttribute("data-mood");
            showRecommendations(mood);
        });
    });

    function showRecommendations(mood) {
        bookList.innerHTML = "";
        books[mood].forEach(book => {
            const li = document.createElement("li");
            li.textContent = book;
            bookList.appendChild(li);
        });
        recommendations.classList.remove("hidden");
    }
});
