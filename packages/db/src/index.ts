export { createLogicalBackup, exportLogicalSqlDump, type LogicalBackupResult } from "./backup";
export { getSql, type Sql } from "./client";
export { ECONOMICS_FINANCE_DOSSIERS } from "./economics-finance-dossiers";
export { FERTILITY_SEED_DOSSIERS } from "./fertility-dossiers";
export { LONGEVITY_SEED_DOSSIERS } from "./longevity-dossiers";
export { MATH_SEED_DOSSIERS } from "./math-dossiers";
export { migrate } from "./migrate";
export { PHYSICS_CLASSICAL_DOSSIERS } from "./physics-classical-dossiers";
export { PHYSICS_FRONTIER_GRAVITY_DOSSIERS } from "./physics-frontier-gravity-dossiers";
export { PHYSICS_GRAVITY_STRING_DOSSIERS } from "./physics-gravity-string-dossiers";
export { PHYSICS_QUANTUM_DOSSIERS } from "./physics-quantum-dossiers";
export { REGENERATION_SEED_DOSSIERS } from "./regeneration-dossiers";
export * from "./repo";
export {
  buildRollbackPlan,
  type MigrationRollbackPlan,
  rollbackAllMigrations,
  rollbackLastMigration,
  splitSqlStatements,
  stripSqlComments,
  synthesizeDownSql,
} from "./rollback";
export {
  ALL_SEED_DOSSIERS,
  assertLocalResetAllowed,
  CROSS_DISCIPLINE_LINKS,
  ENCYCLOPAEDIC_TRUNKS,
  type SeedNode,
  seed,
} from "./seed";
export {
  assertSnapshotPreserved,
  captureDatabaseSnapshot,
  type DatabaseSnapshot,
  resetLocalTestSchema,
  type TableSnapshot,
} from "./snapshot";
export {
  auditDestructiveCommands,
  auditSeederSource,
  auditSqlMigration,
  type ColumnSchemaModel,
  compareSchemas,
  type DatabaseSchemaModel,
  PUBLISHED_HISTORICAL_MIGRATION_SHA256,
  parseSqlSchemaFromMigrations,
  readHeadMigrations,
  runVerifySafe,
  sha256Hex,
  type TableSchemaModel,
  verifyGitStateTransition,
} from "./verify-safe";
