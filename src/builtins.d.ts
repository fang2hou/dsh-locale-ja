/**
 * Ambient declarations for the DeepSeek Harness dynamic Client-half builtins.
 *
 * A dynamic Client plugin's code is evaluated as a function body whose closure
 * provides a small set of injected symbols (`styles`, `React`, `host`,
 * `console`, ...). These are not importable modules, so they are declared here
 * for type-checking only and emit no runtime code.
 *
 * Only the symbols this plugin actually uses are declared.
 * See: https://github.com/deepseek-ai/deepseek-harness (dynamic Cordis plugins)
 */

/** Package-owned stylesheet insertion, cleaned up with the Client run. */
declare const styles: {
  /** Insert CSS; returns a disposer that removes the inserted stylesheet. */
  insert(css: string): () => void;
};
