document.addEventListener("DOMContentLoaded", function() {
    const resultsContainer = document.getElementById("results");

    // Function to display result
    function displayResult(message) {
        resultsContainer.innerHTML = '';
        const resultElement = document.createElement("p");
        resultElement.textContent = message;
        resultsContainer.appendChild(resultElement);
    }

    // Function to check if a shortlink redirects to a specific origin link
    function checkShortlink(shortlink) {
        fetch(shortlink, { method: 'GET', redirect: 'follow' })
            .then(response => {
                if (response.redirected) {
                    const message = `Shortlink ${shortlink} redirects to ${response.url}`;
                    console.log(message);
                    displayResult(message);
                } else {
                    const message = `Shortlink ${shortlink} does not redirect properly.`;
                    console.error(message);
                    displayResult(message);
                }
            })
            .catch(error => {
                const message = `Error fetching shortlink ${shortlink}: ${error}`;
                console.error(message);
                displayResult(message);
            });
    }

    // Event listener for form submission
    document.getElementById("linkForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const shortlink = document.getElementById("shortlink").value;
        
        checkShortlink(shortlink);
    });
});