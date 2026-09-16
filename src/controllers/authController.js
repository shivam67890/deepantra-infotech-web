function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    profilePicture: user.profilePicture || '',
    role: user.role,
    grade: user.grade,
    school: user.school,
    points: user.points,
  }
}