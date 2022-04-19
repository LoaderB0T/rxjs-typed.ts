import { BehaviorSubject } from 'rxjs';
import { ConstructorTypingOptions, Typed as TypedTs } from 'typed.ts';
import { RequiredTypingOptions } from './types/options.js';

export class Typed extends TypedTs {
  private readonly _text = new BehaviorSubject('');
  public readonly text$ = this._text.asObservable();

  constructor(options: RequiredTypingOptions = {}) {
    const oldOptions: ConstructorTypingOptions = {
      ...options,
      callback: (text: string) => {
        this._text.next(text);
      }
    };

    super(oldOptions);
  }
}
