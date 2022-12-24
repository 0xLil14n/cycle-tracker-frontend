import { component$, useStylesScoped$ } from '@builder.io/qwik';
import Cycle from './Cycle';
import styles from './tracker.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const cycles = [
    {
      periodLength: 4,
      periodStart: '12/22',
      periodEnd: '12/25',
      cycleEnd: '',
      cycleLength: 42,
    },
    {
      periodLength: 4,
      periodStart: '11/19',
      periodEnd: '11/23',
      cycleEnd: '12/22',
      cycleLength: 28,
    },
  ];
  return (
    <div class="card">
      <h3 class="card-title">cycle history</h3>
      {cycles.map((c) => (
        <div class="cycle-history">
          {c.periodStart} - {c.periodEnd} ({c.cycleLength} days)
          <Cycle periodLength={c.periodLength} cycleLength={c.cycleLength} />
        </div>
      ))}
    </div>
  );
});
