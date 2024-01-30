const jwt = require('jsonwebtoken');

module.exports = async function (context, req) {
    context.log('Login function processed a request.');

    // Get username and password from the request
    const { username, password } = req.query;

    // Validate username as a valid email
    if (!isValidEmail(username)) {
        context.res = {
            status: 400,
            body: "Invalid email address"
        };
        return;
    }

    // Perform authentication and generate JWT
    const jwtToken = generateJwtToken(username);

    context.res = {
        body: jwtToken
    };
};

// Validate email address
function isValidEmail(email) {
    try {
        const addr = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        return addr.test(email);
    } catch (error) {
        return false;
    }
}

// Generate JWT token (You'll need to implement this logic)
function generateJwtToken(username) {
    // Implement JWT generation logic here
    // Example: return jwt.sign({ username }, 'secretKey');
}
