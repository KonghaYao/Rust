import { cache, createAsync } from "@solidjs/router";
const requireGist = async (code: string) => {
  console.info("request gist id");
  return fetch("https://play.rust-lang.org/meta/gist", {
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "content-type": "application/json",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      Referer:
        "https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=7274d47e69716e12d8f367da077eb9fe",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: JSON.stringify({ code }),
    method: "POST",
  }).then<{ id: string; code: string; url: string }>((res) => res.json());
};
const codeCache = new Map();
const codeToGistId = cache(async (code: string) => {
  "use server";
  if (codeCache.has(code)) return codeCache.get(code);
  return requireGist(code).then((res) => {
    codeCache.set(code, res.id);
    return res.id;
  });
}, "playground-gist-id");
export default (props: { code?: string }) => {
  const id = createAsync(async () => {
    if (!props.code) return "";
    return codeToGistId(props.code);
  });
  return (
    <div class="w-full content-height">
      <iframe
        class="w-full h-full"
        src={
          "https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=" +
          id()
        }
        // @ts-ignore
        frameborder="0"
      ></iframe>
    </div>
  );
};
