import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Doctor from '../models/doctorModel.js';
// import { ApiError } from '../utils/ApiError.js';
// import { sendEmail } from '../utils/sendEmail.js';

const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// A JSON body can hold objects like { "$gt": "" }. Accept real strings only.
function requireString(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new ApiError(400, `${label} is required`);
  return value.trim();
}

// A real calendar date in the past, for someone aged 0 to 120.
function parseDateOfBirth(value) {
  const text = requireString(value, 'Date of birth');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new ApiError(400, 'Date of birth must be YYYY-MM-DD');
  const date = new Date(`${text}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || !date.toISOString().startsWith(text)) {
    throw new ApiError(400, 'Date of birth is not a real date');
  }
  const oldest = new Date();
  oldest.setUTCFullYear(oldest.getUTCFullYear() - 120);
  if (date > new Date() || date < oldest) throw new ApiError(400, 'Check the date of birth');
  return date;
}

// POST /api/auth/register
export async function register(req, res) {
  const firstName = requireString(req.body.firstName, 'First name');
  const lastName = requireString(req.body.lastName, 'Last name');
  const email = requireString(req.body.email, 'Email').toLowerCase();
  const password = requireString(req.body.password, 'Password');
  const phone = requireString(req.body.phone, 'Phone number');
  // Nobody can register as an admin, whatever the request says.
  const role = req.body.role === 'doctor' ? 'doctor' : 'patient';
  // Patients give a date of birth. For doctors it's optional.
  const dateOfBirth =
    role === 'patient' || req.body.dateOfBirth ? parseDateOfBirth(req.body.dateOfBirth) : undefined;

  let specialty;
  let mdcnNumber;
  if (role === 'doctor') {
    specialty = requireString(req.body.specialty, 'Specialty');
    mdcnNumber = requireString(req.body.mdcnNumber, 'MDCN licence number').toUpperCase();
    if (!/^[A-Z0-9/-]{4,30}$/.test(mdcnNumber)) {
      throw new ApiError(400, 'MDCN licence number can only use letters, numbers, / and -');
    }
  }

  const user = await User.create({ firstName, lastName, email, password, phone, dateOfBirth, role });
  if (role === 'doctor') {
    // New doctors stay hidden until an admin checks their licence and approves them.
    await Doctor.create({ user: user._id, name: user.name, specialty, mdcnNumber, approved: false });
  }
  res.status(201).json({ token: signToken(user), user: user.toSafeObject() });
}

// POST /api/auth/login
export async function login(req, res) {
  const email = requireString(req.body.email, 'Email').toLowerCase();
  const password = requireString(req.body.password, 'Password');
  const user = await User.findOne({ email }).select('+password');
  // The same message either way, so nobody can test which emails have accounts.
  if (!user || !user.active || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }
  res.json({ token: signToken(user), user: user.toSafeObject() });
}

// GET /api/auth/me
export function getMe(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

// POST /api/auth/forgot-password
export async function forgotPassword(req, res) {
  const email = requireString(req.body.email, 'Email').toLowerCase();
  const user = await User.findOne({ email });
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    user.resetTokenHash = hashToken(token); // only the hash is stored
    user.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();
    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Reset your CareBook password',
    //   text: `Use this link within 30 minutes to reset your password:\n${link}`,
    // });
  }
  res.json({ message: 'If that email has an account, a reset link is on its way' });
}

// POST /api/auth/reset-password/:token
export async function resetPassword(req, res) {
  const password = requireString(req.body.password, 'Password');
  const user = await User.findOne({
    resetTokenHash: hashToken(req.params.token),
    resetTokenExpires: { $gt: new Date() },
  });
  if (!user) throw new ApiError(400, 'This reset link is invalid or has expired');
  user.password = password;
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  await user.save();
  res.json({ message: 'Password updated. You can now log in' });
}