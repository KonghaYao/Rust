import { A, cache, createAsync, useLocation, useParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import Playground from "~/components/Playground";
import Layout from "~/layouts/layout";
import { codeToHtml } from "shiki";
import { isServer } from "solid-js/web";
import copy from "copy-to-clipboard";

const getSourceCode = cache(async (post) => {
  "use server";
  const files = import.meta.glob("../../../../../src/**/*.rs", { as: "raw" });

  const code = await files["../../../../../src/" + post]();

  const html = await codeToHtml(code, {
    lang: "rust",
    theme: "vitesse-light",
  });
  return { code, html };
}, "code");

export default () => {
  const post = createMemo(() => useParams().post);

  const data = createAsync(() => getSourceCode(post()));
  const location = useLocation();
  const [isPlaygroundMode, setPlaygroundMode] = createSignal(
    location.query.playing
  );
  createEffect(() => {
    const oldSP = new URLSearchParams(globalThis.location.search);
    if (isPlaygroundMode() && !isServer) {
      oldSP.set("playing", "true");
    } else {
      oldSP.delete("playing");
    }
    const newURL =
      window.location.pathname + "?" + oldSP.toString() + location.hash;
    window.history.replaceState({}, "", newURL);
  });
  return (
    <Layout
      HeaderRightSlot={
        <>
          <div class="flex-1"></div>
          <div class="flex gap-4">
            <button
              class="bg-orange-600 text-white rounded-md px-2"
              onclick={() => setPlaygroundMode((i) => (!i).toString())}
            >
              {isPlaygroundMode()
                ? "Back To Source Code"
                : "Run Code In Rust Playground!"}
            </button>
            <button
              onclick={() => {
                copy(window.location.href);
                confirm('Copied Link!')
              }}
            >
              Share
            </button>
          </div>
          <A
            href={"https://github.com/KonghaYao/Rust/blob/master/src/" + post()}
          >
            GITHUB
          </A>
        </>
      }
    >
      <article>
        {isPlaygroundMode() && data()?.code ? (
          <Playground code={data()!.code}></Playground>
        ) : (
          <Code code={data()?.html}></Code>
        )}
      </article>
    </Layout>
  );
};
const findLine = (node: HTMLElement): HTMLElement | null => {
  if (node.classList.contains("line")) return node;
  if (!node.parentElement) return null;
  return findLine(node.parentElement);
};
const getElBetween = (start: HTMLElement, end: HTMLElement) => {
  const els = [];
  while (start !== end) {
    if (!start.nextElementSibling) break;
    start = start.nextElementSibling as HTMLElement;
    els.push(start);
  }
  return els;
};

const renderCodeHash = ([startLine, endLine]: number[]) => {
  return `#L${startLine}-L${endLine}`;
};
const Code = (props: { code?: string }) => {
  const [container, setContainer] = createSignal<HTMLElement>();

  const [selectedRange, setSelectionRange] = createSignal<number[]>([]);
  createEffect(() => {
    if (selectedRange().length === 2 && !isServer) {
      location.hash = renderCodeHash(selectedRange());
    }
  });
  onMount(() => {
    const data = location.hash.match(/#L(\d+)-L(\d+)/);
    if (data) {
      setSelectionRange(data.slice(1).map((i) => parseInt(i)));
      [...container()!.querySelectorAll(".line")]
        .slice(...selectedRange())
        .forEach((i) => {
          i.classList.add("marked");
        });
    }

    container()!.addEventListener("mouseup", function () {
      // 获取选中的文本
      const selection = window.getSelection();
      if ((selection?.rangeCount || 0) > 0) {
        const range = selection!.getRangeAt(0);
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;
        console.log(range);
        if (
          startContainer === endContainer &&
          range.startOffset === range.endOffset
        )
          return;

        // 获取选中文本的父元素
        const startElement = findLine(
          (startContainer.nodeType === 3
            ? startContainer.parentNode!
            : startContainer) as HTMLElement
        );
        const endElement = findLine(
          (endContainer.nodeType === 3
            ? endContainer.parentNode!
            : endContainer) as HTMLElement
        );
        function markElement(element: HTMLElement) {
          element.classList.add("marked");
        }
        const getElIndex = (el: HTMLElement) => {
          return [...el.parentElement!.children].indexOf(el);
        };

        if (startElement && endElement) {
          [...startElement.parentElement?.children!].forEach((i) => {
            i.classList.remove("marked");
          });
          [
            startElement,
            ...getElBetween(startElement, endElement).filter((i) => {
              return i.classList.contains("line");
            }),
            endElement,
          ].forEach((i) => markElement(i));
          setSelectionRange([getElIndex(startElement), getElIndex(endElement)]);
        }
      }
    });
  });
  return (
    <>
      <section ref={setContainer} class="py-6" innerHTML={props.code}></section>
    </>
  );
};
