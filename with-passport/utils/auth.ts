import passport from "passport";
import jwt from "jsonwebtoken";
import nc from "next-connect";
import Cookies from "cookies";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";

passport.use(
  new LocalStrategy(function verify(username, password, done) {
    // TODO: Verify username and password
    if (username !== "user" || password !== "password") {
      return done(null, null);
    }
    done(null, { id: 1, username: "user", password: "password" });
  })
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: "secret",
      jwtFromRequest: (req) => {
        const cookies = new Cookies(req, null);
        const sessionCookie = cookies.get("session");
        const bearerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return sessionCookie || bearerToken || null;
      },
    },
    function verify(jwtPayload, done) {
      // TODO: Load user from DB (include user roles if needed)
      done(null, jwtPayload);
    }
  )
);

export function initializeAuth() {
  return passport.initialize();
}

export function authenticate(type: "local" | "jwt", options?: passport.AuthenticateOptions) {
  return passport.authenticate(type, { session: false, ...options });
}

export function generateToken(user: any, expiresIn: number = 15) {
  const token = jwt.sign(user, "secret", { expiresIn });
  return token;
}

export function setSessionCookie(req: NextApiRequest, res: NextApiResponse, token: string) {
  const cookies = new Cookies(req, res);
  cookies.set("session", token);
}

export async function getServerSideSession(ctx: GetServerSidePropsContext) {
  const handler = nc()
    .use(initializeAuth())
    .all(authenticate("jwt", { failWithError: true }));

  try {
    await handler.run(ctx.req, ctx.res);
    const { user } = ctx.req as any;
    return user;
  } catch (e) {
    return null;
  }
}
