import { JSXElement } from "solid-js";

export default (props: { HeaderRightSlot?: JSXElement }) => {
  return (
    <header class="w-full h-12 border-b border-solid border-gray-200">
      <div class="flex flex-wrap items-center justify-between px-4 mx-auto h-full">
        <a href="/" class="flex items-center">
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            The Algorithms - Rust
          </span>
        </a>
        <div class="flex items-center lg:order-2 gap-4">
          {props.HeaderRightSlot}
        </div>
        <div class="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"></div>
      </div>
    </header>
  );
};
