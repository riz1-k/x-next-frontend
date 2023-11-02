import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { env } from './lib/configs';
import { authUserSchema } from './lib/store/slices/useAuth/user-types';

const responseSchema = z.object({
  refreshToken: z.string(),
  user: authUserSchema,
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const nextReponse = NextResponse.next();
  const oldToken = cookies().get('x-session-token')?.value;

  if (pathname === '/' && oldToken) {
    console.log('2');
    const homeUrl = new URL('/home', request.url);
    NextResponse.redirect(homeUrl.href);
    return nextReponse;
  }
  console.log('3');

  try {
    if (!oldToken) {
      throw new Error('No token found');
    }
    const response = await fetch(env.BACKEND_URL + '/user/auth/refresh-token', {
      headers: {
        Authorization: 'Bearer ' + oldToken,
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Invalid token');
    }
    const data = await response.json();
    console.log('data', data);
    const { refreshToken, user } = responseSchema.parse(data.data);

    nextReponse.cookies.set('x-session-token', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
    });

    nextReponse.headers.set('x-user', JSON.stringify(user));

    return nextReponse;
  } catch (err) {
    nextReponse.headers.set('x-user', JSON.stringify(null));
    nextReponse.cookies.delete('x-session-token');
  } finally {
    NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
