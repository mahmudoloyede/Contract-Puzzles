const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { Wallet, utils } = require('ethers');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
    let wallet = Wallet.createRandom();

    while(wallet.address >= threshold){
      wallet = Wallet.createRandom();
    }

    const signer = wallet.connect(ethers.provider);

    const tx = await ethers.provider.getSigner(0).sendTransaction({
      to: wallet.address,
      value: utils.parseEther('1')
    });

    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
