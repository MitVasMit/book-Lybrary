document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const spinner = document.getElementById('spinner');
    const submitBtn = document.getElementById('submitBtn');

    if (form && spinner && submitBtn) {
        form.addEventListener('submit', function () {
            spinner.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
            submitBtn.textContent = 'Sending...';
        });
    }
});
