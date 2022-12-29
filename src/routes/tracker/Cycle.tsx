import {
  component$,
  Signal,
  useClientEffect$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './tracker.css?inline';

interface Cycle {
  date: string;
  symptoms: boolean;
  isPeriod: boolean;
  isPeriodPredicted: boolean;
  isOvulationPredicted: boolean;
}
export const onScroll = (
  r: Signal<Element | undefined>,
  activeDate: string
) => {
  const rect = r.value?.getBoundingClientRect();

  const mid = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
  [...(r.value?.children ?? [])].forEach((el: Element) => {
    const left = el.getBoundingClientRect().left ?? 0;
    if (Math.abs(left - mid) < 32) {
      activeDate = el.id;
    }
  });
  return activeDate;
};

export const cycle: Cycle[] = [
  {
    date: 'December 21, 2022',
    symptoms: true,
    isPeriod: true,
    isPeriodPredicted: true,
    isOvulationPredicted: false,
  },
  {
    date: 'December 22, 2022',
    symptoms: true,
    isPeriod: true,
    isPeriodPredicted: true,
    isOvulationPredicted: false,
  },
  {
    date: 'December 23, 2022',
    symptoms: true,
    isPeriod: true,
    isPeriodPredicted: true,
    isOvulationPredicted: false,
  },
  {
    date: 'December 24, 2022',
    symptoms: true,
    isPeriod: true,
    isPeriodPredicted: true,
    isOvulationPredicted: false,
  },
  {
    date: 'December 25, 2022',
    symptoms: false,
    isPeriod: true,
    isPeriodPredicted: true,
    isOvulationPredicted: false,
  },
  {
    date: 'December 26, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'December 27, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'December 28, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'December 29, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'December 30, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'December 31, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'January 1, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'January 2, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'January 3, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
  {
    date: 'January 4, 2022',
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  },
];
export default component$(() => {
  useStylesScoped$(styles);
  const today = new Date();
  const ref = useSignal<Element>();
  const store = useStore({
    activeIndex: 6,
    activeDate: `${today.toLocaleDateString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}`,
  });

  useClientEffect$(({ track }) => {
    const r = track(() => ref);
    const activeDate = track(() => store.activeDate);
    store.activeDate = onScroll(r, activeDate);
  });

  return (
    <>
      {store.activeDate}
      <div
        ref={ref}
        class="cycle"
        onScroll$={() => {
          console.log('store.activeDate:', store.activeDate);
          store.activeDate = onScroll(ref, store.activeDate);
        }}
      >
        {cycle.map((p, i) => (
          <div
            id={p.date}
            class={`day  ${p.isPeriod ? 'period' : ''} ${
              p.date === store.activeDate ? 'today' : ''
            }`}
          >
            {i}
          </div>
        ))}
      </div>
    </>
  );
});
