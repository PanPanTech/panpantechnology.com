import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const script = path.join(__dirname, "import-site-package.py");
const python = process.env.PYTHON || "python";
const repoRoot = path.join(__dirname, "..");
const defaultPackageRoot = path.join(repoRoot, "..", "品牌官网 20260709 2.0版本", "site-package");
const packageRoot = process.env.PANPANTECH_PACKAGE_ROOT || defaultPackageRoot;

if (!existsSync(packageRoot)) {
  console.log(`Site package not found at ${packageRoot}; skipping static rebuild.`);
  process.exit(0);
}

const result = spawnSync(python, [script], {
  cwd: repoRoot,
  stdio: "inherit",
  env: process.env,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
