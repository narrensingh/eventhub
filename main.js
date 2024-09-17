// Select both buttons
const buttons = document.querySelectorAll('.ripple-btn');

// Add ripple effect to each button
buttons.forEach((button) => {
  button.addEventListener('click', function (e) {
    // Create the ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Set the ripple position
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    // Append the ripple to the button
    button.appendChild(ripple);

    // Remove the ripple after animation completes
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });
});
