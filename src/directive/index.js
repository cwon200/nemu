export default function numberWithCommas(el, binding) {
  const x = binding.value;
  if (!x) {
    el.innerHtml = 0;
  } else {
    const t = x.toString().split('.');
    el.innerHTML =
      t[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
      (t[1] ? '.' + t[1] : '');
  }
}
