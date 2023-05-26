import jwt from 'jsonwebtoken';

export const generateToken = (member) => {
  return jwt.sign(
    {
      mongoID: member._id,
      profileImage: member.profileImage,
      name: member.name,
      staffId: member.staffId,
      username: member.username,
      position: member.position,
      password: member.password,
      phone: member.phone,
      email: member.email,
      team: member.team,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '5d',
    }
  );
};
