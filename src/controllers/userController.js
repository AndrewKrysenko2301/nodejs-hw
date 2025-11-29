import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(createHttpError(400, 'No file'));
  }

  try {
    const userId = req.user?._id;

    if (!userId) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    const uploadResult = await saveFileToCloudinary(req.file.buffer);

    if (!uploadResult.secure_url) {
      return next(createHttpError(500, 'Failed to upload avatar'));
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadResult.secure_url },
      { new: true }
    );

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).json({ url: user.avatar });
  } catch (error) {
    next(error);
  }
};
