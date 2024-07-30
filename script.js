// Get the canvas element with id 'matrix' and its 2D drawing context
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set the canvas size to the full width and height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to be used in the matrix effect - a mix of symbols, uppercase, lowercase letters, and numbers
const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+[]{}|;:,.<>?/`~';
const fontSize = 16; // Set the font size for the characters
const columns = canvas.width / fontSize; // Calculate the number of columns based on canvas width and font size

// Array to store the y-coordinate (drop position) for each column
const drops = Array.from({ length: columns }).fill(1);

// Function to draw the matrix effect
function draw() {
    // Fill the canvas with a translucent black rectangle to create the trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color to green and the font style
    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;

    // Loop through each drop position (each column)
    for (let i = 0; i < drops.length; i++) {
        // Select a random character from matrixChars
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        // Calculate the x-coordinate based on the column index and font size
        const x = i * fontSize;
        // Calculate the y-coordinate based on the drop position and font size
        const y = drops[i] * fontSize;

        // Draw the character at the calculated x and y coordinates
        ctx.fillText(text, x, y);
        
        // Randomly reset the drop position to the top with a small probability
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment the y-coordinate for the next frame
        drops[i]++;
    }
}

// Set up the animation loop to call the draw function every 50 milliseconds
setInterval(draw, 50);

// Resize the canvas and reset drop positions when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; // Update canvas width
    canvas.height = window.innerHeight; // Update canvas height
    drops.fill(1); // Reset all drop positions to the top
});
