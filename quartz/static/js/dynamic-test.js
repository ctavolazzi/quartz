document.addEventListener('DOMContentLoaded', function() {
  console.log('JavaScript loaded and running');

  // Update Daily Note Link
  const dailyLink = document.getElementById('daily-note-link');
  if (dailyLink) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dailyLink.href = `/${yyyy}-${mm}-${dd}/`;
    console.log(`Daily Note Link set to: /${yyyy}-${mm}-${dd}/`);
  } else {
    console.warn('Daily Note link element not found');
  }

  // Set Greeting Message
  const greetingElement = document.getElementById('greeting-message');
  if (greetingElement) {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) {
      greeting = "Good morning! 🌞";
    } else if (hour < 18) {
      greeting = "Good afternoon! ☀️";
    } else {
      greeting = "Good evening! 🌜";
    }
    greetingElement.innerText = greeting;
    console.log(`Greeting set to: ${greeting}`);
  } else {
    console.warn('Greeting element not found');
  }

  // Display Random Quote
  const quoteElement = document.getElementById('daily-quote');
  if (quoteElement) {
    const quotes = [
      "Stay curious, stay inspired!",
      "Every day is a chance to learn something new.",
      "Believe in your potential and keep growing.",
      "Create with passion and purpose."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.innerText = randomQuote;
    console.log(`Quote set to: ${randomQuote}`);
  } else {
    console.warn('Quote element not found');
  }
});
