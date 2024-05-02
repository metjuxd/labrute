import { ExpectedError } from '@labrute/core';
import { PrismaClient } from '@labrute/prisma';
import type { Request } from 'express';

const auth = async (prisma: PrismaClient, request: Request) => {
  const { headers: { authorization } } = request;

  if (!authorization) {
    throw new ExpectedError('You are not logged in');
  }
  if (typeof authorization !== 'string') {
    throw new ExpectedError('Invalid authorization header');
  }

  const [id, token] = Buffer.from(authorization.split(' ')[1], 'base64')
    .toString().split(':');

  if (!id || !token || id === 'null' || token === 'null') {
    throw new ExpectedError('Invalid authorization header content');
  }

  const user = await prisma.user.findFirst({
    where: {
      id,
      connexionToken: token,
    },
    select: {
      id: true,
      lang: true,
    },
  });

  if (!user) {
    throw new ExpectedError('User not found');
  }

  return user;
};

export default auth;
