// src/services/auth.js

export function login(email, password, role) {
    // I implemented the login logic, like calling an API or checking credentials
    console.log(`Logging in user with email: ${email}, password: ${password}, and role: ${role}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && role) {
          resolve({ status: "success", user: { email, role } });
        } else {
          reject("Invalid credentials");
        }
      }, 1000);
    });
  }
  
  export function signup(name, email, password, role) {
    // I implement the signup logic, similar to login
    console.log(`Signing up user with name: ${name}, email: ${email}, and role: ${role}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && role) {
          resolve({ status: "success", user: { name, email, role } });
        } else {
          reject("Failed to sign up");
        }
      }, 1000);
    });
  }
  