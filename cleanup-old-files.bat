@echo off
echo Membersihkan file-file lama yang tidak diperlukan...

REM Hapus file JavaScript lama yang kompleks
del /q "js\admin-dashboard.js" 2>nul
del /q "js\admin.js" 2>nul
del /q "js\api.js" 2>nul
del /q "js\cart-db.js" 2>nul
del /q "js\cart-page.js" 2>nul
del /q "js\cart-reset.js" 2>nul
del /q "js\cart-utils.js" 2>nul
del /q "js\cart.js" 2>nul
del /q "js\checkout.js" 2>nul
del /q "js\filter.js" 2>nul
del /q "js\my-orders.js" 2>nul
del /q "js\pagination.js" 2>nul
del /q "js\payment-confirmation.js" 2>nul
del /q "js\products.js" 2>nul

REM Hapus file HTML yang tidak diperlukan
del /q "admin-dashboard.html" 2>nul
del /q "admin.html" 2>nul
del /q "checkout.html" 2>nul
del /q "login.html" 2>nul
del /q "my-orders.html" 2>nul
del /q "payment-confirmation.html" 2>nul
del /q "register.html" 2>nul

REM Hapus file dokumentasi lama
del /q "CART_FIX_NOTES.md" 2>nul
del /q "CHANGELOG.md" 2>nul
del /q "CONTRIBUTING.md" 2>nul
del /q "TECHNICAL_DOCS.md" 2>nul

REM Hapus file lainnya
del /q "cleanup.bat" 2>nul

echo.
echo File-file lama berhasil dihapus!
echo.
echo File yang tersisa (versi sederhana):
echo - index.html
echo - products.html  
echo - cart.html
echo - about.html (opsional)
echo - contact.html (opsional)
echo - regions.html (opsional)
echo - css/style.css
echo - js/data.js
echo - js/cart-simple.js
echo - Foto/ (folder gambar)
echo.
echo Project sekarang lebih sederhana dan mudah dipahami!
pause