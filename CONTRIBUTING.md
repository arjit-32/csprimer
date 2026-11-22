# Contributing to CSPrimer 🚀

Thank you for contributing to **CSPrimer**! We keep contributions simple and accessible for everyone.

---

## 🌟 How to Contribute

| What you want to do | How to do it |
| :--- | :--- |
| **Fix a Typo or Grammar** | Click "Report Issue" on any lesson or open a [Content Issue](https://github.com/arjit-32/csprimer/issues/new?template=content_issue.yml) (`content: typo`). |
| **Fix an Inaccurate Explanation** | Open a [Content Issue](https://github.com/arjit-32/csprimer/issues/new?template=content_issue.yml) with your suggested correction (`content: inaccurate`). |
| **Request an Article or Series** | Open a [General Discussion / Request](https://github.com/arjit-32/csprimer/issues/new?template=topic_request.yml) (`request: article` / `request: series`). |
| **Suggest Changes in the Site** | Open a [General Discussion / Request](https://github.com/arjit-32/csprimer/issues/new?template=topic_request.yml) (`discussion`) to propose a new chapter sequence or reorganization. |
| **Report a Site or CMS Bug** | Open a [Bug Report](https://github.com/arjit-32/csprimer/issues/new?template=bug_report.yml) (`bug: site` or `bug: cms`). |

---

## 🛠️ Local Development

```bash
# 1. Clone repository
git clone https://github.com/arjit-32/csprimer.git
cd csprimer

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to see changes live.

---

## 🏷️ Simple Label System

- `bug: site` — Bug on the public website, reader, or in-browser editor.
- `bug: cms` — Bug in the CMS dev server (`npm run admin`) or authoring tools.
- `content: typo` — Spelling, grammar, or broken link fix.
- `content: inaccurate` — Technical inaccuracy, faulty code example, or outdated concept.
- `discussion` — General discussion, series restructuring ideas, or community feedback.
- `request: article` — Community request for a new standalone article.
- `request: series` — Community request for a new course/series.
- `good first issue` — Beginner-friendly tasks for new contributors.
- `enhancement` — General feature or UI improvement.

---

## 🔀 Submitting a Pull Request

1. Create a branch: `git checkout -b fix/typo-in-raft`
2. Test your change with `npm run dev`
3. Push to your fork and submit a PR using the template.

Every contribution, whether a single typo fix or a full tutorial, is warmly welcomed!
