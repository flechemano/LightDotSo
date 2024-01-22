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

"use client";

import type { ConfigurationData, UserOperationData } from "@lightdotso/data";
import { useUserOperationSign } from "@lightdotso/hooks";
import { Button } from "@lightdotso/ui";
import type { FC } from "react";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type UserOperationCardTransactionSignButtonProps = {
  address: Address;
  config: ConfigurationData;
  userOperation: UserOperationData;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const UserOperationCardTransactionSignButton: FC<
  UserOperationCardTransactionSignButtonProps
> = ({ address, config, userOperation }) => {
  // ---------------------------------------------------------------------------
  // App Hooks
  // ---------------------------------------------------------------------------

  const { isLoading, isSignable, signUserOperation } = useUserOperationSign({
    address: address,
    config: config,
    userOperation: userOperation,
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Button
      disabled={!isSignable}
      isLoading={isLoading}
      variant={isSignable ? "default" : "outline"}
      className="w-full"
      onClick={signUserOperation}
    >
      Sign
    </Button>
  );
};