import axios from "axios";
import chalk from "chalk";

export class Toolbox {
  #server;
  #name;
  #url;

  static #baseUrl =
    "https://$server.whatismymmr.com/api/v1/summoner?name=$name";

  constructor({ server, summonerName }) {
    this.#name = summonerName;
    this.#server = server;

    this.#urlBuilder();
  }

  #urlBuilder() {
    this.#url = Toolbox.#baseUrl
      .replace("$server", this.#server)
      .replace("$name", this.#name);
  }

  #getData() {
    axios
      .get(this.#url)
      .then((res) => this.#logger(res.data.ranked))
      .catch((err) => console.log(chalk.redBright("🥲  Something went wrong")));
  }

  #logger(data) {
    const msg = data.summary.split("<br>")[0].split("<b>");
    console.log(chalk.bold(msg.join("")).replace("</b>", ""));
  }

  // getters
  get url() {
    return this.#url;
  }

  get mmr() {
    this.#getData();
  }
}
