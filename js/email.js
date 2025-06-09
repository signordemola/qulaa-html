// document.addEventListener("DOMContentLoaded", () => {
//   // Get references to your form, submit button, and message div
//   const contactForm = document.getElementById("form1");
//   const submitButton = document.getElementById("submitBtn"); // Using the new ID
//   const formMessage = document.getElementById("formMessage"); // Using the new ID

//   // --- IMPORTANT: Replace with your actual Vercel function URL ---
//   // Example: 'https://your-app-name.vercel.app/api/send-email'
//   const API_ENDPOINT = "https://qulaa-backend-8d3p.vercel.app/api/send-email";

//   contactForm.addEventListener("submit", async (event) => {
//     event.preventDefault(); // Stop the browser from doing its default form submission (reloading page)

//     // Disable the submit button and show a loading state
//     submitButton.disabled = true;
//     submitButton.textContent = "Sending...";
//     formMessage.style.display = "none"; // Hide any previous messages
//     formMessage.className = ""; // Clear any previous success/error styles

//     // Collect all form data using FormData API
//     const formData = new FormData(contactForm);
//     const data = {};

//     // Loop through FormData entries and build a plain object
//     // The key 'mail' from your HTML input name will be used correctly
//     // The key 'bodys' from your HTML textarea name will be used correctly
//     for (const [key, value] of formData.entries()) {
//       data[key] = value;
//     }

//     try {
//       // Send the data to your Vercel serverless function
//       const response = await fetch(API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // Tell the server we're sending JSON
//         },
//         body: JSON.stringify(data), // Convert your data object to a JSON string
//       });

//       // Parse the JSON response from your Vercel function
//       const result = await response.json();

//       // Check if the HTTP response was successful (status 200-299)
//       if (response.ok) {
//         formMessage.textContent =
//           result.message || "Message sent successfully!";
//         formMessage.style.backgroundColor = "#d4edda"; // Light green for success
//         formMessage.style.color = "#155724"; // Dark green text
//         contactForm.reset(); // Clear the form fields after successful submission
//       } else {
//         // Handle errors returned by your Vercel function
//         formMessage.textContent =
//           result.message ||
//           `Failed to send message: ${response.status} ${response.statusText}`;
//         formMessage.style.backgroundColor = "#f8d7da"; // Light red for error
//         formMessage.style.color = "#721c24"; // Dark red text
//       }
//     } catch (error) {
//       // Handle network errors (e.g., Vercel function URL is wrong, no internet)
//       console.error("Error submitting form:", error);
//       formMessage.textContent =
//         "An unexpected error occurred. Please try again later.";
//       formMessage.style.backgroundColor = "#f8d7da";
//       formMessage.style.color = "#721c24";
//     } finally {
//       // Always re-enable the button and show the message, regardless of success or failure
//       submitButton.disabled = false;
//       submitButton.textContent = "Submit";
//       formMessage.style.display = "block"; // Make the message visible
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("form1");
  const submitButton = document.getElementById("submitBtn");
  const formMessage = document.getElementById("formMessage");

  // Your recipient email for the mailto link
  const RECIPIENT_EMAIL = "sales@qulaaengineering.com";
  const EMAIL_SUBJECT = "New Website Inquiry from Qulaa Engineering"; // Hardcoded subject

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission (important!)

    // Collect form data
    const formData = new FormData(contactForm);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Basic client-side validation (optional, but good practice)
    if (!data.name || !data.company || !data.tel || !data.mail || !data.bodys) {
      formMessage.textContent = "Please fill all required fields.";
      formMessage.style.backgroundColor = "#f8d7da"; // Light red for error
      formMessage.style.color = "#721c24"; // Dark red text
      formMessage.style.display = "block";
      return; // Stop execution
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.mail)) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.backgroundColor = "#f8d7da";
      formMessage.style.color = "#721c24";
      formMessage.style.display = "block";
      return;
    }

    // Construct the email body text
    const emailBody = `
Name: ${data.name}
Company: ${data.company}
Telephone: ${data.tel}
Email: ${data.mail}
Where did you hear about us: ${data.about || "Not specified"}
Inquiry:
${data.bodys}
        `.trim(); // .trim() removes leading/trailing whitespace

    // Encode subject and body for URL
    const encodedSubject = encodeURIComponent(EMAIL_SUBJECT);
    const encodedBody = encodeURIComponent(emailBody);

    // Construct the mailto link
    const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

    try {
      // Open the user's email client
      window.location.href = mailtoLink;

      // Provide user feedback
      formMessage.textContent =
        'Your email client has opened. Please click "Send" to complete your inquiry.';
      formMessage.style.backgroundColor = "#d4edda"; // Light green for success
      formMessage.style.color = "#155724"; // Dark green text
      formMessage.style.display = "block";
      contactForm.reset(); // Clear the form fields
    } catch (error) {
      console.error("Error opening mailto link:", error);
      formMessage.textContent =
        "Failed to open email client. Please ensure one is configured.";
      formMessage.style.backgroundColor = "#f8d7da";
      formMessage.style.color = "#721c24";
      formMessage.style.display = "block";
    }
  });
});
