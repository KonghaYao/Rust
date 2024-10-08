import { createMemo } from "solid-js";
export default (props: { code: string }) => {
  const url = createMemo(() => {
    const u = new URL("https://play.rust-lang.org/");
    const searchParams = u.searchParams;
    searchParams.set("code", props.code!);
    searchParams.set("mode", "debug");
    searchParams.set("edition", "2021");
    searchParams.set("version", "stable");
    return u.toString();
  });
  return (
    <div class="w-full content-height">
      <iframe
        class="w-full h-full"
        src={url()}
        // @ts-ignore
        frameborder="0"
      ></iframe>
    </div>
  );
};
