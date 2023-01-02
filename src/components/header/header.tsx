import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo"></div>
      <ul>
        <li>
          <a href="/tracker" target="_blank">
            tracker
          </a>
        </li>
      </ul>
    </header>
  );
});
