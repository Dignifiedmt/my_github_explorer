# GitHub Explorer

A React app that searches GitHub users and displays their profile, stats, and top repositories.

## 🚀 Deploy to GitHub Pages

### 1. **Fork or create your repository** on GitHub.

### 2. **Adjust the `vite.config.js`**:
   - Change `repoName` to your actual repository name (e.g., `'my-github-explorer'`).
   - If deploying to a user site (`username.github.io`), set `base: '/'`.

### 3. **Enable GitHub Pages** in your repository settings:
   - Go to **Settings → Pages**.
   - Under **Build and deployment**, select **GitHub Actions** as the source.

### 4. **Push the code** to the `main` branch.  
   The GitHub Actions workflow will automatically build and deploy your site.

### 5. **Visit** `https://<username>.github.io/<repo-name>`.

---

## 🧑‍💻 Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173.

```

---

## 🧭 Deployment Steps Summary

1. **Create a GitHub repository** (e.g., `my-github-explorer`).
2. **Copy all the above files** into your local project folder.
3. **Update `vite.config.js`** with your repository name.
4. **Push the code** to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/my-github-explorer.git
   git push -u origin main
```

5. Enable GitHub Pages with Actions as the source (Settings → Pages).
6. The workflow will build and deploy automatically.
      After a minute, your app will be live at https://your-username.github.io/my-github-explorer/.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
