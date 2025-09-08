import { getServerSession } from 'next-auth';
import options from '@/lib/auth';

const auth = async () => {
    return await getServerSession(options)
}


const getUser = async () => {
    const session = await auth()
    return session?.user
}

const getAccountId = async () => {
    const user = await getUser()
    return user?.accountId
}

const getRoleName = async () => {
    const user = await getUser()
    return user?.roleName
}

const getEmail = async () => {
    const user = await getUser()
    return user?.email
}

export { auth, getUser, getAccountId, getRoleName, getEmail }