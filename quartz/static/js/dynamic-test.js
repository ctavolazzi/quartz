document.addEventListener('DOMContentLoaded', function() {
  console.log('JavaScript loaded and running');

  // Set Greeting Message
  const greetingElement = document.getElementById('greeting-message');
  if (greetingElement) {
    console.log('Found greeting element');
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
    console.log('Found quote element');
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
