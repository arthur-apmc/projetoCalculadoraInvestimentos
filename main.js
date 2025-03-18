import { generateReturnsArray } from './src/investmentGoals';

const form = document.getElementById('investment-form');
const calculateButton = document.getElementById('calculate-results');
const clearFormButton = document.getElementById('clear-form');

function renderProgression(evt) {
  evt.preventDefault();
  // const startingAmount = Number(form['startingAmount'].value);
  const startingAmount = Number(
    document.getElementById('starting-amount').value.replace(',', '.')
  );
  const additionalContribution = Number(
    document.getElementById('additional-contribution').value.replace(',', '.')
  );
  const timeAmount = Number(document.getElementById('time-amount').value);
  const timeAmountPeriod = document.getElementById('time-amount-period').value;
  const returnRate = Number(
    document.getElementById('return-rate').value.replace(',', '.')
  );
  const returnRatePeriod = document.getElementById('evaluation-period').value;
  const taxRate = Number(
    document.getElementById('tax-rate').value.replace(',', '.')
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}

function clearForm() {
  form['starting-amount'].value = '';
  form['additional-contribution'].value = '';
  form['time-amount'].value = '';
  form['return-rate'].value = '';
  form['tax-rate'].value = '';

  const errorInputsContainers = document.querySelectorAll('.error');
  for (const errorInputsContainers of errorInputsContainers) {
    errorInputsContainers.classList.remove('error');
    errorInputsContainers.parentElement.querySelector('p').remove();
  }
}

function validateInput(evt) {
  if (evt.target.value === '') {
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(',', '.');

  // Remover mensagem de erro existente
  const existingErrorTextElement =
    grandParentElement.querySelector('.text-red-500');
  if (existingErrorTextElement) {
    grandParentElement.removeChild(existingErrorTextElement);
  }

  if (isNaN(inputValue) || Number(inputValue) <= 0) {
    // <p class="text-red-500">Insira um valor numérico e maior que zero!</p>
    const errorTextElement = document.createElement('p');
    errorTextElement.classList.add('text-red-500');
    errorTextElement.innerText = 'Insira um valor numérico e maior que zero!';

    parentElement.classList.add('error');
    grandParentElement.appendChild(errorTextElement);
  } else {
    // Remover a classe de erro se o valor for válido
    parentElement.classList.remove('error');
  }
}

// Remover a classe de erro de todos os inputs ao carregar a página
window.addEventListener('load', () => {
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.parentElement.classList.remove('error');
  });
});

for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}

// form.addEventListener('submit', renderProgression);
calculateButton.addEventListener('click', renderProgression);

clearFormButton.addEventListener('click', clearForm);
