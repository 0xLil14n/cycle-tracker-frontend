import {
  component$,
  useClientEffect$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './tracker.css?inline';

interface CycleProps {
  cycleLength: number;
  periodLength: number;
  today?: number;
}

export default component$(
  ({ cycleLength, periodLength, today }: CycleProps) => {
    useStylesScoped$(styles);
    const store = useStore({ activeIndex: 6 });

    const ref = useSignal<Element>();
    // useClientEffect$(() => {
    //   [...(ref.value?.children ?? '')].forEach((el: Element) => {
    //     console.log(el.getBoundingClientRect().left);
    //   });
    //   const observer = new IntersectionObserver((entries, observer) => {
    //     console.log('entries', entries);
    //   });
    //   if (ref) observer.observe(ref.value!);
    // });

    return (
      <div
        class="cycle"
        ref={ref}
        // onScroll$={(ev) => {
        // const rect = ref.value?.getBoundingClientRect();
        // const mid = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
        // console.log('mid', mid);
        // [...(ref.value?.children ?? [])].forEach((el: Element, i) => {
        // const left = el.getBoundingClientRect().left ?? 0;
        // console.log('diff', Math.abs(left - mid));
        // if (Math.abs(left - mid) < 20) {
        // console.log(el);
        // store.activeIndex = i;
        // el.classList.add('today');
        // }
        // });
        // }}

        // onTouchStart$={(e) =>
        //   console.log('ontouchstart', e.changedTouches[0].clientX)
        // }
        // onTouchEnd$={(e) =>
        //   console.log('ontouchend', e.changedTouches[0].clientX)
        // }
      >
        {[...new Array(cycleLength).keys()].map((p, i) => (
          <div
            class={`day  ${i < periodLength ? 'period' : ''} 
            ${i === store.activeIndex ? 'today' : ''}`}
            onClick$={() => (store.activeIndex = i)}
          />
        ))}
      </div>
    );
  }
);
