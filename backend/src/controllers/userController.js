export const getUser = (req, res, next) => {
  try {
    // console.log(req.user);
    const userData = req.user;
    res.status(200).json({
      message: "User data fetch successfull",
      userData,
    });
  } catch (error) {}
};
