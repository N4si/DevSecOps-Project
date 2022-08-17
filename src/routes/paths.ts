function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const AUTH_ROOT = "";
const MAIN_ROOT = "";

export const AUTH_PATH = {
  login: path(AUTH_ROOT, "/login"),
  register: path(AUTH_ROOT, "/signup"),
  loginHelp: path(AUTH_ROOT, "/loginhelp"),
};

export const PATH_PAGE = {
  page404: "/404",
  page500: "/500",
};

export const MAIN_PATH = {
  root: MAIN_ROOT,
  browse: path(MAIN_ROOT, "/browse"),
  genreExplore: path(MAIN_ROOT, "/genre"),
  movies: path(MAIN_ROOT, "/browse/movies"),
  tvshows: path(MAIN_ROOT, "/browse/tv-shows"),
  mylist: path(MAIN_ROOT, "/browse/my-list"),
  watch: path(MAIN_ROOT, "/watch"),
  search: path(MAIN_ROOT, "/search"),
  account: path(MAIN_ROOT, "/account"),
  manageProfiles: path(MAIN_ROOT, "/profiles/manage"),
};
