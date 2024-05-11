#! /use/bin/env node
import inquirer from "inquirer";

// Function to generate random user data
function generateRandomUserData(): { userId: string, pin: string, balance: number } {
    const userId = Math.random().toString(36).substr(2, 8); // Random user ID
    const pin = Math.random().toString().slice(2, 6); // Random PIN
    const balance = Math.floor(Math.random() * 10000); // Random balance between 0 and 10000
    return { userId, pin, balance };
}

// Function to authenticate user
async function authenticateUser(users: { userId: string, pin: string, balance: number }[]): Promise<{ userId: string, balance: number } | undefined> {
    const { userId, pin } = await inquirer.prompt([
        {
            name: "userId",
            type: "input",
            message: "Enter User ID:"
        },
        {
            name: "pin",
            type: "password",
            message: "Enter PIN:"
        }
    ]);

    const user = users.find(u => u.userId === userId && u.pin === pin);
    return user;
}

// ATM functionalities
async function atmFunctionality(user: { userId: string, balance: number }): Promise<void> {
    console.log(`Welcome, ${user.userId}! Your current balance is $${user.balance}`);

    const { option } = await inquirer.prompt({
        name: "option",
        type: "list",
        message: "Select an option:",
        choices: ["Check Balance", "Deposit Money", "Withdraw Money", "Exit"]
    });

    switch (option) {
        case "Check Balance":
            console.log(`Your current balance is $${user.balance}`);
            break;
        case "Deposit Money":
            // Implement deposit money logic
            break;
        case "Withdraw Money":
            // Implement withdraw money logic
            break;
        case "Exit":
            console.log("Exiting ATM. Thank you!");
            return;
    }

    await atmFunctionality(user);
}

// Main function
async function main() {
    const numberOfUsers = 5;
    const users = Array.from({ length: numberOfUsers }, () => generateRandomUserData());

    console.log("Welcome to the ATM!");

    const user = await authenticateUser(users);
    if (user) {
        console.log("Authentication successful!");
        await atmFunctionality(user);
    } else {
        console.log("Invalid User ID or PIN. Please try again.");
    }
}

main();
