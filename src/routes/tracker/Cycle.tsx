import {
  component$,
  Signal,
  useClientEffect$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Cycle } from '~/components/cycle/CycleList';
import styles from './tracker.css?inline';

export const onScroll = (
  r: Signal<Element | undefined>,
  activeDate: string
) => {
  const rect = r.value?.getBoundingClientRect();

  const mid = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
  [...(r.value?.children ?? [])].forEach((el: Element) => {
    const left = el.getBoundingClientRect().left ?? 0;
    if (Math.abs(left - rect!.left) < 38) {
      activeDate = el.id;
    }
  });
  return activeDate;
};
export const makeDay = (date: Date) => {
  return {
    date: date.toLocaleDateString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    symptoms: false,
    isPeriod: false,
    isPeriodPredicted: false,
    isOvulationPredicted: false,
  };
};
export const fetchFutureDays = (days: Cycle[]) => {
  const date = new Date(days[days.length - 1].date);
  const oneDay = 24 * 60 * 60 * 1000;

  days = [...days, makeDay(new Date(date.getTime() + oneDay))];
  return days;
};

export const fetchBeforeDays = (days: Cycle[]) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return [
    makeDay(new Date(new Date(days[0].date).getTime() - oneDay * 2)),
    makeDay(new Date(new Date(days[0].date).getTime() - oneDay)),
    ...days,
  ];
};

export const firstFetch = () => {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const daysPast = [...new Array(4).keys()].map((x, i) => {
    return makeDay(new Date(today.getTime() - oneDay * (3 - i)));
  });
  const daysFuture = [...new Array(4).keys()].map((x, i) => {
    return makeDay(new Date(today.getTime() + oneDay * (i + 1)));
  });
  return [...daysPast, ...daysFuture];
};

export default component$(() => {
  useStylesScoped$(styles);
  const today = new Date();
  const ref = useSignal<Element>();
  const firstRef = useSignal<Element>();

  const lastRef = useSignal<Element>();

  const store = useStore({
    cycleList: firstFetch(),
    activeDate: `${today.toLocaleDateString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}`,
  });

  useClientEffect$(() => {
    if (ref.value) {
      ref.value.scrollLeft =
        3 * ref.value.children[0].getBoundingClientRect().width + 23;
    }
  });

  useClientEffect$(({ track }) => {
    const r = track(() => ref);
    const activeDate = track(() => store.activeDate);
    const cycleList = track(() => store.cycleList);

    store.activeDate = onScroll(r, activeDate);

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          store.cycleList = fetchFutureDays(cycleList);
        }
      });
    });
    const firstObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            store.cycleList = fetchBeforeDays(cycleList);
            if (ref.value)
              ref.value.scrollLeft =
                ref.value.children[0].getBoundingClientRect().width * 3 + 26; //+ 13;
          }
        });
      },
      { root: ref.value, rootMargin: '0px 0px 0px 23px' }
    );

    if (lastRef.value) observer.observe(lastRef.value);
    if (firstRef.value) firstObserver.observe(firstRef.value);
    return () => {
      firstObserver.disconnect();
      observer.disconnect();
    };
  });

  return (
    <div class="stack">
      {store.activeDate}
      <div
        ref={ref}
        class="cycle"
        onScroll$={() => {
          store.activeDate = onScroll(ref, store.activeDate);
        }}
      >
        {store.cycleList.map((p, i) => {
          const params: any = {
            class: `day  ${p.isPeriod ? 'period' : i === 0 ? 'period' : ''} ${
              p.date === store.activeDate ? 'today' : ''
            }`,
            id: p.date,
          };
          if (i === store.cycleList.length - 1) {
            params['ref'] = lastRef;
          } else if (i === 0) params['ref'] = firstRef;
          return (
            <div {...params}>
              {new Date(p.date).getMonth() + 1} /{new Date(p.date).getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
});
