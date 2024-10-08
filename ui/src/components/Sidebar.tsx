import { A, useHref, useParams } from "@solidjs/router";
import routers from "../../public/index.json";
import { createMemo, createSignal, useContext } from "solid-js";

export default () => {
  const routerTree = routers
    .map((i) => {
      return {
        ...i,
        paths: i.path.split("/").filter(Boolean),
      };
    })
    .reduce((acc, i) => {
      let current = acc;

      i.paths.forEach((p, index) => {
        if (index === i.paths.length - 1) {
          current[p] = i.path;
        }
        if (!current[p]) {
          current[p] = {};
        }
        current = current[p] as RouterTreeType;
      });
      return acc;
    }, {} as RouterTreeType);
  const [hidden, setHidden] = createSignal(false);
  const [searchText, setSearchText] = createSignal("");
  return (
    <nav
      class="flex flex-col h-full w-64 overflow-auto p-4 border-r border-gray-200"
      classList={{
        hidden: hidden(),
      }}
    >
      <header class="flex gap-4 mb-6">
        {/* <button onclick={() => setHidden((i) => !i)}>hide</button> */}
        <input
          class="outline-none bg-gray-100 rounded-md px-2"
          type="input"
          value={searchText()}
          oninput={(e) => setSearchText(e.target.value)}
        ></input>
      </header>
      <RouterTree
        name="Home"
        tree={routerTree}
        deep={0}
        open
        searchText={searchText()}
      ></RouterTree>
    </nav>
  );
};

//  RouterTree

interface RouterTreeType {
  [k: string]: RouterTreeType | string;
}

export const RouterTree = (props: {
  tree: RouterTreeType;
  name: string;
  deep: number;
  open?: boolean;
  searchText: string;
}) => {
  const layer = createMemo(() => {
    return Object.entries(props.tree).map(([key, value]) => {
      if (typeof value === "string") {
        return {
          isFile: true,
          value,
          name: key,
        };
      }
      return {
        isFile: false,
        value,
        name: key,
      };
    });
  });
  const params = useParams();
  return (
    <details
      open={props.open ?? !!props.searchText}
      style={{
        "padding-left": `${props.deep * 0.25}em`,
      }}
    >
      <summary class="cursor-pointer">{props.name}</summary>
      <div class="flex flex-col pl-4">
        {layer().map((i) => {
          if (
            props.searchText &&
            i.isFile &&
            !i.name.includes(props.searchText)
          ) {
            return null;
          }
          if (typeof i.value === "string")
            return (
              <A
                href={"/" + params.lang + "/content" + i.value}
                class="overflow-hidden whitespace-nowrap text-ellipsis"
                classList={{
                  "searching-active": !!props.searchText,
                }}
                title={i.name}
              >
                {i.name}
              </A>
            );
          return (
            <RouterTree
              name={i.name}
              tree={i.value}
              deep={props.deep + 1}
              searchText={props.searchText}
            ></RouterTree>
          );
        })}
      </div>
    </details>
  );
};
