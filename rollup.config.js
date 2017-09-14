import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";
import postcss from "rollup-plugin-postcss";

const env = process.env.NODE_ENV;

const config = {
  input: "src/index.js",
  output: {
    format: "umd"
  },
  sourcemap: true,
  external: ["react", "react-dom"],
  globals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  name: "ReactSelectGraphql",
  moduleContext: {
    [require.resolve("whatwg-fetch")]: "window"
  },
  plugins: [
    postcss(),
    nodeResolve(),
    babel({
      exclude: "**/node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    commonjs()
  ]
};

if (env === "production") {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
