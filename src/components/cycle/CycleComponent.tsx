import {
  component$,
  useClientEffect$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './cyclecomponent.css?inline';

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
    const lastRef = useSignal<Element>();
    const signal = useSignal<Element>();
    return <div>asdf</div>;
    // const rect = ref.value?.getBoundingClientRect();
    // const mid = (rect?.left ?? 0) + (rect?.width ?? 0) / 2;
    // // const dayTimeline = new ScrollTimeline({scrollOffsets: []})
    // return (
    //   <div
    //     class="cycle"
    //     ref={ref}
    //     onScroll$={(ev) => {
    //       [...(ref.value?.children ?? [])].forEach((el: Element, i) => {
    //         const left = el.getBoundingClientRect().left ?? 0;

    //         if (Math.abs(left - mid) < 32) {
    //           store.activeIndex = i;
    //         }
    //       });
    //     }}
    //   >
    //     {[...new Array(cycleLength).keys()].map((p, i) => (
    //       <a
    //         href={`#${i}`}
    //         class={`day  ${i < periodLength ? 'period' : ''}
    //         ${i === store.activeIndex ? 'today' : ''}`}
    //         onClick$={(e) => {
    //           console.log('click', e);
    //           store.activeIndex = i;
    //           //   scrollTo(e.pageX, e.pageY);
    //         }}
    //       >
    //         {i}
    //       </a>
    //     ))}
    //   </div>
    // );
  }
);
