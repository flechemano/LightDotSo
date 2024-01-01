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

import { getUserOperationsCount } from "@lightdotso/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Address } from "viem";
import type { UserOperationCountData } from "@/data";
import type { UserOperationListCountParams } from "@/params";
import { queryKeys } from "@/queryKeys";
import { useAuth } from "@/stores";

export const useQueryUserOperationsCount = (
  params: UserOperationListCountParams,
) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { clientType } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const currentCountData: UserOperationCountData | undefined =
    queryClient.getQueryData(
      queryKeys.user_operation.listCount({
        address: params.address as Address,
        status: params.status,
        is_testnet: params.is_testnet,
      }).queryKey,
    );

  const { data: userOperationsCount } = useQuery<UserOperationCountData | null>(
    {
      queryKey: queryKeys.user_operation.listCount({
        address: params.address as Address,
        status: params.status,
        is_testnet: params.is_testnet,
      }).queryKey,
      queryFn: async () => {
        if (!params.address) {
          return null;
        }

        const res = await getUserOperationsCount(
          {
            params: {
              query: {
                address: params.address,
                status: params.status,
                is_testnet: params.is_testnet,
              },
            },
          },
          clientType,
        );

        // Return if the response is 200
        return res.match(
          data => {
            return data;
          },
          _ => {
            return currentCountData ?? null;
          },
        );
      },
    },
  );

  return {
    userOperationsCount,
  };
};
