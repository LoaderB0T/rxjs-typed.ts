import { RequiredTypingOptions as RequiredTypingOptionsTS } from 'typed.ts';

export type RequiredTypingOptions = Omit<RequiredTypingOptionsTS, 'callback'>;
