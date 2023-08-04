// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { type Session } from "next-auth";
import { getAuthSession } from "@lightdotso/auth";
import { type inferAsyncReturnType } from "@trpc/server";
// import { prisma } from "@lightdotso/prisma";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

type CreateContextOptions = {
  opts?: FetchCreateContextFnOptions;
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
// eslint-disable-next-line no-unused-vars
export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  return {
    // request: opts.opts?.req,
    // resHeaders: opts?.opts?.resHeaders,
    headers: opts.opts && Object.fromEntries(opts.opts.req.headers),
    session: opts.session,
    // prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  // Get the session from the server using the getServerSession wrapper function
  const session = await getAuthSession();

  //  return {
  //    session,
  //    headers: opts && Object.fromEntries(opts.req.headers),
  //  };
  return createInnerTRPCContext({
    opts,
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;