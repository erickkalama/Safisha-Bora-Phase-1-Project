document.addEventListener("DOMContentLoaded", () => {
    // Event listeners for authentication buttons
    document.getElementById("login-button").addEventListener("click", () => {
        window.location.href = 'login.html';
    });

    document.getElementById("signup-button").addEventListener("click", () => {
        window.location.href = 'signup.html';
    });

    // Event listeners for tab links
    let tabLinks = document.querySelectorAll(".tab-links");
    let tabContents = document.querySelectorAll(".tab-contents");

    tabLinks.forEach(tabLink => {
        tabLink.addEventListener("click", (event) => {
            openTab(event.currentTarget.getAttribute("data-tab"));
        });
    });

    // Fetch services when the page loads
    fetchServices();

    function fetchServices() {
        fetch("http://localhost:3000/SafishaBora")
        // Make a GET request to the server
            .then(response => response.json())
            // Parse the JSON from the response
            .then(services => displayServices(services))
            // Call displayServices with the parsed data
            .catch(error => console.error("Error fetching services:", error));
    }

    function displayServices(services) {
        const servicesContainer = document.getElementById('services');
        services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.innerHTML = `
                <h2>${service.name}</h2>
                <img src="${service.image}" alt="${service.name}" style="width: 100%; height: auto; border-radius: 10px;">
                <p>${service.description}</p>`;
            servicesContainer.appendChild(serviceElement);
        });
    }

    function openTab(tabName) {
        tabLinks.forEach(tabLink => {
            tabLink.classList.remove("active-link");
        });
        tabContents.forEach(tabContent => {
            tabContent.classList.remove("active-tab");
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add("active-link");
        document.getElementById(tabName).classList.add("active-tab");
    }
});
