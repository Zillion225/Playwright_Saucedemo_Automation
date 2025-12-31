# SauceDemo Automation Framework

A comprehensive end-to-end (E2E) testing framework for the SauceDemo e-commerce application, built with [Playwright](https://playwright.dev/). This framework implements the Page Object Model (POM) pattern and utilizes YAML-based configuration for test data and locator management, ensuring maintainable and scalable test automation.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Test Data Management](#test-data-management)
- [Reporting](#reporting)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## Overview

This automation framework provides comprehensive test coverage for the SauceDemo application, including:

- User authentication flows (standard, problem, error, visual, performance glitch, and locked out users)
- Product inventory interactions
- Shopping cart operations
- Checkout processes
- End-to-end purchase workflows

The framework is designed with maintainability and scalability in mind, using industry-standard patterns and practices.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm
- **Git**: For cloning the repository

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zillion225/Playwright_Saucedemo_Automation.git
   cd Playwright_Saucedemo_Automation
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```

## Project Structure

```
.
├── data/
│   └── testData/                    # YAML files containing test data
│       ├── saucedemo_inventory.yaml
│       └── saucedemo_testdata.yaml
├── locator/
│   └── saucedemo/                   # YAML files containing element locators
│       └── locator.yaml
├── pageObject/
│   └── saucedemo/                   # Page Object Model classes
│       ├── saucedemo_cart.po.js
│       ├── saucedemo_checkout.po.js
│       ├── saucedemo_checkoutOverview.po.js
│       ├── saucedemo_common.po.js
│       ├── saucedemo_complete.po.js
│       ├── saucedemo_inventory.po.js
│       └── saucedemo_login.po.js
├── settings/
│   └── web.yaml                     # Web application settings
├── tests/
│   └── saucedemo.spec.js            # Test specifications
├── utility/
│   └── commonUtility.js             # Common utility functions
├── playwright.config.js              # Playwright configuration
├── package.json                      # Project dependencies and scripts
└── README.md                         # Project documentation
```

### Directory Descriptions

- **`data/testData/`**: Contains YAML files with test data including user credentials, product information, and test scenarios
- **`locator/`**: Centralized storage for element locators in YAML format, enabling easy maintenance and updates
- **`pageObject/`**: Page Object Model classes that encapsulate page-specific logic and interactions
- **`settings/`**: Configuration files for application settings
- **`tests/`**: Test specification files containing test cases
- **`utility/`**: Reusable utility functions and helper methods

## Running Tests

### Basic Commands

| Command | Description |
|---------|-------------|
| `npm test` | Runs all tests in headless mode |
| `npx playwright test` | Runs all tests in headless mode |
| `npx playwright test --headed` | Runs tests with the browser visible |
| `npx playwright test --ui` | Opens the interactive UI Mode for test execution |
| `npx playwright test --project=chromium` | Runs tests only on Chromium browser |
| `npx playwright show-report` | Opens the last generated HTML report |

### Debugging

To debug a specific test file:

```bash
npx playwright test tests/saucedemo.spec.js --debug
```

This opens Playwright Inspector, allowing you to step through tests, inspect elements, and view execution traces.

### Running Specific Tests

To run a specific test by name:

```bash
npx playwright test -g "test name"
```

## Configuration

The framework configuration is managed in `playwright.config.js`. Key settings include:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled by default
- **Retries**: 2 retries on CI, 0 locally
- **Reporter**: HTML reporter
- **Trace**: Enabled for debugging failed tests
- **Video**: Enabled for test recordings
- **Browser**: Currently configured for Chromium

To modify browser configurations or add additional projects, edit the `projects` array in `playwright.config.js`.

## Test Data Management

Test data is managed through YAML files located in `data/testData/`. This approach provides:

- **Separation of concerns**: Test logic is separated from test data
- **Easy maintenance**: Update test data without modifying test code
- **Data reusability**: Share test data across multiple test cases
- **Version control**: Track changes to test data independently

### Locator Management

Element locators are stored in YAML format within the `locator/` directory. This centralized approach:

- Simplifies locator updates when UI changes
- Reduces code duplication
- Improves maintainability
- Enables easier collaboration

## Reporting

The framework uses Playwright's built-in HTML reporter for test results.

- **Report Location**: `playwright-report/`
- **Automatic Artifacts**: Screenshots, videos, and traces are automatically captured for failed tests
- **View Reports**: Run `npx playwright show-report` to view the latest test report

Reports include:
- Test execution summary
- Pass/fail status
- Execution time
- Screenshots and videos for failed tests
- Execution traces for debugging

## Best Practices

This framework follows industry best practices:

1. **Page Object Model (POM)**: All page interactions are encapsulated in Page Object classes, promoting code reusability and maintainability.

2. **Data-Driven Testing**: Test data is externalized in YAML files, allowing tests to be easily parameterized and maintained.

3. **Centralized Locators**: Element locators are stored in YAML files, making UI changes easier to manage.

4. **Atomic Tests**: Each test is independent and can run in isolation without dependencies on other tests.

5. **Resilient Locators**: Uses Playwright's recommended locator strategies (`getByRole()`, `getByText()`, etc.) for stable test execution.

6. **Utility Functions**: Common operations are abstracted into utility functions to reduce code duplication.

7. **Test Organization**: Tests are organized by feature/application area for better maintainability.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Create a feature branch** from the main branch
2. **Write clear, descriptive commit messages**
3. **Ensure all tests pass locally** before submitting
4. **Update documentation** if you add new features or change existing functionality
5. **Follow the existing code style** and project structure
6. **Submit a Pull Request** with a clear description of your changes

## License

This project is licensed under the MIT License.
