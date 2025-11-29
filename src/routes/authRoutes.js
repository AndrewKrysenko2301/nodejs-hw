import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';
import { requestResetEmail } from '../controllers/authController.js';
import { requestResetEmailSchema } from '../validations/authValidation.js';
import validateRequest from '../middlewares/validateRequest.js';
import { resetPassword } from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);

router.post('/auth/login', celebrate(loginUserSchema), loginUser);

router.post('/auth/refresh', refreshUserSession);

router.post('/auth/logout', logoutUser);

router.post(
  '/auth/request-reset-email',
  validateRequest(requestResetEmailSchema),
  requestResetEmail
);

router.post(
  '/reset-password',
  resetPassword
);

export default router;
