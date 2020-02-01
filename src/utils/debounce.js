const debounce = (func, delay) => {
  let debounceTimer;
  // eslint-disable-next-line func-names
  return function (...arg) {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...arg), delay);
  };
};

export default debounce;
