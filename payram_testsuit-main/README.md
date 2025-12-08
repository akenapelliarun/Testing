<div align="center">

# 🚀 PayRam E2E Test Suite

### Automated End-to-End Testing Framework with Cucumber BDD

[![Cypress](https://img.shields.io/badge/Cypress-15.6.0-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Reports](#-reports) • [CI/CD](#-cicd-pipeline)

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Reports](#-reports)
- [Custom Commands](#-custom-commands)
- [CI/CD Pipeline](#-cicd-pipeline)
- [GitHub Pages Dashboard](#-github-pages-dashboard)
- [Contributing](#-contributing)

---

## 🎯 Overview

**PayRam Test Suite** is a comprehensive end-to-end testing framework built with Cypress and Cucumber BDD. It provides automated testing capabilities with beautiful reporting, Slack notifications, and GitHub Pages integration for easy access to test results.

### Why This Framework?

- ✅ **BDD Support**: Write tests in Gherkin syntax for better collaboration
- ✅ **Dual Reporting**: Both Mochawesome and Cucumber HTML reports
- ✅ **Automated CI/CD**: Runs every 6 hours with GitHub Actions
- ✅ **Slack Integration**: Real-time notifications with test results
- ✅ **GitHub Pages**: Beautiful dashboard to view all reports
- ✅ **Custom Commands**: Reusable commands for common test operations
- ✅ **Page Object Model**: Maintainable and scalable test structure

---

## ✨ Features

### 🧪 Testing Capabilities

- **Cucumber BDD Integration**: Write human-readable test scenarios
- **XPath Support**: Robust element selection with cypress-xpath
- **Custom Commands**: Pre-built commands for:
  - Input field validation (type, delete, clear)
  - Broken link detection
  - Broken image detection
- **Page Object Pattern**: Clean and maintainable test architecture
- **Fixture Data Management**: Centralized test data management

### 📊 Reporting & Monitoring

- **Mochawesome Reports**: Interactive charts and statistics
- **Cucumber HTML Reports**: BDD-style feature reports
- **Automated Screenshots**: Captured for failed tests
- **Video Recording**: Full test execution videos
- **Slack Notifications**: Real-time test result updates
- **GitHub Pages Dashboard**: Centralized report access

### 🔄 CI/CD Integration

- **Automated Runs**: Every 6 hours via cron schedule
- **Manual Triggers**: Run tests on-demand via GitHub Actions
- **Artifact Management**: 30-day retention for reports
- **Multi-environment Support**: Test and production configurations

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Cypress** | 15.6.0 | E2E Testing Framework |
| **Cucumber Preprocessor** | 23.2.1 | BDD Support |
| **Mochawesome Reporter** | 4.0.2 | HTML Test Reports |
| **cypress-xpath** | 2.0.1 | XPath Selectors |
| **GitHub Actions** | - | CI/CD Pipeline |
| **Node.js** | 20.x | Runtime Environment |

---

## 📁 Project Structure

```
payram_testsuit/
│
├── .github/
│   └── workflows/
│       ├── test-and-report.yml      # Main test execution workflow
│       └── deploy-pages.yml         # GitHub Pages deployment
│
├── cypress/
│   ├── fixtures/
│   │   └── data.json                # Test data
│   │
│   ├── integration/
│   │   └── feature/
│   │       ├── login.feature        # Gherkin feature files
│   │       └── login.js             # Step definitions
│   │
│   ├── pages/
│   │   └── login_page.js            # Page Object Model
│   │
│   ├── reports/                     # Generated reports (gitignored)
│   │   ├── mochawesome/
│   │   └── cucumber-report.html
│   │
│   └── support/
│       ├── commands.js              # Custom Cypress commands
│       └── e2e.js                   # Support file
│
├── docs/                            # GitHub Pages content
│
├── scripts/                         # Utility scripts
│
├── .cypress-cucumber-preprocessorrc.json  # Cucumber config
├── cypress.config.js                # Cypress configuration
├── package.json                     # Dependencies
├── .gitignore                       # Git ignore rules
├── README.md                        # This file
└── GITHUB_SETUP_GUIDE.md           # CI/CD setup guide
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v20.x or higher)
- npm or yarn
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/PayRam/payram_testsuit.git
   cd payram_testsuit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npx cypress verify
   ```

---

## ⚙️ Configuration

### Cucumber Configuration

Edit `.cypress-cucumber-preprocessorrc.json`:

```json
{
  "stepDefinitions": "cypress/integration/**/*.js",
  "filterSpecs": true,
  "json": {
    "enabled": true,
    "output": "cypress/reports/cucumber-report.json"
  },
  "html": {
    "enabled": true,
    "output": "cypress/reports/cucumber-report.html"
  }
}
```

### Cypress Configuration

Key settings in `cypress.config.js`:

- **Base URL**: Configure test environment URLs
- **Viewport**: 1600x900 (customizable)
- **Timeouts**: 650 seconds (for long-running operations)
- **Video**: Enabled (deleted for passing tests)
- **Screenshots**: Enabled (only for failures)

---

## 🎮 Running Tests

### Local Execution

**Open Cypress Test Runner** (Interactive mode)
```bash
npx cypress open
```

**Run All Tests** (Headless mode)
```bash
npx cypress run
```

**Run Specific Feature**
```bash
npx cypress run --spec "cypress/integration/feature/login.feature"
```

**Run with Tags** (Cucumber)
```bash
npx cypress run --env tags="@test"
```

### Test Environments

```bash
# Test Environment
npx cypress run --env tags="@test"

# Production Environment
npx cypress run --env tags="@prod"
```

---

## 📊 Reports

### Mochawesome Report

- **Location**: `cypress/reports/mochawesome/mochawesome.html`
- **Features**:
  - Interactive charts and graphs
  - Test execution timeline
  - Screenshots embedded
  - Pass/Fail statistics

### Cucumber BDD Report

- **Location**: `cypress/reports/cucumber-report.html`
- **Features**:
  - Feature and scenario breakdown
  - Step-by-step execution details
  - Gherkin syntax display
  - Duration statistics

### View Reports Locally

```bash
# Open Mochawesome report
start cypress/reports/mochawesome/mochawesome.html

# Open Cucumber report
start cypress/reports/cucumber-report.html
```

---

## 🔧 Custom Commands

### Input Field Verification

```javascript
cy.verifyInputField('#username', 'TestUser123');
```

**Features**: Checks if field is enabled, visible, accepts input, and can be cleared.

### Broken Links Check

```javascript
cy.checkBrokenLinks();
```

**Features**: Scans page for broken links, logs details without failing test.

### Broken Images Check

```javascript
cy.checkBrokenImages();
```

**Features**: Validates all images load correctly, logs broken images.

### Advanced Input Field

```javascript
cy.verifyInputFieldAdvanced('//input[@id="email"]', 'test@example.com', true);
```

**Features**: Supports both CSS and XPath selectors.

---

## 🤖 CI/CD Pipeline

### Automated Schedule

Tests run automatically **every 6 hours**:
- 00:00 UTC (12:00 AM)
- 06:00 UTC (6:00 AM)
- 12:00 UTC (12:00 PM)
- 18:00 UTC (6:00 PM)

### Manual Triggers

1. Go to **Actions** tab on GitHub
2. Select **"PayRam E2E Test Suite"**
3. Click **"Run workflow"**
4. Monitor execution in real-time

### Workflow Features

- ✅ Parallel execution support
- ✅ Automatic retry on failure (2 retries)
- ✅ Screenshot/video capture for failures
- ✅ Artifact upload (30-day retention)
- ✅ Slack notifications with results
- ✅ GitHub Pages deployment

---

## 🌐 GitHub Pages Dashboard

Access your test reports dashboard:

**URL**: `https://PayRam.github.io/payram_testsuit/`

### Dashboard Features

- 📊 **Mochawesome Reports**: Detailed test execution statistics
- 🥒 **BDD Reports**: Feature and scenario results
- 🎨 **Beautiful UI**: Gradient design with interactive cards
- 🔄 **Auto-Updates**: Refreshes after every test run
- 📱 **Responsive**: Works on mobile and desktop

---

## 📱 Slack Integration

### Notification Format

Receive detailed notifications including:

- ✅ Test execution status (Pass/Fail)
- 📊 Test statistics (Total, Passed, Failed)
- 🔗 Direct links to reports
- 🔗 GitHub Actions run link
- ⏱️ Trigger information

### Setup

See [GITHUB_SETUP_GUIDE.md](./GITHUB_SETUP_GUIDE.md) for complete Slack integration setup.

---

## 📝 Writing Tests

### Feature File Example

```gherkin
Feature: Login
    As a user
    I want to log in to the application
    So that I can access my account
    
    @test
    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I enter valid credentials
        And I click the login button
        Then I should be redirected to the dashboard
```

### Step Definition Example

```javascript
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login_page from '../../pages/login_page';

const lp = new login_page();

Given('I am on the login page', () => {
  cy.visit('https://example.com/login');
});

When('I enter valid credentials', () => {
  lp.get_email_field().type('user@example.com');
  lp.get_password_field().type('password123');
});
```

### Page Object Example

```javascript
class login_page {
  get_email_field() {
    return cy.xpath("//input[@id='email']");
  }
  
  get_password_field() {
    return cy.xpath("//input[@id='password']");
  }
  
  get_login_button() {
    return cy.xpath("//button//*[.='Sign In']");
  }
}

export default login_page;
```

---

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add your feature"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Coding Standards

- Use meaningful variable and function names
- Follow Page Object Model pattern
- Write clear Gherkin scenarios
- Add comments for complex logic
- Keep step definitions focused and reusable

---

## 🐛 Troubleshooting

### Common Issues

**Problem**: Tests fail locally but pass in CI
- **Solution**: Check environment variables and base URLs

**Problem**: Reports not generating
- **Solution**: Ensure report directories exist and have write permissions

**Problem**: Slack notifications not received
- **Solution**: Verify SLACK_WEBHOOK secret is correctly set

**Problem**: GitHub Pages not updating
- **Solution**: Check both workflows completed successfully

### Getting Help

- Check [GITHUB_SETUP_GUIDE.md](./GITHUB_SETUP_GUIDE.md)
- Review GitHub Actions logs
- Check Cypress documentation: https://docs.cypress.io/

---

## 📄 License

This project is proprietary and confidential.

---

## 📞 Contact & Support

- **Repository**: [PayRam/payram_testsuit](https://github.com/PayRam/payram_testsuit)
- **Issues**: [GitHub Issues](https://github.com/PayRam/payram_testsuit/issues)
- **Documentation**: [GITHUB_SETUP_GUIDE.md](./GITHUB_SETUP_GUIDE.md)

---

<div align="center">

### 🌟 Happy Testing! 🌟

**Built with ❤️ by PayRam Team**

[⬆ Back to Top](#-payram-e2e-test-suite)

</div>