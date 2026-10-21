const BLOCK_LIBRARY =
  "https://zdraveibolest.admin-panels.com/wp-includes/css/dist/block-library/style.min.css";

/** Gutenberg block CSS. Only on pages that render WordPress HTML. */
export default function WpBlockStyles() {
  return <link rel="stylesheet" href={BLOCK_LIBRARY} />;
}
