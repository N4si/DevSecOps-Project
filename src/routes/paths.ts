function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const MAIN_ROOT = "";

export const MAIN_PATH = {
  root: MAIN_ROOT,
  browse: path(MAIN_ROOT, "/browse"),
  genreExplore: path(MAIN_ROOT, "/genre"),
};
