# SauceDemo Playwright Automation

This project uses [Playwright](https://playwright.dev/) to automate testing for the [SauceDemo](https://www.saucedemo.com/) application.

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/saucedemo-playwright.git
    cd saucedemo-playwright
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```
3. **Install Playwright Browsers**

    ```bash
    npm init playwright@latest
    ```

## Running Tests

- **Run All Tests**

    ```bash
    npx playwright test
    ```
    ```bash
    npm run test
    ```
    

- **Run Tests in Headed Mode (with browser UI)**

    ```bash
    npx playwright test --headed
    ```
    ```bash
    npm run test:headed
    ```

- **Update Snapshots**

    If the UI has changed and you need to update the baseline screenshots:

    ```bash
    npx playwright test --update-snapshots
    ```
    ```bash
    npm run update:snapshots
    ```

- **View Test Report**

    After running tests, view an HTML report:

    ```bash
    npx playwright show-report
    ```
    ```bash
    npm run test:report
    ```
