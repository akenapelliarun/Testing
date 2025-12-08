# PayRam Test Suite - GitHub Setup Guide

## 🚀 GitHub Pages Configuration

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/PayRam/payram_testsuit`
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions` from the dropdown (NOT "Deploy from a branch")
   - You should see options like "GitHub Pages Jekyll" or "Static HTML"
   - Select **"Static HTML"** or just leave it with "GitHub Actions" selected
5. **Note**: There's no separate "Save" button - the selection is automatic

### Important Notes:
- If you see "GitHub Actions" in the Source dropdown, select it
- The page will show: "Workflow details will appear here once your site has been deployed"
- You DON'T need to configure anything else on this page
- The workflows will handle deployment automatically

### Step 2: Repository Secrets Setup

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the following secrets:

#### Required Secrets:

1. **SLACK_WEBHOOK**
   - Value: Your Slack Webhook URL
   - How to get:
     1. Go to https://api.slack.com/apps
     2. Create a new app or select existing
     3. Go to "Incoming Webhooks"
     4. Activate Incoming Webhooks
     5. Add New Webhook to Workspace
     6. Select channel (e.g., #test-reports)
     7. Copy the Webhook URL

2. **GITHUB_TOKEN** (Usually auto-provided by GitHub Actions, but check if needed)

### Step 3: GitHub Actions Permissions (OPTIONAL)

**Good News**: The workflows already include explicit permissions, so this step is OPTIONAL!

However, if you want to enable it at repository level:

1. Go to **Settings** → **Actions** → **General**
2. Scroll down to **Workflow permissions** section (at the bottom)
3. You'll see two radio button options:
   - **Read repository contents and packages permissions** (default)
   - **Read and write permissions**
4. If available, select: ✅ **Read and write permissions**
5. If available, check: ✅ **Allow GitHub Actions to create and approve pull requests**
6. Click **Save** button at the bottom

**If the options are disabled/grayed out**: Don't worry! The workflows have explicit `permissions:` blocks that will work regardless of repository settings.

**Troubleshooting:**
- If "Read and write permissions" is disabled/grayed out:
  - **SOLUTION**: The workflows already include explicit `permissions:` blocks that bypass repository settings
  - This means you can leave the repository setting as "Read-only" - the workflows will still work!
  - The workflow files grant themselves the necessary permissions
  - No need to change repository settings or contact admins
- If you're using a fork:
  - Fork settings might inherit restrictions from the parent repo
  - The explicit permissions in workflows should handle this automatically
  - If still having issues, try creating a new repository instead of forking

---

## 📱 Slack Integration Setup

### Step 1: Create Slack App

1. Go to https://api.slack.com/apps
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. App Name: `PayRam Test Bot`
5. Select your workspace
6. Click **"Create App"**

### Step 2: Enable Incoming Webhooks

1. In your app settings, go to **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** to ON
3. Click **"Add New Webhook to Workspace"**
4. Select the channel: `#payram-test-reports` (or your preferred channel)
5. Click **"Allow"**
6. Copy the Webhook URL (starts with `https://hooks.slack.com/services/...`)

### Step 3: Customize Bot (Optional)

1. Go to **"Basic Information"**
2. Under **"Display Information"**:
   - App Name: `PayRam Test Bot`
   - Short Description: `Automated E2E test reports for PayRam`
   - App Icon: Upload PayRam logo
3. Click **"Save Changes"**

### Step 4: Add Webhook to GitHub Secrets

1. Copy the Webhook URL from Step 2
2. Go to GitHub Repository → **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `SLACK_WEBHOOK`
5. Value: Paste your Webhook URL
6. Click **"Add secret"**

---

## 🔧 Workflow Configuration

### Cron Schedule Explanation

```yaml
schedule:
  - cron: '0 */6 * * *'  # Runs every 6 hours
```

**Cron syntax breakdown:**
- `0` - At minute 0
- `*/6` - Every 6 hours
- `*` - Every day
- `*` - Every month
- `*` - Every day of week

**Run times (UTC):**
- 00:00 (12:00 AM)
- 06:00 (6:00 AM)
- 12:00 (12:00 PM)
- 18:00 (6:00 PM)

### Alternative Schedules

```yaml
# Every 3 hours
- cron: '0 */3 * * *'

# Every 12 hours (twice daily)
- cron: '0 */12 * * *'

# Daily at 2 AM UTC
- cron: '0 2 * * *'

# Weekdays at 9 AM UTC
- cron: '0 9 * * 1-5'
```

---

## 📊 GitHub Pages URL Structure

After deployment, your reports will be available at:

**Dashboard:**
```
https://PayRam.github.io/payram_testsuit/
```

**Mochawesome Reports:**
```
https://PayRam.github.io/payram_testsuit/reports/mochawesome/mochawesome.html
```

**BDD Reports:**
```
https://PayRam.github.io/payram_testsuit/reports/bdd/
```

---

## 🔔 Slack Notification Format

When tests run, you'll receive Slack notifications with:

✅ **Success Message:**
```
✅ PayRam E2E Test Results

📊 Test Summary:
• Total: 15
• Passed: 15 ✅
• Failed: 0 ❌

📄 Reports:
• Mochawesome: https://PayRam.github.io/payram_testsuit/reports/mochawesome/mochawesome.html
• BDD Reports: https://PayRam.github.io/payram_testsuit/reports/bdd/

🔗 GitHub Actions: https://github.com/PayRam/payram_testsuit/actions/runs/...
```

❌ **Failure Message:**
```
❌ PayRam E2E Test Results

📊 Test Summary:
• Total: 15
• Passed: 12 ✅
• Failed: 3 ❌

📄 Reports:
• Mochawesome: https://PayRam.github.io/payram_testsuit/reports/mochawesome/mochawesome.html
• BDD Reports: https://PayRam.github.io/payram_testsuit/reports/bdd/

🔗 GitHub Actions: https://github.com/PayRam/payram_testsuit/actions/runs/...
```

---

## 🧪 Testing the Setup

### Manual Trigger

1. Go to **Actions** tab in GitHub
2. Select **"PayRam E2E Test Suite"** workflow
3. Click **"Run workflow"** dropdown
4. Click **"Run workflow"** button
5. Monitor the execution
6. Check Slack for notification
7. Visit GitHub Pages URL to see reports

---

## 📝 Troubleshooting

### GitHub Pages Not Working?

1. Check **Settings** → **Pages** → Build and deployment → Source is set to "GitHub Actions"
2. If you don't see "GitHub Actions" option:
   - Make sure you've committed both workflow files to `.github/workflows/` directory
   - Push the files to GitHub
   - Refresh the Settings → Pages page
3. Check workflow runs in **Actions** tab for errors
4. Verify **deploy-pages.yml** workflow completed successfully
5. Look for the deployment URL in the workflow output or Pages settings

### Slack Notifications Not Received?

1. Verify `SLACK_WEBHOOK` secret is correctly set
2. Check webhook URL is valid in Slack App settings
3. Ensure Slack channel exists and bot has access
4. Check workflow logs for Slack notification step errors

### Reports Not Updating?

1. Artifacts must be created in first workflow
2. Second workflow must download artifacts successfully
3. Check both workflows completed without errors
4. Clear browser cache and check again

### "Read and write permissions" is Disabled?

**Good News**: You don't need to enable it! The workflows already have explicit permissions.

Both workflow files include a `permissions:` block that grants the necessary access:
```yaml
permissions:
  contents: write
  pages: write
  id-token: write
  actions: read
```

This means the workflows will work even if repository settings are restrictive.

**If you still want to enable it at repository level** (optional):

1. **Organization Policy**: Your organization has restricted this setting
   - Ask organization admin to enable it (optional)
   - Or: Settings → Actions → General → Look for organization-level overrides
   - Or: Just leave it - workflows will work anyway with explicit permissions

2. **Using a Fork**: Forks inherit parent repo restrictions
   - The explicit workflow permissions should handle this
   - If issues persist, create a new repository (not a fork)

### No "GitHub Actions" Option in Pages Source?

This means:

1. **No workflow files yet**: Commit and push the workflow files first
2. **Workflows not detected**: Ensure files are in `.github/workflows/` directory
3. **Repo settings**: Check if Pages is enabled for your repo type

**Steps to fix:**
```powershell
# Verify workflow files exist
git add .github/workflows/
git commit -m "Add GitHub Actions workflows"
git push origin main
```

Then refresh Settings → Pages and the "GitHub Actions" option should appear.

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Slack API Documentation](https://api.slack.com/messaging/webhooks)
- [Cron Expression Generator](https://crontab.guru/)

---

## ✅ Checklist

- [ ] GitHub Pages enabled with "GitHub Actions" source
- [ ] Repository has write permissions for workflows
- [ ] SLACK_WEBHOOK secret added
- [ ] Slack app created and webhook configured
- [ ] Slack channel created (#payram-test-reports)
- [ ] Both workflow files committed to `.github/workflows/`
- [ ] Manual test run successful
- [ ] Slack notification received
- [ ] GitHub Pages dashboard accessible
- [ ] Both report links working

---

**Need Help?** Contact the DevOps team or check GitHub Actions logs for detailed error messages.
