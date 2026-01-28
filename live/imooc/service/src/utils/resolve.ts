import path from "path";

export function resolve(_path: string) {
  return path.join(__dirname, "../", _path);
}
