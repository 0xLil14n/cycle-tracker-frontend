import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './tracker.css?inline';

export default component$(() => {
  const periodPrediction = {
    periodStart: '1/3/23',
    periodEnd: '1/7/23',
    daysOfBuffer: 7,
  };
  useStylesScoped$(styles);
  return (
    <div class="card">
      <h3 class="card-title">cycle prediction</h3>
      <p class="center">
        your period is likely to start around {periodPrediction.periodStart}
      </p>
    </div>
  );
});
