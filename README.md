[![npm](https://img.shields.io/npm/v/rxjs-typed.ts?color=%2300d26a&style=for-the-badge)](https://www.npmjs.com/package/rxjs-typed.ts)

# rxjs-typed.ts

Realistic typing simulations in TypeScript & RxJS!

## Motivation 💥

This package extends the typed.ts package with an observable output instead of a callback. Read all about typed.ts [here](https://github.com/LoaderB0T/typed.ts)

## Features 🔥

✅ Provides the same functionality as typed.ts

✅ Uses RxJS Observable instead of callback

Read all about typed.ts [here](https://github.com/LoaderB0T/typed.ts)

## Built With 🔧

- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)

## Getting Started 🚀

```typescript
import { Typed } from 'rxjs-typed.ts';

const typed = new Typed({
  callback: text => {
    console.log(text);
  }
});

const line1 = 'Hello, World!';
const line2 = 'slow';
const line3 = 'this is typed really fast, but errors are slow';
const line4 = 'this line is fast forwarded. No errors will be made';

const type = async () => {
  await typed.start(line1);
  await typed.backspace(line1.length, { minEraseDelay: 20, maxEraseDelay: 40 });
  await typed.start(line2, { minDelay: 200, maxDelay: 400 });
  await typed.backspace(line2.length, { minEraseDelay: 20, maxEraseDelay: 40 });
  await typed.start(line3, { minDelay: 40, maxDelay: 80, minEraseDelay: 200, maxEraseDelay: 400 });
  await typed.backspace(line3.length, { minEraseDelay: 20, maxEraseDelay: 40 });
  typed.fastForward();
  await typed.start(line4);
  typed.fastForward(false);
  typed.reset();
};

type();
```

## Contributing 🧑🏻‍💻

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 🔑

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact 📧

Your Name - [@LoaderB0T](https://twitter.com/LoaderB0T) - [linkedin](https://www.linkedin.com/in/janikschumacher/)

Project Link: [https://github.com/LoaderB0T/rxjs-typed.ts](https://github.com/LoaderB0T/rxjs-typed.ts)
