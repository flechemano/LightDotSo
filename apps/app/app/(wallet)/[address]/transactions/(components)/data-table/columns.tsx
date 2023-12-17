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

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { UserOperationCardChain } from "@/components/user-operation/user-operation-card-chain";
import { UserOperationCardHash } from "@/components/user-operation/user-operation-card-hash";
import { UserOperationCardNonce } from "@/components/user-operation/user-operation-card-nonce";
import { UserOperationCardStatus } from "@/components/user-operation/user-operation-card-status";
import type { UserOperationData } from "@/data";

// -----------------------------------------------------------------------------
// Definitions
// -----------------------------------------------------------------------------

export const columns: ColumnDef<UserOperationData>[] = [
  {
    accessorKey: "chain_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chain" />
    ),
    cell: ({ row }) => <UserOperationCardChain userOperation={row.original} />,
    filterFn: (row, id, value) => {
      return value.includes((row.getValue(id) as number).toString());
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "hash",
    cell: ({ row }) => <UserOperationCardHash userOperation={row.original} />,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Operation Hash" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "nonce",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nonce" />
    ),
    cell: ({ row }) => <UserOperationCardNonce userOperation={row.original} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <UserOperationCardStatus userOperation={row.original} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
];