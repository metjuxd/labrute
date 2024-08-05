import {
  ClanWarCreateResponse, ClanWarGetAvailableFightersResponse, ClanWarGetHistoryResponse,
  ClanWarGetResponse, ClanWarMaxParticipants, ClanWarUpdateFightersResponse, ExpectedError,
} from '@labrute/core';
import { ClanWarStatus, PrismaClient } from '@labrute/prisma';
import type { Request, Response } from 'express';
import auth from '../utils/auth.js';
import sendError from '../utils/sendError.js';
import translate from '../utils/translate.js';
import isUuid from '../utils/uuid.js';

const ClanWars = {
  create: (prisma: PrismaClient) => async (
    req: Request<never, unknown, { brute: string; clan: string; opponent: string }>,
    res: Response<ClanWarCreateResponse>,
  ) => {
    try {
      const user = await auth(prisma, req);

      if (!req.body.brute || !req.body.clan || !req.body.opponent) {
        throw new ExpectedError(translate('missingParameters', user));
      }

      // Check clan and opponent equality
      if (req.body.clan === req.body.opponent) {
        throw new ExpectedError(translate('cantFightOwnClan', user));
      }

      // Check if user owns the brute
      const brute = await prisma.brute.findFirst({
        where: { id: req.body.brute, deletedAt: null, userId: user.id },
        select: { id: true },
      });

      if (!brute) {
        throw new ExpectedError(translate('bruteNotFound', user));
      }

      // Check if brute is the clan master
      const clan = await prisma.clan.findFirst({
        where: {
          deletedAt: null,
          id: req.body.clan,
          masterId: req.body.brute,
        },
        select: { id: true },
      });

      if (!clan) {
        throw new ExpectedError(translate('unauthorized', user));
      }

      // Check if the clan is already in a war
      const war = await prisma.clanWar.findFirst({
        where: {
          OR: [
            { attackerId: req.body.clan },
            { defenderId: req.body.clan },
          ],
          status: { not: ClanWarStatus.finished },
        },
        select: { id: true },
      });

      if (war) {
        throw new ExpectedError(translate('warOngoing', user));
      }

      // Check if the opponent clan exists
      const opponent = await prisma.clan.findFirst({
        where: { id: req.body.opponent, deletedAt: null },
        select: { id: true },
      });

      if (!opponent) {
        throw new ExpectedError(translate('clanNotFound', user));
      }

      // Check if the opponent clan is already in a war
      const opponentWar = await prisma.clanWar.findFirst({
        where: {
          OR: [
            { attackerId: req.body.opponent },
            { defenderId: req.body.opponent },
          ],
          status: { not: ClanWarStatus.finished },
        },
        select: { id: true },
      });

      if (opponentWar) {
        throw new ExpectedError(translate('opponentWarOngoing', user));
      }

      // Create the war
      const newWar = await prisma.clanWar.create({
        data: {
          attackerId: req.body.clan,
          defenderId: req.body.opponent,
        },
        select: { id: true },
      });

      res.status(200).send(newWar);
    } catch (error) {
      sendError(res, error);
    }
  },
  updateFighters: (prisma: PrismaClient) => async (
    req: Request<{ clan: string; war: string; }, unknown, { day: number; fighters: string[] }>,
    res: Response<ClanWarUpdateFightersResponse>,
  ) => {
    try {
      const user = await auth(prisma, req);

      if (!req.params.clan
        || !req.params.war
        || !Array.isArray(req.body.fighters)
        || req.body.fighters.some((fighter) => !isUuid(fighter))
        || !req.body.day) {
        throw new ExpectedError(translate('missingParameters', user));
      }

      // Check if one of the user's brutes is the clan master
      const userBrutes = await prisma.brute.findMany({
        where: { userId: user.id, deletedAt: null },
        select: { id: true, masterOfClan: { select: { id: true } } },
      });

      if (!userBrutes.some((brute) => brute.masterOfClan?.id === req.params.clan)) {
        throw new ExpectedError(translate('unauthorized', user));
      }

      const war = await prisma.clanWar.findFirst({
        where: {
          id: req.params.war,
          status: ClanWarStatus.ongoing,
          OR: [
            { attackerId: req.params.clan },
            { defenderId: req.params.clan },
          ],
        },
        select: {
          id: true,
          duration: true,
          attackerId: true,
          defenderId: true,
        },
      });

      if (!war) {
        throw new ExpectedError(translate('warNotFound', user));
      }

      // Check if the day is valid
      if (req.body.day < 1 || req.body.day > war.duration) {
        throw new ExpectedError(translate('invalidParameters', user));
      }

      // Get the fighters
      const brutes = await prisma.brute.findMany({
        where: {
          id: { in: req.body.fighters },
          clanId: req.params.clan,
          deletedAt: null,
        },
        select: { id: true },
      });

      // Update the clan war fighters
      await prisma.clanWarFighters.upsert({
        where: {
          clanWarId_day: { clanWarId: war.id, day: req.body.day },
        },
        create: {
          clanWar: { connect: { id: war.id } },
          day: req.body.day,
          attackers: war.attackerId === req.params.clan
            ? { connect: brutes.map((brute) => ({ id: brute.id })) }
            : undefined,
          defenders: war.defenderId === req.params.clan
            ? { connect: brutes.map((brute) => ({ id: brute.id })) }
            : undefined,
        },
        update: {
          attackers: war.attackerId === req.params.clan
            ? { set: brutes.map((brute) => ({ id: brute.id })) }
            : undefined,
          defenders: war.defenderId === req.params.clan
            ? { set: brutes.map((brute) => ({ id: brute.id })) }
            : undefined,
        },
        select: { id: true },
      });

      res.status(200).send(brutes);
    } catch (error) {
      sendError(res, error);
    }
  },
  get: (prisma: PrismaClient) => async (
    req: Request<{ clan: string; war: string }>,
    res: Response<ClanWarGetResponse>,
  ) => {
    try {
      const user = await auth(prisma, req);

      if (!req.params.clan || !req.params.war) {
        throw new ExpectedError(translate('missingParameters', user));
      }

      const war = await prisma.clanWar.findFirst({
        where: {
          id: req.params.war,
          OR: [
            { attackerId: req.params.clan },
            { defenderId: req.params.clan },
          ],
        },
        include: {
          attacker: {
            select: { id: true, name: true },
          },
          defender: {
            select: { id: true, name: true },
          },
          fights: {
            select: {
              id: true,
              date: true,
              winner: true,
              brute1: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: { date: 'asc' },
          },
          fighters: {
            take: 1,
            orderBy: { day: 'desc' },
            include: {
              attackers: {
                select: { id: true, name: true },
              },
              defenders: {
                select: { id: true, name: true },
              },
            },
          },
        },
      });

      if (!war) {
        throw new ExpectedError(translate('warNotFound', user));
      }

      res.status(200).send(war);
    } catch (error) {
      sendError(res, error);
    }
  },
  getHistory: (prisma: PrismaClient) => async (
    req: Request<{ clan: string }>,
    res: Response<ClanWarGetHistoryResponse>,
  ) => {
    try {
      const user = await auth(prisma, req);

      if (!req.params.clan) {
        throw new ExpectedError(translate('missingParameters', user));
      }

      const wars = await prisma.clanWar.findMany({
        where: {
          OR: [
            { attackerId: req.params.clan },
            { defenderId: req.params.clan },
          ],
        },
        include: {
          attacker: {
            select: { id: true, name: true },
          },
          defender: {
            select: { id: true, name: true },
          },
        },
        orderBy: { date: 'desc' },
      });

      res.status(200).send(wars);
    } catch (error) {
      sendError(res, error);
    }
  },
  getAvailableFighters: (prisma: PrismaClient) => async (
    req: Request<never, unknown, { clan: string; war: string }>,
    res: Response<ClanWarGetAvailableFightersResponse>,
  ) => {
    try {
      const user = await auth(prisma, req);

      if (!req.body.clan || !req.body.war) {
        throw new ExpectedError(translate('missingParameters', user));
      }

      // Check if one of the user's brutes is the clan master
      const userBrutes = await prisma.brute.findMany({
        where: { userId: user.id, deletedAt: null },
        select: { id: true, masterOfClan: { select: { id: true } } },
      });

      if (!userBrutes.some((brute) => brute.masterOfClan?.id === req.body.clan)) {
        throw new ExpectedError(translate('unauthorized', user));
      }

      const war = await prisma.clanWar.findFirst({
        where: {
          id: req.body.war,
          OR: [
            { attackerId: req.body.clan },
            { defenderId: req.body.clan },
          ],
        },
        select: {
          id: true,
          fights: { select: { id: true } },
        },
      });

      if (!war) {
        throw new ExpectedError(translate('warNotFound', user));
      }

      const brutes = await prisma.brute.findMany({
        where: {
          clanId: req.body.clan,
          deletedAt: null,
          inClanWarAttackerFighters: {
            none: {
              AND: [
                { clanWarId: war.id },
                { day: { lt: war.fights.length + 1 } },
              ],
            },
          },
          inClanWarDefenderFighters: {
            none: {
              AND: [
                { clanWarId: war.id },
                { day: { lt: war.fights.length + 1 } },
              ],
            },
          },
        },
        select: {
          id: true,
          name: true,
          level: true,
          ranking: true,
          gender: true,
          body: true,
          colors: true,
        },
        orderBy: [
          { ranking: 'asc' },
          { level: 'desc' },
        ],
      });

      res.status(200).send(brutes);
    } catch (error) {
      sendError(res, error);
    }
  },
  toggleFighter: (prisma: PrismaClient) => async (
    req: Request<never, unknown, { clan: string; war: string; fighter: string; add: string }>,
    res: Response,
  ) => {
    try {
      const user = await auth(prisma, req);

      if (!req.body.clan || !req.body.war || !req.body.fighter || !req.body.add) {
        throw new ExpectedError(translate('missingParameters', user));
      }

      // Check if one of the user's brutes is the clan master
      const userBrutes = await prisma.brute.findMany({
        where: { userId: user.id, deletedAt: null },
        select: { id: true, masterOfClan: { select: { id: true } } },
      });

      if (!userBrutes.some((brute) => brute.masterOfClan?.id === req.body.clan)) {
        throw new ExpectedError(translate('unauthorized', user));
      }

      const war = await prisma.clanWar.findFirst({
        where: {
          id: req.body.war,
          OR: [
            { attackerId: req.body.clan },
            { defenderId: req.body.clan },
          ],
        },
        select: {
          id: true,
          attackerId: true,
          defenderId: true,
          fights: { select: { id: true } },
        },
      });

      if (!war) {
        throw new ExpectedError(translate('warNotFound', user));
      }

      // Check if there are already max fighters
      if (req.body.add === 'true') {
        const fighters = await prisma.clanWarFighters.findUnique({
          where: {
            clanWarId_day: { clanWarId: war.id, day: war.fights.length + 1 },
          },
          select: {
            id: true,
            attackers: { select: { id: true } },
            defenders: { select: { id: true } },
          },
        });

        if (fighters) {
          if (war.attackerId === req.body.clan
            && fighters.attackers.length >= ClanWarMaxParticipants) {
            throw new ExpectedError(translate('maxFightersReached', user));
          }

          if (war.defenderId === req.body.clan
            && fighters.defenders.length >= ClanWarMaxParticipants) {
            throw new ExpectedError(translate('maxFightersReached', user));
          }
        }
      }

      const brute = await prisma.brute.findFirst({
        where: {
          id: req.body.fighter,
          clanId: req.body.clan,
          deletedAt: null,
          inClanWarAttackerFighters: {
            none: {
              AND: [
                { clanWarId: war.id },
                { day: { lt: war.fights.length + 1 } },
              ],
            },
          },
          inClanWarDefenderFighters: {
            none: {
              AND: [
                { clanWarId: war.id },
                { day: { lt: war.fights.length + 1 } },
              ],
            },
          },
        },
        select: { id: true },
      });

      if (!brute) {
        throw new ExpectedError(translate('bruteNotFound', user));
      }

      await prisma.clanWarFighters.upsert({
        where: {
          clanWarId_day: { clanWarId: war.id, day: war.fights.length + 1 },
        },
        create: {
          clanWar: { connect: { id: war.id } },
          day: war.fights.length + 1,
          attackers: war.attackerId === req.body.clan && req.body.add === 'true'
            ? { connect: { id: brute.id } }
            : undefined,
          defenders: war.defenderId === req.body.clan && req.body.add === 'true'
            ? { connect: { id: brute.id } }
            : undefined,
        },
        update: {
          attackers: war.attackerId === req.body.clan
            ? req.body.add === 'true'
              ? { connect: { id: brute.id } }
              : { disconnect: { id: brute.id } }
            : undefined,
          defenders: war.defenderId === req.body.clan
            ? req.body.add === 'true'
              ? { connect: { id: brute.id } }
              : { disconnect: { id: brute.id } }
            : undefined,
        },
      });

      res.status(200).send({
        success: true,
      });
    } catch (error) {
      sendError(res, error);
    }
  },
};

export default ClanWars;
