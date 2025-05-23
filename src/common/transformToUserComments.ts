import { UserRole } from 'oa-shared'
import { type IComment, type IUserDB } from 'oa-shared'

export const transformToUserComments = (
  comments: IComment[],
  loggedInUser: IUserDB | null | undefined,
): IComment[] => {
  return (
    comments?.map((c) => ({
      ...c,
      isEditable:
        c._creatorId === loggedInUser?._id ||
        loggedInUser?.userRoles?.includes(UserRole.ADMIN),
    })) || []
  )
}
