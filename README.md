# Sun'iy intellekt — bepul vebinar

Beshta variant, kit tuzilmasi:

```
/          Site 1  (oq / ko'k)     Figma 3481:488
/a/        Site 2  (qora / oltin)  Figma 3481:560
/b/        Site 3  (oq / to'q sariq) Figma 3474:408
/c/        Site 4  (oq / ko'k)     AI bilan hisobot va taqdimotlar
/d/        Site 5  (oltin)         Sun’iy intellekt vebinari
/thankYou.html
```

Local:

```
node tools/serve.mjs 8899
# http://127.0.0.1:8899/
# http://127.0.0.1:8899/a/
# http://127.0.0.1:8899/b/
# http://127.0.0.1:8899/c/
# http://127.0.0.1:8899/d/
```

Barcha variantlar faqat telefon raqamini yig‘adi va umumiy `js/phoneFormatter.js`, `js/app.js`, `/thankYou.html` orqali loyihaning mavjud Sheets va Telegram ulanishlaridan foydalanadi.
