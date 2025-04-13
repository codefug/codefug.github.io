(function () {
  const { redirect } = sessionStorage;
  delete sessionStorage.redirect;
  if (redirect && redirect !== window.location.href)
    window.history.replaceState(null, null, redirect);
})();
