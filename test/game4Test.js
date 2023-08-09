const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const caller0 = ethers.provider.getSigner(0);
    const caller1 = ethers.provider.getSigner(1);

    const address0 = await caller0.getAddress();
    const address1 = await caller1.getAddress();

    await game.connect(caller1).write(address0);

    await game.win(address1);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
