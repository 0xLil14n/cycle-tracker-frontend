import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './tracker.css?inline';

interface CycleProps {
  cycleLength: number;
  periodLength: number;
}

export default component$(({ cycleLength, periodLength }: CycleProps) => {
  useStylesScoped$(styles);
  const ref = useSignal<Element>();
  const store = useStore({ activeIndex: 6 });

  return (
    <div
      ref={ref}
      class="cycle"
      onScroll$={() => {
        const rect = ref.value?.getBoundingClientRect();
        const mid = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
        [...(ref.value?.children ?? [])].forEach((el: Element, i) => {
          const left = el.getBoundingClientRect().left ?? 0;

          if (Math.abs(left - mid) < 32) {
            store.activeIndex = i;
          }
        });
      }}
    >
      {[...new Array(cycleLength).keys()].map((p, i) => (
        <div
          class={`day  ${i < periodLength ? 'period' : ''} ${
            i === store.activeIndex ? 'today' : ''
          }`}
        >
          {i}
        </div>
      ))}
    </div>
  );
});
