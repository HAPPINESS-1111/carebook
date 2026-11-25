import React from 'react'
import AuthLayout from './layouts/AuthLayout'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useState } from 'react';

const START = {
  firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', password: '',
  role: 'patient', specialty: '', mdcnNumber: '',
};

// A simple guide to password strength: length, and a mix of letters, numbers and symbols.
function PasswordStrength({ password }) {
  const checks = [password.length >= 8, /[a-z]/i.test(password) && /\d/.test(password), /[^a-z0-9]/i.test(password), password.length >= 12];
  const score = password ? checks.filter(Boolean).length : 0;
  const words = ['Use at least 8 characters', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <span className="strength" aria-live="polite">
      <span className="strength-bars" aria-hidden="true">{[1, 2, 3, 4].map((n) => <i key={n} className={n <= score ? `on s${score}` : ''} />)}</span>
      <span className="small muted">{words[score]}{score > 0 && score < 4 ? ' · add numbers, symbols or more length' : ''}</span>
    </span>
  );
}

function Register() {

    const { register } = useAuth();
  const navigate = useNavigate();
  // The "For doctors" link opens this page with ?role=doctor already chosen.
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState({ ...START, role: searchParams.get('role') === 'doctor' ? 'doctor' : 'patient' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const isDoctor = values.role === 'doctor';
  const today = new Date().toLocaleDateString('en-CA');

  async function handleSubmit(event) {
    event.preventDefault();
    if (values.password.length < 8) return setError('Password must be at least 8 characters.');
    if (!/^\+?[0-9 ]{7,20}$/.test(values.phone)) return setError('Enter a valid phone number, e.g. +234 803 555 0142.');
    setSaving(true);
    setError('');
    // Only send the fields that apply to this role.
    const { specialty, mdcnNumber, dateOfBirth, ...common } = values;
    const body = isDoctor ? { ...common, specialty, mdcnNumber } : { ...common, dateOfBirth };
    try {
      await register(body);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <AuthLayout 
    title={"See the right doctor without the waiting room."} 
    text={"Book a real open slot, pay securely with Paystack and keep your visit notes in one place."}>
      <form action="">
        <h1>Create your account</h1>
        <p className='muted'>Choose how you'll use Carebook</p>
        <fieldset className='role-cards'>
          <legend className='sr-only'>Iam a</legend>
          <lable className="on">
            <input type="radio" name="role" value={"patient"} />
            <strong>I'm a patient</strong>
            <span>Book and pay for appointments</span>
          </lable>
          <lable className="on">
            <input type="radio" name="role" value={"doctor"} />
            <strong>I'm a doctor</strong>
            <span>Needs admin approval</span>
          </lable>
        </fieldset>
        <div className="two-col">
          <label className="field">
            First name
            <input type="text" name="firstname" required value={""} />
          </label>
          <label className="field">
            Last name
            <input type="text" name="lastname" required value={""} />
          </label>
          </div>
          <label className="field">
            Email
            <input type="email" name="email" required value={""} />
          </label>
          <label className="field">
            Phone number
            <input type="tel" name="phone" required value={""} placeholder='08139720768' />
          </label>
          <label className="field">
            Date of Birth
            <input type="date" name="dateOfBirth" required value={""}  max={""} />
          </label>
          <label className="field">
            Specialty
            <input type="text" name="specialty" required value={""} />
          </label>
          <label className="field">
            MDCN License Number
            <input type="text" name="mdcnNumber" required value={""} placeholder='MDCN/R/12345' />
            <span className="small-muted">An admin checks this befor your profile goes live</span>
          </label>
          <label className="field">
            Password
            <input type="password" name="password" required value={""} minLenght={8} />
          </label>
          <button className="btn btn-block">Create account</button>
          <p className="small center">Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </AuthLayout>
  )
}

export default Register