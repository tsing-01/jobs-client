export const justifyJupmer = (user) => {
  const isFirstInfo = !user.header && !user.info && !user.company && !user.salary && !user.position;
  const later = isFirstInfo ? 'info' : '';
  const path = user.type === 'employer' ? '/employer' : '/applicant';
  return path + later;
}