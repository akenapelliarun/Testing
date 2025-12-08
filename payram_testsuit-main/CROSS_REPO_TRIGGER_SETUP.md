# 🚀 Cross-Repository Test Trigger Setup Guide

## 📋 Overview

This guide explains how to automatically trigger E2E tests in the **Test Repository** (`payram_testsuit`) when developers push code from **Dev to Pre-Prod** in the **Developer Repository** (`payram-core`).

---

## 🎯 What Will Happen After Setup?

```
Developer pushes code to 'develop' branch
         ↓
Code builds successfully in Developer Repository
         ↓
Automatically triggers E2E tests in Test Repository
         ↓
Test results sent to Slack
```

---

## 📦 What You Need

- ✅ Access to both repositories (Developer + Test)
- ✅ Admin permissions to add secrets
- ✅ 15 minutes to complete setup

---

# 🔧 SETUP INSTRUCTIONS

---

## 👥 TASK ASSIGNMENTS

### 🔧 DevOps Team Tasks:
- ✅ Part 1: Create Personal Access Token
- ✅ Part 2: Add token to Developer Repository
- ✅ Part 3: Update Developer Repository Workflow (`build.yml`)

### 🧪 QA/Test Team Tasks:
- ✅ Part 4: Update Test Repository Workflow (`test-and-report.yml`)
- ✅ Part 5: Test the complete setup

---

## Part 1: Create Personal Access Token (PAT)

**👤 ASSIGNED TO:** DevOps Team

**⏱️ Time needed:** 3 minutes

**📁 Repository:** N/A (GitHub Account Settings)

### Steps:

1. **Go to GitHub.com** and log in

2. **Click your profile picture** (top right corner)

3. Click **"Settings"**

4. Scroll down on left sidebar and click **"Developer settings"**

5. Click **"Personal access tokens"** → **"Tokens (classic)"**

6. Click **"Generate new token"** → **"Generate new token (classic)"**

7. Fill in the form:
   - **Note:** `Cross-repo test trigger for PayRam`
   - **Expiration:** Select `90 days` or `No expiration`
   - **Scopes:** Check the box for **`repo`** (Full control of private repositories)

8. Click **"Generate token"** at the bottom

9. **COPY THE TOKEN IMMEDIATELY!** 
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't see it again after you leave this page!
   - Save it in a secure location temporarily

---

## Part 2: Add Token as Secret in Developer Repository

**👤 ASSIGNED TO:** DevOps Team

**⏱️ Time needed:** 2 minutes

**📁 Repository:** `payram-core` (Developer Repository)

### Steps:

1. **Go to the Developer Repository**
   - Navigate to: `https://github.com/PayRam/payram-core`

2. **Click "Settings" tab** (top menu bar)

3. **On left sidebar**, click **"Secrets and variables"** → **"Actions"**

4. Click **"New repository secret"** button (green button on right)

5. Fill in:
   - **Name:** `PAT_TOKEN_FOR_TESTS` 
     - ⚠️ Use this exact name!
   - **Secret:** Paste the token you copied in Part 1

6. Click **"Add secret"**

7. ✅ Done! You should see `PAT_TOKEN_FOR_TESTS` in the list

---

## Part 3: Update Developer Repository Workflow

**👤 ASSIGNED TO:** DevOps Team

**⏱️ Time needed:** 5 minutes

**📁 Repository:** `payram-core` (Developer Repository)

**📄 File to Edit:** `.github/workflows/build.yml`

### Change 1: Add Event Type

**📍 Location in file:** Line 7-8 (in the `on:` section at the top)

**🔍 Current Code:**

```yaml
on:
  repository_dispatch:
    types: [ frontend-updated ]
```

**✏️ Change it to:**

```yaml
on:
  repository_dispatch:
    types: [ frontend-updated, trigger-e2e-tests ]
```

**📝 What this does:** Allows the workflow to accept test trigger events

**💡 Tip:** Just add `, trigger-e2e-tests` after `frontend-updated` inside the square brackets

---

### Change 2: Add Test Trigger Step

**📍 Location in file:** End of the `docker` job (after all Slack notification steps, around line 634)

**🔍 Find this location:** Scroll to the very end of the `docker:` job, after the last Slack notification step (`Slack — build failed`)

**✏️ Add this NEW step at the very end:**

```yaml
      # ================= TRIGGER E2E TESTS =================
      - name: Trigger E2E Tests After Successful Build
        if: ${{ env.BUILD == 'true' && success() }}
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.PAT_TOKEN_FOR_TESTS }}
          repository: PayRam/payram_testsuit
          event-type: build-completed
          client-payload: |
            {
              "repository": "${{ github.repository }}",
              "environment": "${{ env.CORE_BRANCH == 'main' && 'production' || 'pre-prod' }}",
              "branch": "${{ env.CORE_BRANCH }}",
              "sha": "${{ github.sha }}",
              "actor": "${{ github.actor }}",
              "docker_image": "${{ env.DOCKER_IMAGE }}",
              "docker_tag": "${{ env.CORE_TAG }}"
            }
```

**📝 What this does:** Sends a trigger signal to the test repository with deployment details

**💡 Important Notes:**
- This step runs ONLY when build succeeds (`if: ${{ env.BUILD == 'true' && success() }}`)
- Replace `PayRam/payram_testsuit` with your actual test repository name if different
- The `PAT_TOKEN_FOR_TESTS` secret must be added first (Part 2)

---

### Change 3: Commit and Push Changes

**🔧 Run these commands in terminal:**

```bash
git add .github/workflows/build.yml
git commit -m "feat: Add E2E test trigger after successful build"
git push origin main
```

**✅ Verification:** Go to GitHub → Actions tab → You should see the workflow updated

---

## Part 4: Update Test Repository Workflow

**👤 ASSIGNED TO:** QA/Test Automation Team

**⏱️ Time needed:** 5 minutes

**📁 Repository:** `payram_testsuit` (Test Repository)

**📄 File to Edit:** `.github/workflows/test-and-report.yml`

---

### Change 1: Add Repository Dispatch Trigger

**📍 Location in file:** Line 2-10 (in the `on:` section at the top)

**🔍 Current Code:**

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:
```

**✏️ Change it to:**

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:
  repository_dispatch:
    types: [build-completed]
```

**📝 What this does:** Allows this workflow to receive triggers from the developer repository

**💡 Tip:** Add the last 2 lines (`repository_dispatch:` and `types: [build-completed]`) at the end

---

### Change 2: Add Deployment Info Display

**📍 Location in file:** After line 46, right BEFORE the comment `# ============ RUN LOGIN MODULE ============`

**🔍 Find this line:**

```yaml
      # ============ RUN LOGIN MODULE ============
```

**✏️ ADD THIS NEW STEP RIGHT BEFORE IT:**

```yaml
      - name: Show Deployment Trigger Information
        if: ${{ github.event_name == 'repository_dispatch' }}
        run: |
          echo "========================================="
          echo "🚀 Tests triggered by deployment"
          echo "Repository: ${{ github.event.client_payload.repository }}"
          echo "Environment: ${{ github.event.client_payload.environment }}"
          echo "Branch: ${{ github.event.client_payload.branch }}"
          echo "Docker Image: ${{ github.event.client_payload.docker_image }}"
          echo "Docker Tag: ${{ github.event.client_payload.docker_tag }}"
          echo "Commit SHA: ${{ github.event.client_payload.sha }}"
          echo "Triggered by: ${{ github.event.client_payload.actor }}"
          echo "========================================="

      # ============ RUN LOGIN MODULE ============
```

**📝 What this does:** Shows who triggered the tests and from which deployment

**💡 Tip:** This step only runs when tests are triggered by deployment (not on regular push/schedule)

---

### Change 3: Update Slack Notification Footer (Optional)

**📍 Location in file:** Around line 520-570, in the Slack notification section

**🔍 Find this line:**

**🔍 Find this line:**

```yaml
SLACK_FOOTER: 'Triggered by ${{ github.event_name }} | Branch: ${{ github.ref_name }}'
```

**✏️ Change to:**

```yaml
SLACK_FOOTER: 'Triggered by ${{ github.event_name }}${{ github.event_name == 'repository_dispatch' && format(' from {0}', github.event.client_payload.repository) || '' }} | Branch: ${{ github.ref_name }}'
```

**📝 What this does:** Shows in Slack which repository triggered the tests

**💡 Note:** This change is optional but recommended for better visibility

---

### Change 4: Commit and Push Changes

**🔧 Run these commands in terminal:**

```bash
git add .github/workflows/test-and-report.yml
git commit -m "feat: Add cross-repository trigger support"
git push origin main
```

**✅ Verification:** Go to GitHub → Actions tab → You should see the workflow updated

---

## Part 5: Testing the Setup

**👤 ASSIGNED TO:** DevOps Team + QA Team (Collaborate)

**⏱️ Time needed:** 5 minutes

**📁 Repository:** Both repositories

---

### Testing Steps:

### Testing Steps:

**Step 1: DevOps - Trigger Build**

1. **Make a test commit** to the `develop` branch in the developer repository (`payram-core`)

   ```bash
   # Example: Make a small change and push
   git checkout develop
   echo "# Test trigger" >> README.md
   git add README.md
   git commit -m "test: Trigger E2E tests"
   git push origin develop
   ```

**Step 2: DevOps - Verify Build Workflow**

2. **Go to Developer Repository → Actions tab**
   - URL: `https://github.com/PayRam/payram-core/actions`
   - Watch the `Build & Publish Single Image` workflow run
   - It should complete successfully (green checkmark ✅)
   - Look for the "Trigger E2E Tests After Successful Build" step

**Step 3: QA - Verify Test Workflow Triggered**

3. **Go to Test Repository → Actions tab**
   - URL: `https://github.com/PayRam/payram_testsuit/actions`
   - You should see a new workflow run appear automatically
   - The workflow name will be: **"PayRam E2E Test Suite - Combined"**
   - It should show "Triggered by repository_dispatch"

**Step 4: QA - Check Deployment Information**

4. **Click on the test workflow run**
   - Look for the step: "Show Deployment Trigger Information"
   - It should display:
     ```
     🚀 Tests triggered by deployment
     Repository: PayRam/payram-core
     Environment: pre-prod
     Branch: develop
     Docker Image: payramapp/payram
     Docker Tag: develop
     Commit SHA: abc1234
     Triggered by: <username>
     ```

**Step 5: QA/DevOps - Check Slack Notification**

5. **Check Slack channel**
   - You should receive test results notification
   - It should show which repository triggered the tests
   - Footer should say: "Triggered by repository_dispatch from PayRam/payram-core"

**Step 6: Final Verification**

6. ✅ **If you see all of the above, setup is complete!**

---

## ✅ Setup Complete Checklist

### DevOps Team Checklist:
- [ ] PAT token created with `repo` scope
- [ ] PAT token added to `payram-core` as `PAT_TOKEN_FOR_TESTS`
- [ ] `build.yml` updated with event type `trigger-e2e-tests`
- [ ] `build.yml` updated with trigger step at the end
- [ ] Changes committed and pushed to `main` branch
- [ ] Test deployment performed successfully
- [ ] Build workflow shows trigger step executing

### QA Team Checklist:
- [ ] `test-and-report.yml` updated with `repository_dispatch` trigger
- [ ] Deployment info display step added
- [ ] Slack footer updated (optional)
- [ ] Changes committed and pushed to `main` branch
- [ ] Tests triggered automatically after build
- [ ] Deployment information displays correctly
- [ ] Slack notification received with correct information

---

## 🔍 Troubleshooting

### Problem: Tests are not triggering automatically

**🔧 DevOps: Check these items:**

**🔧 DevOps: Check these items:**

- [ ] PAT token has `repo` scope enabled
- [ ] PAT token is added as `PAT_TOKEN_FOR_TESTS` in developer repository secrets (not test repository!)
- [ ] Event type name matches exactly: `trigger-e2e-tests` in `build.yml` (line 8)
- [ ] Repository name is correct: `PayRam/payram_testsuit` (check spelling!)
- [ ] Workflow files are in `.github/workflows/` directory
- [ ] Workflow files are pushed to `main` branch
- [ ] Build in developer repository completed successfully (green checkmark)
- [ ] The trigger step appears in build workflow logs

**🧪 QA: Check these items:**

- [ ] Event type name matches exactly: `build-completed` in `test-and-report.yml`
- [ ] Workflow file is pushed to `main` branch
- [ ] GitHub Actions is enabled for test repository
- [ ] No workflow syntax errors (check Actions tab for errors)

### Problem: Getting "Resource not accessible" error

**🔧 DevOps Solution:**
**🔧 DevOps Solution:**
- PAT token doesn't have correct permissions
- Create a new token with `repo` scope (Part 1)
- Update the secret in developer repository (Part 2)

### Problem: Tests trigger but fail immediately

**🧪 QA Solution:**
**🧪 QA Solution:**
- Check the test repository workflow logs
- Ensure all dependencies are installed correctly
- Verify Cypress is properly configured
- Check if test environment variables are set correctly

---

## 🎯 Summary: Who Does What

### 📊 Task Distribution Table

| Task | Team | Repository | File to Edit | Time |
|------|------|------------|--------------|------|
| **1. Create PAT Token** | 🔧 DevOps | GitHub Account | N/A | 3 min |
| **2. Add Token Secret** | 🔧 DevOps | `payram-core` | Repository Settings | 2 min |
| **3. Update Build Workflow** | 🔧 DevOps | `payram-core` | `.github/workflows/build.yml` | 5 min |
| **4. Update Test Workflow** | 🧪 QA | `payram_testsuit` | `.github/workflows/test-and-report.yml` | 5 min |
| **5. Test Setup** | 🔧🧪 Both | Both | N/A | 5 min |

**Total Time:** ~20 minutes

---

## 📋 Quick Reference: File Changes Summary

### 🔧 DevOps Changes (`payram-core` repository)

**File: `.github/workflows/build.yml`**

**Change 1 (Line ~8):**
```yaml
# ADD trigger-e2e-tests to the list
types: [ frontend-updated, trigger-e2e-tests ]
```

**Change 2 (Line ~634, at the end):**
```yaml
# ADD this entire new step
- name: Trigger E2E Tests After Successful Build
  if: ${{ env.BUILD == 'true' && success() }}
  uses: peter-evans/repository-dispatch@v2
  with:
    token: ${{ secrets.PAT_TOKEN_FOR_TESTS }}
    repository: PayRam/payram_testsuit
    event-type: build-completed
    client-payload: |
      {
        "repository": "${{ github.repository }}",
        "environment": "${{ env.CORE_BRANCH == 'main' && 'production' || 'pre-prod' }}",
        "branch": "${{ env.CORE_BRANCH }}",
        "sha": "${{ github.sha }}",
        "actor": "${{ github.actor }}",
        "docker_image": "${{ env.DOCKER_IMAGE }}",
        "docker_tag": "${{ env.CORE_TAG }}"
      }
```

---

### 🧪 QA Changes (`payram_testsuit` repository)

**File: `.github/workflows/test-and-report.yml`**

**Change 1 (Line ~10):**
```yaml
# ADD these 2 lines at the end of 'on:' section
repository_dispatch:
  types: [build-completed]
```

**Change 2 (Line ~46, before "RUN LOGIN MODULE"):**
```yaml
# ADD this entire new step
- name: Show Deployment Trigger Information
  if: ${{ github.event_name == 'repository_dispatch' }}
  run: |
    echo "========================================="
    echo "🚀 Tests triggered by deployment"
    echo "Repository: ${{ github.event.client_payload.repository }}"
    echo "Environment: ${{ github.event.client_payload.environment }}"
    echo "Branch: ${{ github.event.client_payload.branch }}"
    echo "Docker Image: ${{ github.event.client_payload.docker_image }}"
    echo "Docker Tag: ${{ github.event.client_payload.docker_tag }}"
    echo "Commit SHA: ${{ github.event.client_payload.sha }}"
    echo "Triggered by: ${{ github.event.client_payload.actor }}"
    echo "========================================="
```

**Change 3 (Line ~560, optional):**
```yaml
# REPLACE the SLACK_FOOTER line
SLACK_FOOTER: 'Triggered by ${{ github.event_name }}${{ github.event_name == 'repository_dispatch' && format(' from {0}', github.event.client_payload.repository) || '' }} | Branch: ${{ github.ref_name }}'
```

---

## 📊 What Triggers the Tests?

Tests will automatically run when:

✅ Code is pushed to `develop` branch in developer repository  
✅ Docker build completes successfully  
✅ Build workflow runs and succeeds  

Tests will NOT run when:

❌ Build fails  
❌ Code is pushed to feature branches (unless configured)  
❌ Pull request is opened (unless configured)  

---

## 🎛️ Advanced Configuration

### Run Tests for Different Branches

To trigger tests for other branches, update the developer repository workflow:

**Find this line:**

```yaml
if: ${{ env.BUILD == 'true' && success() }}
```

**Add branch condition:**

```yaml
if: ${{ env.BUILD == 'true' && success() && (env.CORE_BRANCH == 'main' || env.CORE_BRANCH == 'develop' || env.CORE_BRANCH == 'staging') }}
```

---

### Run Different Test Suites for Different Environments

In the test repository, modify the test execution step:

**Find:**

```yaml
- name: Run Login Module Tests
  run: npm run test:login
```

**Change to:**

```yaml
- name: Run Login Module Tests
  run: |
    if [ "${{ github.event.client_payload.environment }}" == "production" ]; then
      npm run test:login:prod
    else
      npm run test:login
    fi
```

---

## 🔐 Security Notes

1. **PAT Token:**
   - Keep it secure, never commit it to code
   - Only add it to repository secrets
   - Use expiration dates for tokens
   - Rotate tokens every 90 days

2. **Repository Access:**
   - PAT token gives full access to repositories
   - Only create tokens with necessary permissions
   - Use organization secrets for multiple repositories

3. **Audit:**
   - Check GitHub Actions logs regularly
   - Monitor who is triggering workflows
   - Review secret access in repository settings

---

## 📝 Summary Checklist

Before considering setup complete, verify:

- [ ] PAT token created with `repo` scope
- [ ] PAT token added to developer repository as `PAT_TOKEN_FOR_TESTS`
- [ ] Developer repository `build.yml` updated with trigger step
- [ ] Test repository `test-and-report.yml` updated with dispatch trigger
- [ ] Both workflows committed and pushed to `main` branch
- [ ] Test deployment performed successfully
- [ ] Tests triggered automatically
- [ ] Slack notification received with correct information
- [ ] Team members trained on new workflow

---

## 🆘 Need Help?

If you encounter issues:

1. Check GitHub Actions logs in both repositories
2. Verify all secret names match exactly
3. Ensure PAT token has not expired
4. Review this guide step-by-step
5. Contact DevOps team for assistance

---

## 📖 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Repository Dispatch Events](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)
- [GitHub Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

**Last Updated:** December 2, 2025  
**Maintained by:** PayRam QA Team  
**Questions?** Contact the DevOps team

---

## 🎉 You're Done!

Your cross-repository test triggering is now configured. Tests will automatically run whenever code is deployed from dev to pre-prod!
