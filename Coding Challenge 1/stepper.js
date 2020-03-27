let step = 0;
const maxStep = 3;

// array of form id's
// let form = ['user-form', 'email-form', 'password-form', 'validate'];
let form = [
  {
    formId: 'user-form',
    inputId: 'username',
    data: ''
  },
  {
    formId: 'email-form',
    inputId: 'email',
    data: ''
  },
  {
    formId: 'password-form',
    inputId: 'password',
    data: ''
  },
  {
    formId: 'validation',
    inputId: '',
    data: 'Your data was as follows:'
  }
];

const prevBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

prevBtn.addEventListener('click', () => {
  changeStep(step - 1);
});

nextBtn.addEventListener('click', () => {
  changeStep(step + 1);
});

submitBtn.addEventListener('click', () => {
  document.getElementById('user-form').style.display = 'none';
  document.getElementById('email-form').style.display = 'none';
  document.getElementById('password-form').style.display = 'none';
  document.getElementById('step3').classList.remove('active');

  step = maxStep;

  form[step].data = `Your data was:

                     Username: ${form[0].data}
                     Email:    ${form[1].data}
 Password: ${form[2].data}`;

  document.getElementById('message').innerText = form[step].data;

  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';
  submitBtn.style.display = 'none';

  document.getElementById('validation').style.display = 'block';
});

let changeStep = newStep => {
  // check if valid step
  if (newStep < 0 || newStep > maxStep) {
    return;
  }

  // *** step still = previous step at this point ***

  if (step < maxStep) {
    // no input field for Validate
    // save input field to form[step].data
    form[step].data = document.getElementById(form[step].inputId).value;
  }

  // remove active class from "old" progress step
  document.getElementById(`step${step}`).classList.remove('active');

  // hide "old" form
  document.getElementById(form[step].formId).style.display = 'none';

  // *** NOW work on NEW step...  ***
  step = newStep;

  // show new stepper-progress item
  document.getElementById(`step${step}`).classList.add('active');

  // show new form
  document.getElementById(form[step].formId).style.display = 'block';
  if (step < maxStep) {
    // NOT if on validate!
    document.getElementById(form[step].inputId).focus();
  }

  // Determine buttons to show...
  if (step === 0) {
    nextBtn.style.display = 'inline-block';
    prevBtn.style.display = 'none';
    submitBtn.style.display = 'none';
  } else if (step === 1 || step === 2) {
    prevBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  } else {
    // on validation (step = 3)
    prevBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  }
};
