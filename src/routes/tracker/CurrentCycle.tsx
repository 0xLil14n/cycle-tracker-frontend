import { component$, useStylesScoped$ } from '@builder.io/qwik';
import CycleComponent from '~/components/cycle/CycleComponent';
import NewCycle from '~/components/cycle/NewCycle';
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
      <CycleComponent
        periodLength={currCycle.periodLength}
        today={6}
        cycleLength={100}
      />
      <NewCycle />
      <DailyInsights />
    </div>
  );
});
