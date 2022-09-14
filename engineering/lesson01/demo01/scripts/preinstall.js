if (!/pnpm/.test(process.env.npm_execpath || '')) {
    console.warn('请使用 pnpm');
    process.exit(1);
}
