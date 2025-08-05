@echo off
echo Membersihkan file yang tidak digunakan...

REM Hapus file JavaScript yang tidak digunakan
del /q js\admin-dashboard.js 2>nul
del /q js\admin.js 2>nul
del /q js\api.js 2>nul
del /q js\cart-db.js 2>nul
del /q js\checkout.js 2>nul
del /q js\my-orders.js 2>nul
del /q js\payment-confirmation.js 2>nul

REM Hapus file HTML yang tidak digunakan
del /q admin-dashboard.html 2>nul
del /q admin.html 2>nul
del /q checkout.html 2>nul
del /q my-orders.html 2>nul
del /q payment-confirmation.html 2>nul

REM Hapus dokumentasi berlebihan
del /q TECHNICAL_DOCS.md 2>nul
del /q CHANGELOG.md 2>nul
del /q CONTRIBUTING.md 2>nul

REM Hapus gambar yang tidak digunakan
del /q "Foto\batik pekalongan casual.jpg" 2>nul
del /q "Foto\dress batik yogyakarta.jpg" 2>nul
del /q "Foto\gajah oling.jpg" 2>nul
del /q "Foto\kain batik.jpg" 2>nul
del /q "Foto\kebaya modern solo.jpg" 2>nul
del /q "Foto\kediri.JPG" 2>nul
del /q "Foto\lasem.jpg" 2>nul
del /q "Foto\sidoarjo.jpg" 2>nul
del /q "Foto\surabaya.jpg" 2>nul
del /q "Foto\teratai.jpg" 2>nul
del /q "Foto\tulungagung.jpg" 2>nul

REM Hapus folder backend jika tidak digunakan (uncomment jika perlu)
REM rmdir /s /q backend 2>nul

echo Pembersihan selesai!
echo File yang tersisa adalah file yang benar-benar digunakan.
pause