use anyhow::{Context, Result};
use rusqlite::Connection;

pub fn bootstrap(db_path: &str) -> Result<()> {
    let conn = Connection::open(db_path).with_context(|| format!("open sqlite db at {db_path}"))?;
    let schema = include_str!("../../sql/001_init.sql");
    conn.execute_batch(schema)
        .context("apply sqlite bootstrap schema")?;
    Ok(())
}
