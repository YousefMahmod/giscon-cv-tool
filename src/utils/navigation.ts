import { type NavigateFunction } from "react-router-dom";

let navigateFunction: NavigateFunction | null = null;

export const setNavigate = (navigate: NavigateFunction) => {
  navigateFunction = navigate;
};

export const navigateTo = (
  route: string | number,
  options?: NavigateToOptions,
) => {
  if (navigateFunction) {
    if (typeof route === "number") {
      navigateFunction(route);
    } else {
      navigateFunction(route, options);
    }
  } else {
    console.error("Navigate function not set yet");
  }
};

export const getSearchParams = (
  searchParams: URLSearchParams,
): Record<string, string> => {
  return Object.fromEntries(searchParams.entries());
};

type NavigateToOptions = {
  replace?: boolean;
  state?: any;
};
