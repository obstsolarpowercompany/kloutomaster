# Klouto core service API

<p align="center">
<a href="https://shields.io/community#backers" alt="Migrating...">
    <img src="https://img.shields.io/badge/Migrating-to-klouto-blue" />
</a>
<a href="#e">
    <img src="https://img.shields.io/badge/version-0.1.0-blue" />
</a>
</p>

# Core Services

This repository hosts the **Core Services** for our platform, encompassing all essential functionalities outside of video streaming. This service is designed as a microservice to manage various models and operations such as user management, settings, profiles, and any other core features needed across the platform.

## Overview

The Core Services microservice is a central component of our platform's architecture. It provides the backend support required for multiple operations, excluding video streaming, which is handled by a separate microservice. The functionality covered by this service includes, but is not limited to:

- **User Management**: Creating, updating, and managing user accounts and profiles.
- **Settings and Configuration**: Handling user-specific and application-wide settings.
- **Profile Management**: Enabling users to view and update their profile information.
- **Additional Models**: Supporting any additional data models and operations required by the platform, providing an inclusive backend structure.

This microservice is designed to be scalable and modular, allowing for the easy addition of new features and models as needed.

## Architecture

The core services are structured to follow a modular architecture, with each module handling a specific area of responsibility. This design aims to ensure a clean separation of concerns and maintainable code, allowing teams to easily add new features or modify existing ones.

Key components include:

- **Controller Layer**: Manages the HTTP endpoints for each feature, processing client requests.
- **Service Layer**: Implements business logic for each model and handles interactions with data repositories.
- **Data Layer**: Manages all data models and database interactions for the core features.

### Tech Stack

The core services are built using:

- **Backend Framework**: NestJs
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: (JWT, OAuth, etc.)

# Naija Prime Integration Documentation

## Overview

[Description]

## Folder Structure

```
|--- src
|    |--- database
|    |--- modules
|    |--- shared
|    |--- app.module.ts
|    |--- main.ts
|--- .env.local
|--- .gitignore
|--- package.json
|--- tsconfig.json
```

## Dependencies (Dev)

- Node.js
- TypeScript
- ts-node-dev
- [Other dependencies including nestjs' dependencies]

## Getting Started

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager, included with Node.js)
- [NestJs](https://docs.nestjs.com) (NestJS' Documentation)
- [Git](https://git-scm.com/)

## Setup Guide

#### Detailed guide on setting and starting the Application

- [Setup Guide](setup-guide.md)

## Contribution Guide

## Getting Started

#### If you don't have git on your machine, [install it](https://docs.github.com/en/get-started/quickstart/set-up-git).

## Fork this repository

Fork this repository by clicking on the fork button on the top of this page.
This will create a copy of this repository in your account.

## Clone the repository

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/clone.png" alt="clone this repository" />

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the _copy to clipboard_ icon.

Open a terminal and run the following git command:

```bash
git clone "url you just copied"
```

where "url you just copied" (without the quotation marks) is the url to this repository (your fork of this project). See the previous steps to obtain the url.

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/copy-to-clipboard.png" alt="copy URL to clipboard" />

For example:

```bash
git clone git@github.com:this-is-you/naija-prime-core.git
```

where `this-is-you` is your GitHub username. Here you're copying the contents of the first-contributions repository on GitHub to your computer.

## Create a branch

Change to the repository directory on your computer (if you are not already there):

```bash
cd naija-prime-core
```

Now create a branch using the `git switch` command:

```bash
git switch -c your-new-branch-name
```

For example:

```bash
git switch -c add-alonzo-church
```

### Make Changes

Make your changes to the codebase. Ensure your code follows the project's coding standards and guidelines.

### Run Tests

Run the existing tests to ensure your changes do not break anything. If you added new functionality, write corresponding tests.

```sh
npm run test
```

## commit those changes

If you go to the project directory and execute the command `git status`, you'll see there are changes.

Add those changes to the branch you just created using the `git add` command:

```bash
git add .
```

Stage your changes and commit them using the `git commit` command:

```bash
git commit -m "your commit message"
```

## Push changes to GitHub

Push your changes using the command `git push`:

```bash
git push -u origin your-branch-name
```

replacing `your-branch-name` with the name of the branch you created earlier.

<details>
<summary> <strong>If you get any errors while pushing, click here:</strong> </summary>

- ### Authentication Error
     <pre>remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
  remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
  fatal: Authentication failed for 'https://github.com/<your-username>/first-contributions.git/'</pre>
  Go to [GitHub's tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) on generating and configuring an SSH key to your account.

</details>

## Submit your changes for review into Staging

If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button.

<img style="float: right;" src="https://firstcontributions.github.io/assets/Readme/compare-and-pull.png" alt="create a pull request" />

Now submit the pull request.

<img style="float: right;" src="https://firstcontributions.github.io/assets/Readme/submit-pull-request.png" alt="submit pull request" />

Soon your changes will be merged into the staging branch of this project. You will get a notification email once the changes have been merged.

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine using Git.

```sh
git clone https://github.com/your-username/[app-name].git
cd [app-name]
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies.

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add your environment-specific variables. You can use the provided `.env.example` file as a reference.

```sh
cp .env.example .env
```

Edit the `.env` file to match your environment configuration.

### 4. Compile TypeScript

Compile the TypeScript code to JavaScript.

```sh
npm run build
```

### 5. Run the Development Server

Start the development server with the following command. This will also watch for any changes in your code and automatically restart the server.

```sh
npm run start:dev
```

### 6. Run the Production Server

To run the application in a production environment, use the following command:

```sh
npm run start
```

### 7. Verify the Setup

Open your browser and navigate to `http://localhost:3000/api/v1/` to verify that the application is running correctly.

## Folder Structure

Here's an overview of the project's folder structure:

```
|--- src
|    |--- controllers
          |--- v1
|    |--- database
|    |--- interfaces
|    |--- middlewares
|    |--- routes
|         |--- v1
|    |--- services
|    |--- utils
|    |--- server.ts
|--- .env
|--- app.ts
|--- .gitignore
|--- package.json
|--- tsconfig.json
```

## Scripts

Here are some useful npm scripts that you can use during development and production:

- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm run start:dev`: Starts the development server with live reloading.
- `npm run start`: Starts the production server.
- `npm run test`: Runs the test suite (if available).
- `npm run lint`: Runs the linter to check for code style issues.

## Additional Resources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express Documentation](https://expressjs.com/)

By following these steps, you should have your Node.js and TypeScript application up and running. If you encounter any issues, please refer to the documentation of the respective tools or seek help from the community.

## API Endpoints

All API endpoints can be referenced in the [API Reference](API_REFERENCE.md) document.

## Versioning

This project is versioned to ensure backward compatibility and easy maintenance. The current version is [version].
