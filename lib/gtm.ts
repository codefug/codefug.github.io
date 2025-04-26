export const gtmPageView = (props: { page_title: string }) => {
  return window.dataLayer?.push({
    event: "page_view",
    url: window.location.href,
    ...props,
  });
};
