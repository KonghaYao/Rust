import Layout from "~/layouts/layout";
export default () => {
  return (
    <Layout>
      <section>
        <div class="flex flex-col items-center px-4 py-12">
          {/* Title */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1024px-Rust_programming_language_black_logo.svg.png"
            width="100"
            height="100"
            alt="Rust Logo"
            class="mb-4"
          />
          <h1 class="text-3xl font-bold mb-4">
            <a
              href="https://github.com/TheAlgorithms/"
              class="text-blue-500 hover:underline"
            >
              The Algorithms
            </a>
            - Rust
          </h1>

          {/* Labels */}
          <div class="flex space-x-2 mb-4">
            <a href="https://gitpod.io/#https://github.com/TheAlgorithms/Rust">
              <img
                src="https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod&style=flat-square"
                height="20"
                alt="Gitpod Ready-to-Code"
              />
            </a>
            <a href="https://github.com/TheAlgorithms/Rust/actions/workflows/build.yml">
              <img
                src="https://github.com/TheAlgorithms/Rust/actions/workflows/build.yml/badge.svg"
                height="20"
                alt="Build workflow"
              />
            </a>
            <a href="https://codecov.io/gh/TheAlgorithms/Rust">
              <img
                src="https://codecov.io/gh/TheAlgorithms/Rust/graph/badge.svg?token=nRkPKfbs42"
                height="20"
                alt="Codecov"
              />
            </a>
            <a href="https://the-algorithms.com/discord">
              <img
                src="https://img.shields.io/discord/808045925556682782.svg?logo=discord&colorB=00d37d"
                height="20"
                alt="Discord community"
              />
            </a>
            <a href="https://matrix.to/#/#TheAlgorithms_community:gitter.im">
              <img
                src="https://img.shields.io/gitter/room/TheAlgorithms/community.svg?style=flat-square"
                height="20"
                alt="Gitter chat"
              />
            </a>
          </div>

          {/* Short description */}
          <h3 class="text-xl font-semibold mb-4">
            All algorithms implemented in Rust - for education
          </h3>
        </div>
      </section>
    </Layout>
  );
};
