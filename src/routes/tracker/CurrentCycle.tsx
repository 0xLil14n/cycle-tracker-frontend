import { component$, useStylesScoped$ } from '@builder.io/qwik';
import Cycle from './Cycle';
import DailyInsights from './DailyInsights';
import styles from './tracker.css?inline';

export default component$(() => {
  const currCycle = {
    length: 28,
    periodStart: '11/22/22',
    periodEnd: '11/25/22',
    periodLength: 3,
  };

  useStylesScoped$(styles);
  return (
    <div class="card">
      <h3 class="card-title">
        <div>
          cycle started {currCycle.periodStart} ({currCycle.length} days)
        </div>
      </h3>
      <Cycle periodLength={currCycle.periodLength} today={6} cycleLength={13} />
      <DailyInsights />
    </div>
  );
});
