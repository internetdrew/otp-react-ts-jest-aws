# Building and Testing an OTP UI Component with React and TypeScript

## Table of Contents

- [What You'll Learn](#what-youll-learn)
- [Installation](#installation)
- [Having an Issue?](#having-an-issue)

## What We'll Cover

![screenshot](/otp-screenshot.png)

- The basics of building a One-Time Password (OTP) UI Component with React and TypeScript.
- How to leverage React Hook Form and Zod for front-end UI validation.
- How to use Jest to test user interactions with your component.
- **Bonus:** How to mock AWS Amplify API calls.
  - While this is not necessary, I built this original component while leveraging AWS Amplify, and testing/mocking it has very little documentation.

## Installation

Here's how you can get this project up and running on your local machine:

1. Create your directory:

   ```sh
   mkdir otp-react-ts
   ```

2. Change to your directory:

   ```sh
   cd otp-react-ts
   ```

3. Clone the repo:

   ```sh
   git clone https://github.com/internetdrew/otp-react-ts-vitest.git .
   ```

4. Fetch remote branches:

   ```sh
   git fetch --all
   ```

5. Checkout remote branches

   ```sh
   git checkout -b starter origin/starter
   ```

   ```sh
   git checkout -b final origin/final
   ```

6. Check into the branch you want. Not sure which you want? [Find out based on the route you want to take through the post](https://www.internetdrew.com/blog/building-testing-otp-ui-component-react-typescript#getting-started).

   ```sh
   git checkout <branch-name>
   ```

7. Install dependencies (you will need to do this for each respective branch):

   ```sh
   npm i
   ```

8. Run the development server:

   ```sh
   npm run dev
   ```

9. Open [localhost:5173](http://localhost:5173) in your browser to see your updates live with hot reloads.

## Having an Issue?

Feel free to reach out to me via [Twitter](https://x.com/_internetdrew), [LinkedIn](https://www.linkedin.com/in/internetdrew/), or [message me directly](https://www.internetdrew.com/#connect).
