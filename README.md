# JS/TS Test Playground

Bol miktarda popüler npm paketi içeren JS/TS test/oyun alanı projesi.

## Komutlar

```bash
npm install            # bağımlılıkları yükle
npm run dev            # tsx watch ile geliştirme modu
npm run run:ts         # src/index.ts'yi tek seferlik çalıştır
npm run build          # TypeScript'i dist/ altına derle
npm start              # derlenmiş dist/index.js'yi çalıştır
npm test               # Jest ile testleri çalıştır
npm run lint           # ESLint
npm run format         # Prettier
```

## İçerik

- **Web framework'leri:** express, koa, fastify
- **HTTP istemcileri:** axios, got, node-fetch
- **Validation:** zod, joi, yup
- **Yardımcı kütüphaneler:** lodash, ramda, rxjs
- **Tarih:** dayjs, date-fns, moment
- **Auth:** bcryptjs, jsonwebtoken
- **Logging:** winston, pino, morgan
- **CLI:** chalk, ora, inquirer, commander
- **Realtime:** socket.io, ws
- **Diğer:** ioredis, nodemailer, multer, react, react-dom

## Demo

- `src/index.ts` — Express API (Zod doğrulama + Winston log)
- `src/examples/packages-demo.ts` — birkaç paketin kullanım örneği
- `src/__tests__/user.test.ts` — Jest ile örnek test

## Status

CI/CD pipeline aktif — EkoSistem otomatik tarama her commit'te tetikleniyor.
