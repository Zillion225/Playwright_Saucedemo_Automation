# 🎭 Playwright Automation Framework

This project contains the end-to-end (E2E) testing suite for **Playwright_Saucedemo_Automation**. It uses [Playwright](https://playwright.dev/) to ensure cross-browser compatibility and reliable web automation.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/Zillion225/Playwright_Saucedemo_Automation.git
   cd your-repo-name

```

2. **Install dependencies:**
```bash
npm install

```


3. **Install Playwright browsers:**
```bash
npx playwright install --with-deps

```

---

## 📂 Project Structure

```text
.
├── tests/               # Feature-specific test files (.spec.ts)
├── pages/               # Page Object Models (POM) for reusability
├── utils/               # Helper functions and global setups
├── playwright.config.ts # Global configuration (browsers, timeouts, etc.)
└── package.json         # Project scripts and dependencies

```

---

## 🏃 Running Tests

| Command | Action |
| --- | --- |
| `npx playwright test` | Runs all tests in headless mode |
| `npx playwright test --headed` | Runs tests with the browser visible |
| `npx playwright test --ui` | Opens the interactive UI Mode |
| `npx playwright test --project=chromium` | Runs tests only on Chrome/Chromium |
| `npx playwright show-report` | Opens the last generated HTML report |

### Debugging

To debug a specific test, run:

```bash
npx playwright test tests/example.spec.ts --debug

```

---

## 📊 Reporting

By default, this project uses the **HTML Reporter**.

* Reports are generated in the `playwright-report/` folder.
* Screenshots and videos of failed tests are captured automatically.

---

## 🛠 Best Practices

* **Locators:** Use `page.getByRole()` or `page.getByText()` for resilient tests.
* **POM:** Keep all selectors and logic inside the `pages/` directory.
* **Independence:** Ensure tests are atomic and do not depend on each other.

---

## 🤝 Contributing

1. Create a feature branch.
2. Ensure all tests pass locally.
3. Submit a Pull Request.

