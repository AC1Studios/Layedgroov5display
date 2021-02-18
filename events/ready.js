module.exports = client => {
    client.on('ready', () => {
        console.log(
            `[READY] Logged in as ${client.user.tag} (${client.user.id})`
        );
    });
    const { formatNumber } = require('../util/Util');

    let watching = [
        `with ${formatNumber(
            client.guilds.cache.size
        )} servers | "lay invite"`,
        `${formatNumber(client.registry.commands.size)} commands`,
        `in ${formatNumber(client.channels.cache.size)} channels`,
        ` lay help | layedGroov | v4.5.2`,
          `lay vote`,
         `Music`

    ];

    setInterval(function() {
        let watchinging = watching[Math.floor(Math.random() * watching.length)];
        client.user.setActivity(watchinging, { type: 'PLAYING' });
    }, 7000);
    client.on('ready', async () => {
        await client.user.setPresence({
            game: { name: 'name' },
            status: 'dnd'
        });
    });
    console.log(`[READY] Logged in as ${client.user.tag} (${client.user.id})`);
};
