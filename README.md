[![npm](https://img.shields.io/npm/v/rxjs-typed.ts?color=%2300d26a&style=for-the-badge)](https://www.npmjs.com/package/rxjs-typed.ts)
[![CI](https://img.shields.io/github/workflow/status/LoaderB0T/rxjs-typed.ts/CI/main?style=for-the-badge)](https://github.com/LoaderB0T/rxjs-typed.ts/actions/workflows/build.yml)
[![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/LoaderB0T_rxjs-typed.ts?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)](https://sonarcloud.io/summary/new_code?id=LoaderB0T_rxjs-typed.ts)

# rxjs-typed.ts

Realistic typing simulations in TypeScript & RxJS!

## Motivation 💥

This package extends the typed.ts package with an observable output instead of a callback. Read all about typed.ts [here](https://github.com/LoaderB0T/typed.ts).

## Example 🧮

<p align="center">
  <img src="readme/example.gif" height="350">
</p>

## Features 🔥

✅ Provides the same functionality as typed.ts

✅ Uses RxJS Observable instead of callback

✅ Can be used in Angular templates directly with the [`async` pipe](https://angular.io/api/common/AsyncPipe)

Read all about typed.ts [here](https://github.com/LoaderB0T/typed.ts).

## Built With 🔧

- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)

## Getting Started 🚀

```typescript
import { Typed } from './rxjs-typed';

const typed = new Typed();
typed.text$.subscribe(text => console.log(text));

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

Janik Schumacher - [@LoaderB0T](https://twitter.com/LoaderB0T) - [linkedin](https://www.linkedin.com/in/janikschumacher/)

Project Link: [https://github.com/LoaderB0T/rxjs-typed.ts](https://github.com/LoaderB0T/rxjs-typed.ts)

