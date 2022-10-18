import { Command } from 'commander';
import { Toolbox } from './modules/Toolbox.js';

const program = new Command();

program
  .requiredOption('-n, --summoner-name <name...>', 'enter your in-game name')
  .option(
    '-s, --server <server>',
    'enter the server you are playing on - eune/euw',
    'eune'
  )
  .version('1.0.0', '-v, --version', 'output the current version');

program
  .command('find', { isDefault: true, hidden: true })
  .description("find the summoner's mmr - hidden command")
  .action(async (source, destination) => {
    const options = program.opts();

    let info = {
      server: options.server,
      summonerName: options.summonerName.join(' '),
    };

    const toolbox = new Toolbox(info);

    toolbox.mmr;
  });

program.parse(process.argv);
