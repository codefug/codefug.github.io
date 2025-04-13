(function () {
  if (typeof window !== "undefined") {
    const { redirect } = sessionStorage;
    delete sessionStorage.redirect;
    if (redirect && redirect !== window.location.pathname)
      window.history.replaceState(null, null, redirect);
  }
})();
