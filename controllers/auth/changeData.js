const { User } = require("../../models");
const { cloudinaryImgUpload } = require("../../helpers");

const changeData = async (req, res) => {
  // const { avatarURL, idCloudAvatar } = await cloudinaryImgUpload(req);
  let userAvatarURL = null;
  let userIdCloudAvatar = null;

  if (req.file) {
    const { avatarURL, idCloudAvatar } = await cloudinaryImgUpload(req);
    userAvatarURL = avatarURL;
    userIdCloudAvatar = idCloudAvatar;
  }

  const { email, name, city, phone, birthday } = req.body;
  const { _id } = req.user;
  let result;
  if (email) {
    result = await User.findByIdAndUpdate(_id, { email }, { new: true });
  }
  if (name) {
    result = await User.findByIdAndUpdate(_id, { name }, { new: true });
  }
  if (city) {
    result = await User.findByIdAndUpdate(_id, { city }, { new: true });
  }
  if (phone) {
    result = await User.findByIdAndUpdate(_id, { phone }, { new: true });
  }
  if (birthday) {
    result = await User.findByIdAndUpdate(_id, { birthday }, { new: true });
  }
  if (avatarURL) {
    const user = await User.findOne(id);
    await cloudinary.uploader.destroy(user.idCloudAvatar, {
      folder: "images",
    });

    result = await User.findByIdAndUpdate(
      _id,
      { avatarURL: userAvatarURL, idCloudAvatar: userIdCloudAvatar },
      { new: true }
    );
  }

  res.status(200).json({
    user: {
      name,
      email,
      city,
      phone,
      birthday,
      avatarURL: userAvatarURL,
    },
  });
};

module.exports = changeData;
