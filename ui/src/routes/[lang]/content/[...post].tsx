import { A, cache, createAsync, useParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import Playground from "~/components/Playground";
import Layout from "~/layouts/layout";

const getSourceCode = cache(async (post) => {
  "use server";
  const { codeToHtml } = await import("shiki");
  const files = import.meta.glob("../../../../../src/**/*.rs", { as: "raw" });

  const code = await files["../../../../../src/" + post]();

  const html = await codeToHtml(code, {
    lang: "rust",
    theme: "vitesse-light",
  });
  return { code, html };
}, "code");

export default () => {
  const post = useParams().post;

  const data = createAsync(() => getSourceCode(post));
  const [isPlaygroundMode, setPlaygroundMode] = createSignal(false);
  return (
    <Layout
      HeaderRightSlot={
        <>
          <span>{"/" + post}</span>
          <div class="flex-1"></div>
          <A href={"https://github.com/KonghaYao/Rust/blob/master/src/" + post}>
            GITHUB
          </A>
          <button onclick={() => setPlaygroundMode((i) => !i)}>play</button>
        </>
      }
    >
      <article>
        {isPlaygroundMode() ? (
          <Playground code={data()?.code}></Playground>
        ) : (
          <section class="py-12" innerHTML={data()?.html}></section>
        )}
      </article>
    </Layout>
  );
};
