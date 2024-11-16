module.exports = async function (tp) {
  const quotes = [
    "Do the best you can until you know better. Then when you know better, do better. — Maya Angelou",
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Life is what happens when you're busy making other plans. — John Lennon",
    "The journey of a thousand miles begins with one step. — Lao Tzu",
    "You miss 100% of the shots you don't take. — Wayne Gretzky",
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
