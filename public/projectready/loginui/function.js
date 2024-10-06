const $maildomain = document.querySelector('#maildomain');
const $domain = document.querySelector('#domain');

$domain.addEventListener('change', () => {
    const selectedOption = $domain.options[$domain.selectedIndex];

    $maildomain.value = selectedOption.textContent;
});