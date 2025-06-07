document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value;
  const company = document.getElementById("company").value;
  const inquiry = document.getElementById("inquiry").value;
  const hear = document.getElementById("hear").value;

  // Create email body
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${inquiry}`;

  // Create mailto link
  const mailtoLink = `mailto:xinai.leunghr@qulaaengineering.com?subject=New%20Form%20Submission&body=${encodeURIComponent(
    body
  )}`;

  // Open email client
  window.location.href = mailtoLink;

  // Optional: Reset form
  document.getElementById("form1").reset();
});
