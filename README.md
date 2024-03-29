# Deprecated

### rxjs-typed.ts is now deprecated in favor of [typed.ts](https://github.com/LoaderB0T/typed.ts)'s new support of custom data structures

### To use typed.ts with RxJS, simply use the factory function `Typed.factory` and pass in an object with the following properties

```typescript
import { Typed } from 'typed.ts';
import { BehaviorSubject } from 'rxjs';

const typedFac = Typed.factory({
  setUp: () => new BehaviorSubject(''),
  update: (textSubj, text) => textSubj.next(text)
});

const typed = typedFac({ // Same arguments as new Typed()
  perLetterDelay: { min: 20, max: 200 }
});

// only change here is the missing "$" at the end of text
typed.text.subscribe(console.log);
```

### This is a fairly simple change, but it allows typed.ts to be used with any custom data structure, not just RxJS observables

### If you are using Angular, you can even use the signals API that was introduced in v16 to make it even easier to use typed.ts in your templates

```typescript
import { Typed } from 'typed.ts';
import { signal, effect } from '@angular/core';

const typedFac = Typed.factory({
  setUp: () => signal(''),
  update: (textSig, text) => textSig.set(text)
});

const typed = typedFac({ // Same arguments as new Typed() except no callback
  perLetterDelay: { min: 20, max: 200 }
});

effect(() => console.log(typed.text()));
// use typed.text() directly in your template
```

[![npm](https://img.shields.io/npm/v/rxjs-typed.ts?color=%2300d26a&style=for-the-badge)](https://www.npmjs.com/package/rxjs-typed.ts)
[![CI](https://img.shields.io/github/actions/workflow/status/LoaderB0T/rxjs-typed.ts/build.yml?branch=main&style=for-the-badge)](https://github.com/LoaderB0T/rxjs-typed.ts/actions/workflows/build.yml)
[![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/LoaderB0T_rxjs-typed.ts?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)](https://sonarcloud.io/summary/new_code?id=LoaderB0T_rxjs-typed.ts)
[![bundle size](https://img.shields.io/bundlephobia/minzip/rxjs-typed.ts?color=%23FF006F&label=Bundle%20Size&style=for-the-badge)](https://bundlephobia.com/package/rxjs-typed.ts)

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

✅ ESM & CJS exports

✅ Can be used in Angular templates directly with the [`async` pipe](https://angular.io/api/common/AsyncPipe)

Read all about typed.ts [here](https://github.com/LoaderB0T/typed.ts).

## Built With 🔧

- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)

## Getting Started 🚀

```typescript
import { Typed } from 'rxjs-typed.ts';

const typed = new Typed({ eraseDelay: { min: 20, max: 40 } });
typed.text$.subscribe(text => console.log(text));

const line1 = 'Hello, World!';
const line2 = 'slow';
const line3 = 'this is typed really fast, but errors are slow';
const line4 = 'this line is fast forwarded. No errors will be made';

const type = async () => {
  typed
    .type(line1)
    .backspace(line1.length)
    .type(line2, { perLetterDelay: { min: 200, max: 400 } })
    .backspace(line2.length)
    .type(line3, { eraseDelay: { min: 40, max: 80 }, perLetterDelay: { min: 200, max: 400 } })
    .backspace(line3.length);

  typed.fastForward();
  await typed.run();
  await typed.reset(true);
  typed.type(line4);
  await typed.run();
};

type();
```

## Documentation 📖

Get started by creating a new instance of the `Typed` class. The typed object has a `text$` property that emits the current text every time it changes. In this example, we are simply logging the text to the console, but you can use it to update the DOM or whatever you want.

If you are using Angular, check out the [Angular section](#angular) for a convenient way to use `typed.ts` in your templates.

```typescript
import { Typed } from 'typed.ts';
const typed = new Typed();

typed.text$.subscribe(text => console.log(text));
```

### Options

You can pass some options to the constructor. These are the default values:

```typescript
const typed = new Typed({
  eraseDelay: { min: 150, max: 250 },
  errorDelay: { min: 50, max: 100 },
  perLetterDelay: { min: 40, max: 150 },
  errorMultiplier: 1,
  noSpecialCharErrors: false,
  locale: 'en'
});
```

- `callback` - The callback function that will be called every time the text changes. This is required.
- `eraseDelay` - The delay between erasing characters.
- `errorDelay` - The delay between making errors and correcting them.
- `perLetterDelay` - The delay between typing characters.
- `errorMultiplier` - The multiplier for how often an error will be made. The value ranges from 0 to n. 0 means no errors, 1 means normal errors, 2 means twice as many errors, etc. Can be a decimal number.
- `noSpecialCharErrors` - If set to true, errors will only be made on letters and numbers. Special characters will always be typed correctly.
- `locale` - The locale to use for the keyboard layout. Currently only `en` and `de` are supported, but you can [add your own layouts](#add-your-own-keyboard-layouts).

ℹ️ The delay values can be either a number or an object with a `min` and `max` property. If you pass an object, the delay will be a random number between `min` and `max`.

### Methods

To prepare the typing animation, `typed.ts` provides a few methods. These methods are chainable, so you can call them one after another. Note that the methods are not executed immediately, but rather when you call the `run` method.

```typescript
// All available type() options and their default values:
const typeOptions = {
  eraseDelay: { min: 150, max: 250 },
  errorDelay: { min: 50, max: 100 },
  perLetterDelay: { min: 40, max: 150 },
  errorMultiplier: 1,
  noSpecialCharErrors: false,
  locale: 'en',
  className: 'my-class' // <-- explained further down
}

typed.type('Hello, World!', typeOptions);
// Will type 'Hello, World!'

// All available erase() options and their default values:
const eraseOptions = {
  eraseDelay: { min: 150, max: 250 }
}

// Wait for 1 second before continuing.
typed.wait(1000);

typed.backspace(6, eraseOptions);
// Will erase until the text is 'Hello, '

typed.type('you!', typeOptions);
// Will type until the text is 'Hello, you!'

// This will start the prepared typing animation.
await typed.run(); // Returns a promise that resolves when the animation is done.
```

To reset or fast forward the typing animation, you can call the `reset` and `fastForward` methods.

```typescript
// This will reset the typing animation.
typed.reset();

// This will fast forward the typing animation, skipping all delays and will only type the relevant characters for the end result.
typed.fastForward(); // Returns a promise that resolves when the animation is done.
```

### Custom classes

The type method accepts an optional `className` option. This can be used to add custom classes to the typed text. This can be useful if you want to style the text differently depending on the context.

```typescript
const username = 'LoaderB0T';
typed.type('Hello ');
typed.type(username, { className: 'username' });
typed.type('. How are you doing today?');
```

```css
.username {
  text-decoration: underline;
  color: #ff0042;
}
```

The resulting string will look like this:

```html
<span>Hello </span>
<span class="username">LoaderB0T</span>
<span>. How are you doing today?</span>
```

`typed.ts` will automatically handle backspaces correctly, so if you erase the username, the class will also be removed.

### Add your own keyboard layouts

You can add your own keyboard layout by calling the `addKeyboard` method on an instance of the `Typed` class.

```typescript
import { Typed } from 'typed.ts';
const typed = new Typed();

typed.addKeyboard('de', {
  lower: ['1234567890ß', 'qwertzuiopü+', 'asdfghjklöä#', 'yxcvbnm,.-', ' '],
  upper: ['!"§$%&/()=?', 'QWERTZUIOPÜ*', "ASDFGHJKLÖÄ'", 'YXCVBNM;:_', ' ']
});
```

It takes two parameters: The name of the layout and an object with two properties: `lower` and `upper`. Each of these properties is an array of strings, where each string represents a row on the keyboard. The first string in the array is the top row, the second string is the second row, etc.

ℹ️ The `de` keyboard layout is already included in the package, so you don't need to add it again.

### Angular

If you want to use `typed.ts` in an Angular project, you can use the `async` pipe to display the typed text.

```html
<span class="typing">{{typing.text$ | async}}</span>

<!-- OR -->

<span class="typing"
      [innerHtml]="typing.text$ | async"></span>
```

ℹ️ If you want to use the `className` option, you have to use the `innerHtml` binding!

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
