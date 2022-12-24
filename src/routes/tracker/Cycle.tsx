import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './tracker.css?inline';

interface CycleProps {
  cycleLength: number;
  periodLength: number;
  today?: number;
}

export default component$(
  ({ cycleLength, periodLength, today }: CycleProps) => {
    useStylesScoped$(styles);
    return (
      <div class="cycle">
        {[...new Array(cycleLength).keys()].map((p, i) => (
          <div
            class={`day  ${i < periodLength ? 'period' : ''} ${
              today === i ? 'today' : ''
            }`}
          />
        ))}
      </div>
    );
  }
);
