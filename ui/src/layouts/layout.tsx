import { JSXElement } from "solid-js";
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";

export default (props: {
  children: JSXElement;
  HeaderRightSlot?: JSXElement;
}) => {
  return (
    <section class="flex flex-col h-full">
      <Header HeaderRightSlot={props.HeaderRightSlot}></Header>
      <div class="content-height flex flex-row-reverse overflow-hidden">
        <main class="col-span-9 flex-1 overflow-auto px-16">
          {props.children}
        </main>
        <Sidebar></Sidebar>
      </div>
    </section>
  );
};
