// assets/js/contactForm.js
export function initContactForm() {
  const form = document.getElementById('responsiveContactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API endpoint)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    const formContainer = form.parentElement;
    const successMsg = document.createElement('div');
    successMsg.className = 'mt-4 p-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm text-center';
    successMsg.innerHTML = '<i class="fas fa-check-circle mr-1"></i> Thank you! We\'ll contact you shortly.';
    form.reset();
    form.style.display = 'none';
    formContainer.appendChild(successMsg);
    
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Reset after 5 seconds
    setTimeout(() => {
      form.style.display = 'block';
      successMsg.remove();
    }, 5000);
  });
}