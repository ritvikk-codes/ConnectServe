const User = require('../models/User');
const { generateTokens, REFRESH_SECRET } = require('../middleware/authMiddleware');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const jwt = require('jsonwebtoken');

// @desc    Register a new user or organization
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, username, orgDetails, bio, location, skills } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return sendError(res, 'An account with this email already exists.', 400);
    }

    const generatedUsername = username || email.split('@')[0] + Math.floor(100 + Math.random() * 900);

    const user = await User.create({
      name,
      username: generatedUsername,
      email: email.toLowerCase(),
      password,
      role: role || 'user',
      bio: bio || '',
      location: location || '',
      skills: skills || [],
      orgDetails: role === 'organization' ? {
        mission: orgDetails?.mission || '',
        registrationNumber: orgDetails?.registrationNumber || '',
        isVerified: false,
        category: orgDetails?.category || 'General Community',
      } : undefined,
    });

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    const userObj = user.toObject();
    delete userObj.password;

    return sendSuccess(
      res,
      'Registration successful. Welcome to ConnectServe!',
      { user: userObj, accessToken, refreshToken },
      null,
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & get tokens
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Please provide both email and password.', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    if (user.isBanned) {
      return sendError(res, 'Your account has been suspended. Please contact support.', 403);
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    const userObj = user.toObject();
    delete userObj.password;

    return sendSuccess(res, 'Logged in successfully.', {
      user: userObj,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return sendError(res, 'User not found.', 404);
    }
    return sendSuccess(res, 'Current user profile fetched.', { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return sendError(res, 'Refresh token required.', 400);
    }

    let decoded;
    try {
      decoded = jwt.verify(token, REFRESH_SECRET);
    } catch (err) {
      return sendError(res, 'Invalid or expired refresh token. Please login again.', 401);
    }

    const user = await User.findById(decoded.id);
    if (!user || user.isBanned || !user.isActive) {
      return sendError(res, 'User not authorized or inactive.', 403);
    }

    const tokens = generateTokens(user._id, user.role);

    return sendSuccess(res, 'Token refreshed successfully.', {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return sendError(res, 'Current password does not match.', 400);
    }

    user.password = newPassword;
    await user.save();

    return sendSuccess(res, 'Password updated successfully.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  refreshToken,
  updatePassword,
};
