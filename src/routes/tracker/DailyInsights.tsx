import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './tracker.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="dailyinsights">
      <div>daily insights</div>
      <div class="insights">
        <button class="pink">
          <div class="insights-button">+ log period</div>
        </button>
        <button class="green">
          <div class="insights-button">+ log symptoms</div>
        </button>
        <button class="orange">
          <div class="insights-button">luteal phase 101</div>
        </button>
      </div>
    </div>
  );
});
