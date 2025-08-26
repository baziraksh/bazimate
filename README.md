# BaziMate 📚

**All Your College Resources in One Place**

BaziMate is a full-stack web application where students can buy and download notes, syllabus, and previous year question papers. Built with modern technologies and designed with a mobile-first, attractive UI.

## ✨ Features

### 🔐 Authentication
- Sign up/Login with email & Google OAuth
- Role-based access: Student (buyer) and Uploader/Admin (seller)

### 📚 Resource Management
- **Categories**: Notes 📘, Syllabus 📄, Previous Year Papers 📑
- Upload PDF/DOCX/Images with cloud storage
- Preview feature (1-2 pages before purchase)
- Admin approval workflow

### 💳 Payment System
- Stripe integration (mock implementation)
- Secure payment processing
- Transaction history tracking
- Resource unlock after purchase

### 🔍 Search & Filter
- Search by subject, semester, year, keyword
- Advanced filters: Popular, Latest, Rating, Price
- Category-based browsing

### 👤 User Dashboard
- **Student**: Purchased resources, bookmarks, downloads
- **Uploader**: Uploaded files, approval status, earnings
- Points and rewards system

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
