module.exports = {
  apps : [{
    name   : "badgers-new",
    script : "./dist/server/entry.mjs",
    env: {
      // This tells Astro/LibSQL to use a file named db.sqlite in the current folder
      ASTRO_DATABASE_FILE: "file:db.sqlite",
      HOST: "127.0.0.1",
      PORT: 4321
    }
  }]
}
