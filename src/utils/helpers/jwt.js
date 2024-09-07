import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode("this is the secret key");

export const encryptJWT = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
};

export const decryptJWT = async (session) => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    return null;
  }
};
