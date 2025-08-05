# 🤝 Contributing to Batik Indonesia E-commerce

Terima kasih atas minat Anda untuk berkontribusi pada proyek Batik Indonesia E-commerce! Kontribusi dari komunitas sangat membantu dalam mengembangkan platform yang lebih baik untuk melestarikan budaya batik Indonesia.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Style Guide](#style-guide)

## 📜 Code of Conduct

Proyek ini mengikuti [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Dengan berpartisipasi, Anda diharapkan untuk menjunjung tinggi kode etik ini.

### Perilaku yang Diharapkan:
- ✅ Menggunakan bahasa yang ramah dan inklusif
- ✅ Menghormati sudut pandang dan pengalaman yang berbeda
- ✅ Menerima kritik konstruktif dengan baik
- ✅ Fokus pada apa yang terbaik untuk komunitas
- ✅ Menunjukkan empati terhadap anggota komunitas lainnya

## 🚀 Getting Started

### Prerequisites
- Git
- Text editor (VS Code, Sublime Text, dll.)
- Web browser modern
- Pemahaman dasar HTML, CSS, dan JavaScript

### Setup Development Environment

1. **Fork repository**
   ```bash
   # Klik tombol "Fork" di GitHub
   ```

2. **Clone fork Anda**
   ```bash
   git clone https://github.com/YOUR_USERNAME/batik-ecommerce.git
   cd batik-ecommerce
   ```

3. **Setup upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/batik-ecommerce.git
   ```

4. **Buat branch untuk fitur baru**
   ```bash
   git checkout -b feature/nama-fitur-anda
   ```

## 🛠️ How to Contribute

### 🐛 Reporting Bugs

Sebelum membuat bug report:
- Pastikan bug belum dilaporkan di [Issues](https://github.com/your-username/batik-ecommerce/issues)
- Cek apakah bug masih ada di versi terbaru

**Bug Report Template:**
```markdown
**Describe the bug**
Deskripsi singkat dan jelas tentang bug.

**To Reproduce**
Steps untuk reproduce behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
Deskripsi tentang apa yang seharusnya terjadi.

**Screenshots**
Jika applicable, tambahkan screenshots.

**Environment:**
- OS: [e.g. Windows 10, macOS Big Sur]
- Browser: [e.g. Chrome 91, Firefox 89]
- Version: [e.g. 1.0.0]
```

### 💡 Suggesting Features

**Feature Request Template:**
```markdown
**Is your feature request related to a problem?**
Deskripsi jelas tentang masalah. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
Deskripsi jelas dan ringkas tentang solusi yang diinginkan.

**Describe alternatives you've considered**
Deskripsi tentang alternatif solusi yang sudah dipertimbangkan.

**Additional context**
Tambahkan context atau screenshots tentang feature request.
```

### 🔧 Code Contributions

1. **Pilih issue** yang ingin dikerjakan atau buat issue baru
2. **Comment** di issue untuk memberitahu bahwa Anda akan mengerjakannya
3. **Fork** repository dan buat branch baru
4. **Implement** perubahan Anda
5. **Test** perubahan secara menyeluruh
6. **Submit** pull request

## 📝 Development Guidelines

### HTML Guidelines
- Gunakan semantic HTML5 elements
- Pastikan accessibility dengan proper ARIA labels
- Validate HTML menggunakan [W3C Validator](https://validator.w3.org/)

```html
<!-- Good -->
<section class="hero-section" role="banner">
  <h1>Main Heading</h1>
  <img src="image.jpg" alt="Descriptive alt text">
</section>

<!-- Avoid -->
<div class="hero-section">
  <div class="heading">Main Heading</div>
  <img src="image.jpg">
</div>
```

### CSS Guidelines
- Gunakan CSS custom properties untuk theming
- Follow BEM methodology untuk naming
- Mobile-first responsive design
- Optimize untuk performance

```css
/* Good - BEM methodology */
.product-card {
  /* Block */
}

.product-card__title {
  /* Element */
}

.product-card--featured {
  /* Modifier */
}

/* Good - CSS Custom Properties */
:root {
  --primary-color: #4e54c8;
  --font-size-base: 1rem;
}

.button {
  background-color: var(--primary-color);
  font-size: var(--font-size-base);
}
```

### JavaScript Guidelines
- Gunakan ES6+ features
- Write clean, readable code
- Add comments untuk complex logic
- Handle errors gracefully

```javascript
// Good
const addToCart = (productId, quantity = 1) => {
  try {
    const cart = getCartFromStorage();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id: productId, quantity });
    }
    
    saveCartToStorage(cart);
    updateCartUI();
    showNotification('Produk berhasil ditambahkan ke keranjang');
  } catch (error) {
    console.error('Error adding to cart:', error);
    showNotification('Gagal menambahkan produk ke keranjang', 'error');
  }
};

// Avoid
function addToCart(productId) {
  var cart = JSON.parse(localStorage.getItem('cart'));
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
}
```

### File Organization
```
├── css/
│   ├── style.css          # Main styles
│   └── components/        # Component-specific styles
├── js/
│   ├── main.js           # Main application logic
│   ├── cart.js           # Cart functionality
│   ├── products.js       # Product management
│   └── utils.js          # Utility functions
├── images/               # Optimized images
└── components/           # Reusable HTML components
```

## 🔄 Pull Request Process

### Before Submitting
- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Changes generate no new warnings
- [ ] Testing completed on multiple browsers
- [ ] Responsive design tested on various screen sizes

### PR Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] Tested with screen readers (if applicable)

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have tested my changes thoroughly
```

### Review Process
1. **Automated checks** akan dijalankan
2. **Code review** oleh maintainers
3. **Feedback** dan revisi jika diperlukan
4. **Merge** setelah approval

## 📋 Issue Guidelines

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issue
- `priority: low` - Low priority issue

### Issue Assignment
- Comment pada issue yang ingin dikerjakan
- Wait for assignment dari maintainer
- Jangan kerjakan issue yang sudah di-assign ke orang lain

## 🎨 Style Guide

### Commit Messages
Gunakan format conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(cart): add quantity update functionality
fix(navbar): resolve mobile menu toggle issue
docs(readme): update installation instructions
style(css): improve button hover animations
```

### Branch Naming
```bash
feature/add-user-authentication
bugfix/fix-cart-calculation
hotfix/security-vulnerability
docs/update-contributing-guide
```

## 🏆 Recognition

Contributors akan diakui dalam:
- README.md contributors section
- Release notes
- Special mentions dalam project updates

## 📞 Getting Help

Jika Anda membutuhkan bantuan:
- 💬 [GitHub Discussions](https://github.com/your-username/batik-ecommerce/discussions)
- 📧 Email: your.email@example.com
- 🐛 [Create an Issue](https://github.com/your-username/batik-ecommerce/issues/new)

## 📚 Resources

- [HTML Best Practices](https://github.com/hail2u/html-best-practices)
- [CSS Guidelines](https://cssguidelin.es/)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Terima kasih telah berkontribusi untuk melestarikan budaya batik Indonesia! 🏮**