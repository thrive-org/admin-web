import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import authService from '@/features/auth/auth.service';
import { type RoleType } from '@/constants/role';
import authHandler from '@/features/auth/auth.handler';

console.log("NEXTAUTH_URL =>", process.env.NEXTAUTH_URL);
console.log("NEXTAUTH_SECRET =>", process.env.NEXTAUTH_SECRET);


declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image?: string | null;
            roleName: RoleType;
            accountId: string;
        } | null;
    }

    interface User {
        id: string;
        email: string;
        name: string;
        image?: string | null;
        roleName: RoleType;
        accountId: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        name: string;
        image?: string | null;
        roleName: RoleType;
        accountId: string;
    }
}

const credentials = CredentialsProvider({
    name: 'credentials',
    credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
    },
    authorize: async (creds) => {
        if (!creds?.email || !creds?.password) return null;
        const u = await authHandler.login({ email: creds.email, password: creds.password });
        if (!u) {
            throw new Error('Invalid credentials');
        };
        const { id, email, name, image, roleName, accountId } = u;
        return { id, email, name, image, roleName, accountId };
    },
});

const google = GoogleProvider({
    clientId: process.env.OAUTH_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
});

const callbacks: NonNullable<NextAuthOptions['callbacks']> = {
    async signIn({ account, user }) {
        if (account?.provider === 'google') {
            const u = await authService.resolveGoogleUser(user.email || '');
            return !!u;
        }
        return true;
    },

    async jwt({ token, user }) {
        if (user) {
            const u = user;
            token.id = u.id;
            token.email = u.email!;
            token.name = u.name;
            token.image = u.image;
            token.roleName = u.roleName;
            token.accountId = u.accountId;
        }
        return token;
    },

    async session({ session, token }) {
        const s: Session['user'] = {
            id: token.id,
            email: token.email,
            name: token.name,
            image: token.image,
            roleName: token.roleName,
            accountId: token.accountId,
        };
        session.user = s;
        return session;
    },
};

const authOptions: NextAuthOptions = {
    session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
    pages: { signIn: '/login', error: '/api/auth/error' },
    providers: [credentials, google],
    callbacks,
    secret: process.env.NEXTAUTH_SECRET,
};

// class NextAuthLibrary {
//     static nextAuth = NextAuth(authOptions);
//     static getNextAuthHandler() {
//         return { GET: NextAuthLibrary.nextAuth, POST: NextAuthLibrary.nextAuth };
//     }
//     static getNextAuthOptions() {
//         return authOptions;
//     }
//     static getServerSession() {
//         return getServerSession(authOptions);
//     }
// }
// export default NextAuthLibrary;

export default authOptions;