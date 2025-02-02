// Copyright 2023-2024 Light, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use crate::types::GasEstimationParams;
use eyre::{eyre, Result};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
struct ApiResponseData {
    slow: u64,
    standard: u64,
    fast: u64,
    rapid: u64,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct ApiResponse {
    data: ApiResponseData,
}

impl From<ApiResponseData> for GasEstimationParams {
    fn from(data: ApiResponseData) -> Self {
        let make_params = |value: u64| -> GasEstimationParams {
            GasEstimationParams {
                max_priority_fee_per_gas: value.into(),
                max_fee_per_gas: value.into(),
            }
        };

        make_params(data.fast)
    }
}

pub async fn ethereum_gas_estimation(chain_id: u64) -> Result<GasEstimationParams> {
    let url = match chain_id {
        1 => "https://beaconcha.in/api/v1/execution/gasnow",
        11155111 => "https://sepolia.beaconcha.in/api/v1/execution/gasnow",
        _ => return Err(eyre!("Unsupported chain ID")),
    };

    let response = reqwest::get(url).await?.json::<ApiResponse>().await?;

    // Check if any of the values is 0
    if response.data.slow == 0 ||
        response.data.standard == 0 ||
        response.data.fast == 0 ||
        response.data.rapid == 0
    {
        return Err(eyre!("API returned a value of 0"));
    }

    // Convert to GasEstimation using From trait
    Ok(response.data.into())
}

#[cfg(test)]
mod tests {
    use ethers::types::U256;

    use super::*;

    #[tokio::test]
    async fn test_ethereum_gas_estimation() {
        // Test for mainnet
        let chain_id = 1;
        let result = ethereum_gas_estimation(chain_id).await;
        assert!(result.is_ok());
        let gas_estimation = result.unwrap();
        assert!(gas_estimation.max_priority_fee_per_gas > U256::from(0));
        assert!(gas_estimation.max_fee_per_gas > U256::from(0));
    }

    #[tokio::test]
    async fn test_ethereum_gas_estimation_unsupported_chain_id() {
        // Test for an unsupported chain ID
        let chain_id = 999;
        let result = ethereum_gas_estimation(chain_id).await;
        assert!(result.is_err());
        let error = result.unwrap_err();
        assert_eq!(error.to_string(), "Unsupported chain ID");
    }
}
