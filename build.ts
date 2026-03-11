#!/usr/bin/env bun
/* eslint-disable no-console */

import { spawn } from "bun";
import { cp, mkdir } from "fs/promises";
import { dirname } from "path";
import { rimraf } from "rimraf";
import { resolve } from "node:path";

const ROOT_DIR = process.cwd();

async function copy(src: string, dest: string) {
  try {
    await mkdir(dirname(dest), { recursive: true });
    await cp(src, dest, { recursive: true });
    console.log(`Copy ${src} to ${dest} successful.`);
  } catch (error) {
    throw new Error(`Copy ${src} to ${dest} failed. Error: ${error}`);
  }
}

async function clean(path: string): Promise<boolean> {
  try {
    console.log(`Clean last time output in: ${path}`);

    return await rimraf(resolve(path), { preserveRoot: true });
  } catch (error) {
    throw error;
  }
}

// astro check && astro build && pagefind --force-language en --site dist && cp - r dist/pagefind public/
async function command(cmd: string[], cwd: string = ROOT_DIR): Promise<void> {
  const { exited } = spawn({
    cmd,
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });

  const result = await exited;

  if (result !== 0) {
    throw new Error(`Command failed: ${cmd.join(" ")} (exit code: ${result})`);
  }
}

async function main(): Promise<void> {
  try {
    await command(["astro", "check"], ROOT_DIR);
    await command(["astro", "build"], ROOT_DIR);
    await command(["pagefind", "--force-language", "en", "--site", "dist"], ROOT_DIR);

    await clean("public/pagefind");
    await copy("dist/pagefind", "public/pagefind");
  } catch (error) {
    console.error("Build pipeline failed:");
    if (error instanceof Error) {
      console.error(error.message);
      if (error.cause) console.error("Cause:", error.cause);
    } else {
      console.error(String(error));
    }
    process.exitCode = 1;
    throw error;
  }
}

main().catch(() => process.exit(1));