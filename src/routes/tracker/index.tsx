import { component$, useStylesScoped$ } from '@builder.io/qwik';

import CurrentCycle from './CurrentCycle';
import CycleHistory from './CycleHistory';
import CyclePrediction from './CyclePrediction';
import DailyInsights from './DailyInsights';

import styles from './tracker.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <CurrentCycle />
      <CyclePrediction />
      <CycleHistory />
    </>
  );
});
