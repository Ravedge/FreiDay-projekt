let action = 'Anmelden';

function setAction(newAction) {
  action = newAction;
  const formTitle = document.getElementById('formTitle');
  const inputs = document.getElementById('inputs');
  const forgotPassword = document.getElementById('forgotPassword');

  if (action === 'Anmelden') {
    formTitle.textContent = 'Anmelden';
    inputs.querySelector('#usernameInput').classList.add('hidden');
    forgotPassword.style.display = 'none';
  } else if (action === 'Einloggen') {
    formTitle.textContent = 'Einloggen';
    inputs.querySelector('#usernameInput').classList.remove('hidden');
    forgotPassword.style.display = 'block';
  }
}
