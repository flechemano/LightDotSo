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

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps,
} from "react";
import { forwardRef } from "react";

export const OptimismLogo: ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
> = forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="1" width="22" height="22" rx="6" fill="#EA3431" />
    <path
      d="M9.08403 14.656C8.48803 14.656 8.00003 14.516 7.62003 14.236C7.24403 13.952 7.05603 13.544 7.05603 13.02C7.05603 12.908 7.06803 12.776 7.09203 12.616C7.17216 12.1802 7.2642 11.7468 7.36803 11.316C7.70803 9.94001 8.58803 9.25201 10.004 9.25201C10.388 9.25201 10.736 9.31601 11.04 9.44801C11.3362 9.56134 11.59 9.76381 11.7662 10.0275C11.9425 10.2911 12.0325 10.603 12.024 10.92C12.024 11.024 12.012 11.156 11.988 11.316C11.912 11.76 11.824 12.196 11.716 12.616C11.54 13.3 11.24 13.816 10.808 14.156C10.38 14.492 9.80403 14.656 9.08403 14.656ZM9.19203 13.576C9.47203 13.576 9.70803 13.492 9.90403 13.328C10.104 13.164 10.248 12.912 10.332 12.568C10.448 12.096 10.536 11.688 10.596 11.336C10.616 11.232 10.628 11.124 10.628 11.012C10.628 10.556 10.392 10.328 9.91603 10.328C9.65416 10.3223 9.39885 10.4103 9.19603 10.576C9.00003 10.74 8.86003 10.992 8.77603 11.336C8.68403 11.672 8.59603 12.08 8.50403 12.568C8.48403 12.668 8.47203 12.772 8.47203 12.884C8.46803 13.348 8.71203 13.576 9.19203 13.576ZM12.372 14.584C12.316 14.584 12.276 14.568 12.244 14.532C12.22 14.492 12.212 14.448 12.22 14.396L13.256 9.51601C13.2599 9.48879 13.2694 9.46266 13.2839 9.43926C13.2983 9.41586 13.3174 9.39569 13.34 9.38001C13.3803 9.346 13.4314 9.32755 13.484 9.32801H15.48C16.036 9.32801 16.48 9.44401 16.816 9.67201C17.156 9.90401 17.328 10.236 17.328 10.672C17.328 10.796 17.312 10.928 17.284 11.064C17.16 11.64 16.908 12.064 16.524 12.34C16.148 12.616 15.632 12.752 14.976 12.752H13.964L13.62 14.396C13.6105 14.4505 13.5805 14.4992 13.536 14.532C13.4958 14.566 13.4447 14.5845 13.392 14.584H12.372ZM15.028 11.716C15.2247 11.7211 15.4175 11.6606 15.576 11.544C15.7389 11.4233 15.8515 11.2467 15.892 11.048C15.908 10.964 15.916 10.888 15.916 10.824C15.916 10.68 15.872 10.568 15.788 10.492C15.704 10.412 15.556 10.372 15.352 10.372H14.452L14.168 11.716H15.028Z"
      fill="white"
    />
  </svg>
));

OptimismLogo.displayName = "OptimismLogo";
