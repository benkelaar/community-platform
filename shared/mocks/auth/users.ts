import { UserRole } from '../../models'

export interface IMockAuthUser {
  uid: string
  label: string
  email?: string
  password?: string
  roles: UserRole[]
}

type IMockUsers = { [key in UserRole]: IMockAuthUser }
/** A list of specific demo/mock users that are prepopulated onto testing sites for use in development */

export const MOCK_AUTH_USERS: IMockUsers = {
  subscriber: {
    uid: 'demo_user',
    label: 'User',
    email: 'demo_user@example.com',
    password: 'demo_user',
    roles: [],
  },
  'beta-tester': {
    uid: 'demo_beta_tester',
    label: 'Beta-Tester',
    email: 'demo_beta_tester@example.com',
    password: 'demo_beta_tester',
    roles: [UserRole.BETA_TESTER],
  },
  admin: {
    uid: 'demo_admin',
    label: 'Admin',
    email: 'demo_admin@example.com',
    password: 'demo_admin',
    roles: [UserRole.ADMIN],
  },
  research_creator: {
    uid: 'research_creator',
    label: 'Research-Creator',
    email: 'research_creator@test.com',
    password: 'research_creator',
    roles: [UserRole.RESEARCH_CREATOR],
  },
}
