document.addEventListener("DOMContentLoaded", () => {
  // Get references to your form, submit button, and message div
  const contactForm = document.getElementById("form1");
  const submitButton = document.getElementById("submitBtn"); // Using the new ID
  const formMessage = document.getElementById("formMessage"); // Using the new ID

  // --- IMPORTANT: Replace with your actual Vercel function URL ---
  // Example: 'https://your-app-name.vercel.app/api/send-email'
  const API_ENDPOINT = "https://qulaa-backend-8d3p.vercel.app/api/send-email";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Stop the browser from doing its default form submission (reloading page)

    // Disable the submit button and show a loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formMessage.style.display = "none"; // Hide any previous messages
    formMessage.className = ""; // Clear any previous success/error styles

    // Collect all form data using FormData API
    const formData = new FormData(contactForm);
    const data = {};

    // Loop through FormData entries and build a plain object
    // The key 'mail' from your HTML input name will be used correctly
    // The key 'bodys' from your HTML textarea name will be used correctly
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    try {
      // Send the data to your Vercel serverless function
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the server we're sending JSON
        },
        body: JSON.stringify(data), // Convert your data object to a JSON string
      });

      // Parse the JSON response from your Vercel function
      const result = await response.json();

      // Check if the HTTP response was successful (status 200-299)
      if (response.ok) {
        formMessage.textContent =
          result.message || "Message sent successfully!";
        formMessage.style.backgroundColor = "#d4edda"; // Light green for success
        formMessage.style.color = "#155724"; // Dark green text
        contactForm.reset(); // Clear the form fields after successful submission
      } else {
        // Handle errors returned by your Vercel function
        formMessage.textContent =
          result.message ||
          `Failed to send message: ${response.status} ${response.statusText}`;
        formMessage.style.backgroundColor = "#f8d7da"; // Light red for error
        formMessage.style.color = "#721c24"; // Dark red text
      }
    } catch (error) {
      // Handle network errors (e.g., Vercel function URL is wrong, no internet)
      console.error("Error submitting form:", error);
      formMessage.textContent =
        "An unexpected error occurred. Please try again later.";
      formMessage.style.backgroundColor = "#f8d7da";
      formMessage.style.color = "#721c24";
    } finally {
      // Always re-enable the button and show the message, regardless of success or failure
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
      formMessage.style.display = "block"; // Make the message visible
    }
  });
});
