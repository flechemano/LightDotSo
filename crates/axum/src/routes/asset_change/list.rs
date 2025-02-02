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

use super::types::AssetChange;
use crate::{result::AppJsonResult, state::AppState};
use autometrics::autometrics;
use axum::{
    extract::{Query, State},
    Json,
};
use lightdotso_prisma::asset_change;
use serde::Deserialize;
use utoipa::IntoParams;

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

#[derive(Debug, Deserialize, Default, IntoParams)]
#[serde(rename_all = "snake_case")]
#[into_params(parameter_in = Query)]
pub struct ListQuery {
    /// The offset of the first asset change to return.
    pub offset: Option<i64>,
    /// The maximum number of asset changes to return.
    pub limit: Option<i64>,
}

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// Returns a list of assets
#[utoipa::path(
        get,
        path = "/asset_change/list",
        params(
            ListQuery
        ),
        responses(
            (status = 200, description = "Asset Changes returned successfully", body = [AssetChange]),
            (status = 500, description = "Asset Change bad request", body = AssetChangeError),
        )
    )]
#[autometrics]
pub(crate) async fn v1_asset_change_list_handler(
    list_query: Query<ListQuery>,
    State(state): State<AppState>,
) -> AppJsonResult<Vec<AssetChange>> {
    // -------------------------------------------------------------------------
    // Parse
    // -------------------------------------------------------------------------

    // Get the list query.
    let Query(query) = list_query;

    // -------------------------------------------------------------------------
    // DB
    // -------------------------------------------------------------------------

    // Get the assets from the database.
    let assets = state
        .client
        .asset_change()
        .find_many(vec![])
        .with(asset_change::interpretation_action::fetch())
        .with(asset_change::token::fetch())
        .skip(query.offset.unwrap_or(0))
        .take(query.limit.unwrap_or(10))
        .exec()
        .await?;

    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------

    // Change the assets to the format that the API expects.
    let assets: Vec<AssetChange> = assets.into_iter().map(AssetChange::from).collect();

    Ok(Json::from(assets))
}
