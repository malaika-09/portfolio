console.log('Testing theme toggle...');
const button = document.querySelector('[aria-label="Toggle theme"]');
if (button) {
  console.log('Theme button found');
  console.log('Current theme:', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  console.log('HTML classes:', document.documentElement.className);
} else {
  console.log('Theme button NOT found');
}
