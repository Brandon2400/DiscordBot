import { readdirSync } from "fs";

import ascii from'ascii-table';

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

export default (client) => {
    readdirSync("./commands/").forEach(async dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let module = await import(`../commands/${dir}/${file}`) 
            let pull = module.default;
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}